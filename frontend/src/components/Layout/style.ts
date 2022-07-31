import styled from 'styled-components';
/* Layout:
MH = MainHeader
AS = Aside
CT =  */

export const Grid = styled.div`

    display: grid;

    grid-template-columns: 250px auto;
    grid-template-rows: 70px auto;

    grid-template-areas:
    'AS MH'
    'AS CT';

    min-width: 315px;
    height: 100vh;

    @media(max-width: 720px){
       
        grid-template-columns:100%;
        grid-template-rows: 70px auto;

        grid-template-areas:
        'MH MH'
        "CT CT"
        ;

    }

`;