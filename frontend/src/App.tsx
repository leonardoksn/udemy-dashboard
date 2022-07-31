import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import light from './styles/themes/light';
import dark from './styles/themes/dark';
import BrowserRoutes from './routes';
import {useTheme} from './hooks/theme'

const App: React.FC = () => {
    const {theme} = useTheme()
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <BrowserRoutes />
        </ThemeProvider>
    );
}

export default App;