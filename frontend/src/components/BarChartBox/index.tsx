import React, { Children } from 'react';
import logo from '../../assets/logo.svg'
import {
    Container,
    SideLeft,
    SideRight,
 
} from './style';


const BarChartBox: React.FC = () => {
    return (
        <Container>
            <SideLeft>
                <h2>Gráfico de Barras</h2>
            </SideLeft>

            <SideRight>

            </SideRight>
        </Container>

    );
}

export { BarChartBox };