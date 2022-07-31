import React, { useMemo, useState, useEffect } from 'react';
import { Container, Content, Filters } from './styles';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

// import gains from '../../repositories/gains';
// import expenses from '../../repositories/expenses';

import formatCurrency from '../../utils/formatCurrency';

import { useParams } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import listOfMounths from '../../utils/months'
import { v4 as uuidv4 } from "uuid";
import { api } from '../../resources/api';
interface IData {
    id: number | string;
    description: string;
    amountFormated: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

interface IDataApi {
    description: string,
    amount: string,
    type: string,
    frequency: string,
    date: string
}
const List: React.FC = () => {

    const [gains, setGains] = useState<IDataApi[]>([]);
    const [expenses, setExpenses] = useState<IDataApi[]>([]);

    const [data, setData] = useState<IData[]>([]);
    const [mouthSelected, setMouthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente', 'eventual'])


    const movimentType = useParams().type;

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

    const pageData = useMemo(() => {
        return movimentType === 'entry-balance' ?
            {
                title: 'Entradas',
                lineColor: '#4E41F0',
                data: gains
            }
            :
            {
                title: 'Saídas',
                lineColor: '#E44C4E',
                data: expenses
            }
    }, [movimentType, gains, expenses])


    const months = useMemo(() => {
        return listOfMounths.map((month) => {
            return {
                value: month.value,
                label: month.label
            }
        });
    }, []);


    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        pageData.data.forEach(item => {
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
    }, [pageData.data]);

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMouthSelected(parseMonth);
        } catch (error) {
            throw new Error('invalid month value. Is accept 0 - 24.')
        }
    }

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch (error) {
            throw new Error('invalid month value. Is accept 0 - 24.')
        }
    }

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency)
        if (alreadySelected >= 0) {
            const filtered = frequencyFilterSelected.filter(item => item !== frequency)
            setFrequencyFilterSelected(filtered)
        } else {
            setFrequencyFilterSelected(prev => [...prev, frequency]);
        }
    }
    useEffect(() => {
        const filtredData = pageData.data.filter(item => {
            const date = new Date(item.date);

            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return yearSelected === year && month === mouthSelected && frequencyFilterSelected.includes(item.frequency);

        });

        const response = filtredData.map(item => {

            return {
                id: uuidv4(),
                description: item.description,
                amountFormated: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'eventual' ? '#E44C4E' : '#4E41F0'
            }
        })

        setData(response);
    }, [pageData.data, mouthSelected, yearSelected, data.length, frequencyFilterSelected]);
    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
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

            <Filters>
                <button
                    type="button"
                    className={`tag-filter tag-filter-recurrent
                    ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>

                <button
                    type="button"
                    className={`tag-filter tag-filter-eventual
                    ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('eventual')}
                >
                    Eventuais
                </button>
            </Filters>
            <Content>
                {
                    data.map((item) =>
                    (
                        <HistoryFinanceCard
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amount={item.amountFormated}
                        />))
                }
            </Content>
        </Container>
    );
}

export default List;