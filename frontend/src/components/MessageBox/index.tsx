import React, { Children } from 'react';

import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import sweetImg from '../../assets/grinning.svg'
import thinking from '../../assets/thinking.png'

import { Container } from './style';
interface IMessageBoxProps {
    title: string;
    description: string;
    footerText: string;
    icon: string;
}

const MessageBox: React.FC<IMessageBoxProps> = ({ title, description, footerText, icon }) => {
    const iconSelected = () => {
        switch (icon) {
            case 'happy':
                return happyImg;
            case 'sad':
                return sadImg;
            case 'sweet':
                return sweetImg;
            case 'thinking':
                return thinking;
            default:
                return undefined; 
            }}

    return (
        <Container>
            <header>
                <h1>
                    {title}
                    <img src={iconSelected()} alt={title} />
                </h1>
                <p>
                    {description}
                </p>
            </header>
            <footer>
                <span>{footerText}</span>
            </footer>
        </Container>
    );
}

export default MessageBox;