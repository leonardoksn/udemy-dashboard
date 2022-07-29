import React, { useEffect, useMemo, useState } from 'react';

import WalletBox from '../../components/WalletBox';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import MessageBox from '../../components/MessageBox';
import { PieCharts } from '../../components/PieCharts';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses'
import listOfMonths from '../../utils/months'

import {
    Container,
    Content
} from './styles';



const Dashboard: React.FC = () => {
    const [mouthSelected, setMouthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear() - 2);
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

            if (month === mouthSelected && year === yearSelected) {
                setCountRegister(true)
            }

        }
        );
    }, [yearSelected, mouthSelected])

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

            if (month === mouthSelected && year === yearSelected) {
                total += Number(item.amount)

            }


        })
        return total;

    }, [mouthSelected, yearSelected])

    const totalGains = useMemo(() => {
        let total = 0

        gains.forEach(item => {
            const date = new Date(item.date)
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === mouthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount)
                } catch {
                    throw new Error("Invalid amount! Amount must be number")
                }

            }
        })
        return total;

    }, [mouthSelected, yearSelected])

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




    const { title, description, footerText, icon } = message

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMouthSelected(parseMonth);
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
                    defaultValue={mouthSelected} />
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

                <PieCharts data={relationExpansesVersusGains}/>
            </Content>

        </Container>

    );
}

export default Dashboard;