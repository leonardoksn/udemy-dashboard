import styled, { keyframes } from "styled-components";

interface IlegendProps {
    color: string;
}

const animate = keyframes`

    0%{
        transform: translateX(-100px);
    }

    50%{
        opacity: .3;
    }

    100%{
        transform: translateX(0px);
        opacity: 1;
    }
`

export const Container = styled.div`
    display: flex;
    width: 48%;
    min-height: 260px;

    margin:10px 0;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    
    border-radius: 7px;

    @media (max-width:1280px ) {
        display: flex;
        flex-direction: column;
    
        width: 100%;
        height: auto;
    }

    animation: ${animate} .5s;
`;

export const SideLeft = styled.aside`

    
    padding: 30px 20px;
    > h2 {
        padding-left: 16px;
        margin-bottom: 10px;
    }
`;

export const SideRight = styled.main`
    flex : 1;
    min-height: 175px;
    display: flex;
    justify-content: center;
    padding-top: 35px;
    padding-bottom: 20px;
    margin-left: 80px;
    max-width: 200px;
    @media (max-width: 1280px) {
        max-width: 100%;
        margin-left: 0%;
    }
`;


export const LegendContainer = styled.ul`
    list-style: none;

    margin-top: 77px;
    max-height: 175px;
    padding-top: 10px;
    padding-right: 15px;
    overflow-y: scroll;

    ::-webkit-scrollbar{
        width: 10px;
    }
    
    ::-webkit-scrollbar-thumb{
        background-color: ${props => props.theme.colors.secondary};
        border-radius: 10px;
    }
    
    ::-webkit-scrollbar-track{
        background-color: ${props => props.theme.colors.tertiary};
    }
    
    @media (max-width: 1280px) {
        display: flex;
        height: auto;
      
    }

`;

export const Legend = styled.li<IlegendProps>`
    display: flex;
    align-items: center;

    margin-bottom: 7px;

    padding-left: 16px;
    
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

    @media (max-width: 1280px) {
        >div{
            width: 30px;
            height: 30px;

            line-height: 30px;
            font-size: 10px;
            }
      
    }
`;