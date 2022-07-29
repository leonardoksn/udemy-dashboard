import styled from "styled-components"


interface IlegendProps {
    color: string;
}

export const Container = styled.div`
width: 100%;

/* display: flex;
/*
flex-direction: column; */

background-color: ${props => props.theme.colors.tertiary};
color: ${props => props.theme.colors.white};

margin: 10px 0;
padding: 30px 20px;

border-radius: 7px;


`;

export const ChartContainer = styled.div`
flex: 1;
height: 260px;
`

export const Header = styled.header`
width: 100%;
display: flex;
justify-content: space-between;

>h2{
    margin-bottom:20px;
    padding-left: 16px;
}
`;


export const LegendContainer = styled.ul`
list-style: none;
display: flex;
`;



export const Legend = styled.li<IlegendProps>`
display: flex;


align-items: center;

margin-bottom: 7px;
margin-left: 7px;
padding-right: 16px;

>div{
    background-color: ${props => props.color};

    width: 40px;
    height: 40px;
    border-radius: 5px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;

}

>span{
    margin-left: 5px;
}
`;

export const SideRight = styled.main`
display: flex;
flex: 1;
justify-content: center;

`;
