import styled from "styled-components";

export const Container = styled.div`
    width: 48%;
    min-height: 260px;

    margin:10px 0;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    
    border-radius: 7px;
`;

export const SideLeft = styled.aside`
`;

export const SideRight = styled.main`
`;