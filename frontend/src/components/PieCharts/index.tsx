
import React from 'react';

import {
    Pie,
    ResponsiveContainer,
    Cell,
    PieChart,
    // PieChart
} from 'recharts';

import {
    Container,
    SideLeft,
    SideRight,
    LegendContainer,
    Legend
} from './style';

interface IPieChartProps {
    data: {
        percent: number;
        value: number;
        name: string;
        color: string;
    }[];
}
const PieCharts: React.FC<IPieChartProps> = ({ data }) => (
    <>
        <Container>
            <SideLeft>
                <LegendContainer>
                    {
                        data.map((item) => (

                            <Legend key={item.name}
                                color={item.color}>
                                <div>{(!isNaN(item.percent)) && item.percent+`%`}</div>
                                <span>{item.name}</span>
                            </Legend>
                        ))
                    }
                </LegendContainer>
            </SideLeft>
            <SideRight>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={data} dataKey='percent' >
                            {
                                data.map((item) => (
                                    <Cell key={item.name} fill={item.color} />

                                ))
                            }
                        </Pie>

                    </PieChart>
                </ResponsiveContainer>

            </SideRight>

        </Container>




    </>
)

export { PieCharts };