import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import light from './styles/themes/light';
import dark from './styles/themes/dark';
import BrowserRoutes from './routes';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={dark}>
            <GlobalStyles />
            <BrowserRoutes />
        </ThemeProvider>
    );
}

export default App;