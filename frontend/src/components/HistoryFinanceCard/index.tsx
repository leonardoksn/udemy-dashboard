import React, { Children } from 'react';

import { Container, Tag } from './styles';

interface IHistoryFinanceCardProps{
   
    tagColor: string;
    title: string;
    subtitle: string;
    amount: string;
}
const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = ({
    tagColor,
    title,
    subtitle,
    amount

}) => {
    return (
        <Container>
           <Tag color={tagColor}/>
           <div>
            <h3>{title}</h3>
            <small>{subtitle}</small>
           </div>
           <h3>{amount}</h3>
        </Container>

    );
}

export default HistoryFinanceCard;



