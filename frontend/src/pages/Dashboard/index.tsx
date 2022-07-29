import React, { useEffect, useMemo, useState } from 'react';

import WalletBox from '../../components/WalletBox';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import MessageBox from '../../components/MessageBox';
import { PieCharts } from '../../components/PieCharts';
import HistoryBox from '../../components/HistoryBox';
import {BarChartBox} from '../../components/BarChartBox'

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses'
import listOfMonths from '../../utils/months'

import listOfMonthsB from '../../utils/monthsB'


import {
    Container,
    Content
} from './styles';



const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [countRegister, setCountRegister] = useState<boolean>(true)

    // const months = useMemo(() => {
    //     let uniqueMonths: number[] = [];
    //     let totalMonths: any[] = [];
    //     [...expenses, ...gains].forEach(item => {
    //         const data = new Date(item.date);

    //         const month = data.getMonth() + 1;

    //         if (!uniqueMonths.includes(month)) {
    //             uniqueMonths.push(month)
    //         }
    //     });
    //     listOfMonths.forEach((item: any) => {
    //         if (uniqueMonths.includes(item.value)) {
    //             totalMonths.push(item)
    //         }
    //     })
    //     return totalMonths;

    // }, []);
    useEffect(() => {
        setCountRegister(false);

        [...expenses, ...gains].forEach(item => {
            const data = new Date(item.date);
            const year = data.getFullYear();
            const month = data.getMonth() + 1;

            if (month === monthSelected && year === yearSelected) {
                setCountRegister(true)
            }

        }
        );
    }, [yearSelected, monthSelected])

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
    }, []);

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

    }, [monthSelected, yearSelected])

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

    }, [monthSelected, yearSelected])

    const message = useMemo(() => {
        switch (true) {
            case totalGains - totalExpenses < 0:
                return {
                    title: 'Que triste!',
                    description: 'Neste mês, você gastou mais do que deveria',
                    footerText: 'Verifique seus gastos e tente cortar algumas coisas desnecessárias',
                    icon: 'sad'
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

        const percentGains = (totalGains / total) * 100
        const percentExpenses = (totalExpenses / total) * 100

        return [
            {
                name: "Entradas",
                value: totalGains,
                percent: Number(percentGains.toFixed(1)),
                color: '#E44C4E'
            },
            {
                name: "Saídas",
                value: totalExpenses,
                percent: Number(percentExpenses.toFixed(1)),
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

    }, [yearSelected]);

    const relationExpensevesRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses
            .filter((expense) => {
                const date = new Date(expense.date);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;

                return month === monthSelected && yearSelected;
            })
            .forEach((expense) => {
                if (expense.frequency === 'recorrent') {
                    return amountRecurrent += Number(expense.amount)
                } else {
                    return amountEventual += Number(expense.amount)
                }
            });

        const total = amountRecurrent + amountEventual;

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: Number((amountRecurrent / total).toFixed(1)),
                color: "#F7931B"
            },
            {
                name: 'Eventual',
                amount: amountEventual,
                percent: Number((amountEventual / total).toFixed(1)),
                color: "#E44C4E"
            }
        ]

    }, [monthSelected,yearSelected]);

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

                <BarChartBox/>

            </Content>

        </Container>

    );
}

export default Dashboard;