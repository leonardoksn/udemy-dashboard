import React, { Children } from 'react';

import { Container } from './style';

const Content: React.FC<any> = ({ children }) => {
    return (
        <Container>
           {children}
        </Container>

    );
}

export default Content;