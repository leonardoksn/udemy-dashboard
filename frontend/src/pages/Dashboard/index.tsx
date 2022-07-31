import React, { useEffect, useMemo, useState } from 'react';

import WalletBox from '../../components/WalletBox';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import MessageBox from '../../components/MessageBox';
import { PieCharts } from '../../components/PieCharts';
import HistoryBox from '../../components/HistoryBox';
import { BarChartBox } from '../../components/BarChartBox'

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses'
import listOfMonths from '../../utils/months'

import listOfMonthsB from '../../utils/monthsB'

interface IDataApi {
    description: string,
    amount: string,
    type: string,
    frequency: string,
    date: string
}

import {
    Container,
    Content
} from './styles';
import { api } from '../../resources/api';



const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const [gains, setGains] = useState<IDataApi[]>([]);
    const [expenses, setExpenses] = useState<IDataApi[]>([]);
    const token = localStorage.getItem('@minha-carteira:logged')

    useEffect(() => {
        const getGains = async () => {


            const { data } = await api.get('/gains', {
                headers: {
                    'Authorization': `Basic ${token}`
                }
            })
            setGains(data)
        }

        const getExpenses = async () => {
            const { data } = await api.get('/expenses', {
                headers: {
                    'Authorization': `Basic ${token}`
                }
            })
            setExpenses(data)
        };
        getGains()
        getExpenses()
    }, [])


    const months = useMemo(() => {
        return listOfMonths.map((month) => {
            return {
                value: month.value,
                label: month.label
            }
        });
    }, []);

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        [...expenses, ...gains].forEach(item => {
            const data = new Date(item.date);

            const year = data.getFullYear();
            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year)
            }
        });
        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        })
    }, [gains,expenses]);

    const totalExpenses = useMemo(() => {
        let total = 0


        expenses.forEach(item => {

            const date = new Date(item.date)
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected) {
                total += Number(item.amount)

            }


        })
        return total;

    }, [gains,expenses,monthSelected, yearSelected])

    const totalGains = useMemo(() => {
        let total = 0

        gains.forEach(item => {
            const date = new Date(item.date)
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount)
                } catch {
                    throw new Error("Invalid amount! Amount must be number")
                }

            }
        })
        return total;

    }, [gains,expenses,monthSelected, yearSelected])

    const message = useMemo(() => {
        switch (true) {
            case totalGains - totalExpenses < 0:
                return {
                    title: 'Que triste!',
                    description: 'Neste mês, você gastou mais do que deveria',
                    footerText: 'Verifique seus gastos e tente cortar algumas coisas desnecessárias',
                    icon: 'sad'
                }
            case totalExpenses === 0 && totalGains === 0:
                return {
                    title: 'Mês sem transação!',
                    description: 'Não há registro algum de circulação da conta.',
                    footerText: 'Por favor, escolha outro mês ou ano que tenha dados para mostrar',
                    icon: 'thinking'
                }
            case totalGains - totalExpenses === 0:
                return {
                    title: 'Ufa!',
                    description: 'Neste mês, você gastou exatamente o que ganhou.',
                    footerText: 'Tenha cuidado. No próximo mês tente poupar o seu dinheiro',
                    icon: 'sweet'
                }

            default:
                return {
                    title: 'Muito bem!',
                    description: 'Sua carteria está positiva!',
                    footerText: 'Continue assim, considere investir seu saldo',
                    icon: 'happy'
                }
        }

    }, [totalExpenses, totalGains])

    const relationExpansesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses;

        const percentGains = Number((totalGains / total * 100).toFixed(1))
        const percentExpenses = Number((totalExpenses / total * 100).toFixed(1))

        return [
            {
                name: "Entradas",
                value: totalGains,
                percent: percentGains ? percentGains : 0,
                color: '#E44C4E'
            },
            {
                name: "Saídas",
                value: totalExpenses,
                percent: percentExpenses ? percentExpenses : 0,
                color: '#F7931B'
            }
        ]
    }, [totalGains, totalExpenses])

    const historyData = useMemo(() => {
        return listOfMonths.map((_, month) => {

            let amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if (gainMonth === month && gainYear === yearSelected) {
                    try {
                        amountEntry += Number(gain.amount)
                    } catch {
                        throw new Error('amountEntry is invalid. amountEntry must be valid number.')
                    }

                }
            })


            let amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if (expenseMonth === month && expenseYear === yearSelected) {
                    try {
                        amountOutput += Number(expense.amount)
                    } catch {
                        throw new Error('amountOutput is invalid. amountOutput must be valid number.')
                    }

                }
            });

            return {
                monthNumber: month,
                month: listOfMonthsB[month].substring(0, 3),
                amountEntry,
                amountOutput
            }

        })
            .filter((item) => {
                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear(); // new Date().getFullYear();

                return (yearSelected === currentYear && item.monthNumber <= currentMonth) ||
                    (yearSelected < currentYear)

            })

    }, [yearSelected,monthSelected,gains]);

    const relationExpensevesRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses
            .filter((expense) => {
                const date = new Date(expense.date);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;

                return month === monthSelected && yearSelected === year;
            })
            .forEach((expense) => {
                if (expense.frequency === 'recorrente') {
                    return amountRecurrent += Number(expense.amount)
                } if (expense.frequency === 'eventual') {
                    return amountEventual += Number(expense.amount)
                }
            });

        const total = amountRecurrent + amountEventual;
        const percentCurrent = Number((amountRecurrent / total * 100).toFixed(1));
        const percentEventual = Number((amountEventual / total * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentCurrent ? percentCurrent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventual',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E"
            }
        ]

    }, [monthSelected, yearSelected,gains]);

    const relationGainsRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        gains
            .filter((gain) => {
                const date = new Date(gain.date);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;

                return month === monthSelected && yearSelected === year;
            })
            .forEach((gain) => {
                if (gain.frequency === 'recorrente') {
                    return amountRecurrent += Number(gain.amount)
                } if (gain.frequency === 'eventual') {
                    return amountEventual += Number(gain.amount)
                }
            });

        const total = amountRecurrent + amountEventual;
        const percentCurrent = Number((amountRecurrent / total * 100).toFixed(1));
        const percentEventual = Number((amountEventual / total * 100).toFixed(1));


        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentCurrent ? percentCurrent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventual',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E"
            }
        ]

    }, [monthSelected, yearSelected]);

    const { title, description, footerText, icon } = message

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch {
            throw new Error('invalid month value. Is accept 0 - 24.')
        }
    }

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch {
            throw new Error('invalid month value. Is accept 0 - 24.')
        }
    }

    return (
        <Container>
            <ContentHeader title='Dashboard' lineColor='#F7931B'>
                <SelectInput
                    options={years}
                    onChange={
                        (e) => handleYearSelected(e.target.value)}
                    defaultValue={yearSelected} />

                <SelectInput
                    options={months}
                    onChange={
                        (e) => handleMonthSelected(e.target.value)}
                    defaultValue={monthSelected} />
            </ContentHeader>
            <Content>
                <WalletBox
                    title='saldo'
                    amount={totalGains - totalExpenses}
                    footerlabel="atualizado com base nas entradas e saidas"
                    icon='dollar'
                    color="#4E41F0"
                />
                <WalletBox
                    title='entrada'
                    amount={totalGains}
                    footerlabel="atualizado com base nas entradas e saidas"
                    icon='arrowUp'
                    color="#F7931B"
                />
                <WalletBox
                    title='saída'
                    amount={totalExpenses}
                    footerlabel="atualizado com base nas entradas e saidas"
                    icon='arrowDown'
                    color="#E44C4E"
                />

                <MessageBox
                    title={title}
                    description={description}
                    footerText={footerText}
                    icon={icon}
                />

                <PieCharts data={relationExpansesVersusGains} />

                <HistoryBox
                    data={historyData}
                    lineColorAmountEntry="#f7931b"
                    lineColorAmountOutput="#e44c4e"
                />
                <BarChartBox
                    title="Saídas"
                    data={relationExpensevesRecurrentVersusEventual}
                />

                <BarChartBox
                    title="Entradas"
                    data={relationGainsRecurrentVersusEventual}
                />
            </Content>
        </Container>
    );
}

export default Dashboard;