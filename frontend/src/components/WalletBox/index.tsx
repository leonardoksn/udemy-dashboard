import styled from 'styled-components';
import dollarImg from '../../assets/dollar.svg'
import arrowDownImg from '../../assets/arrow-down.svg'
import arrowUpImg from '../../assets/arrow-up.svg'
import CountUp from 'react-countup'
import { Container } from './style'

interface IWalletBoxProps {
    title: string;
    amount: number;
    footerlabel: string;
    icon: 'dollar' | 'arrowUp' | 'arrowDown';
    color: string;
}
const WalletBox: React.FC<IWalletBoxProps> = ({
    title,
    amount,
    footerlabel,
    icon,
    color
}) => {
    const iconSelected = () => {
        switch (icon) {
            case 'dollar':
                return dollarImg;
            case 'arrowUp':
                return arrowUpImg;
            case 'arrowDown':
                return arrowDownImg
            default:
                return undefined;
        }
    }
    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <strong>R$</strong>
                
                <CountUp
                    end={amount}
                    decimal=","
                    decimals={2}

                />
            </h1>
            <small>{footerlabel}</small>
            <img src={iconSelected()} alt={title}></img>
        </Container>

    );
}

export default WalletBox;