import React, { createContext, useState, useContext, ChildContextProvider, ProviderProps, ReactNode } from 'react';

import dark from '../styles/themes/dark';
import light from '../styles/themes/light';

interface IThemeProviderProps {
    children: ReactNode | undefined;
}
interface IThemeContext {
    toggleTheme(): void;
    theme: ITheme;
}

interface ITheme {
    title: string,
    colors: {
        primary: string;
        secondary: string;
        tertiary: string;

        white: string;
        black: string;
        gray: string;

        success: string;
        info: string;
        warning: string;
    },
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const ThemeProvider = ({ children }: IThemeProviderProps) => {

    const [theme, setTheme] = useState<ITheme>(() => {
        const themeSaved = localStorage.getItem('@minha-carteira:theme');

        return (themeSaved !== null) ? JSON.parse(themeSaved) : dark;
    });

    const toggleTheme = () => {
        if (theme.title === 'dark') {
            setTheme(light);
            localStorage.setItem('@minha-carteira:theme', JSON.stringify(light));
        } else {
            setTheme(dark)
            localStorage.setItem('@minha-carteira:theme', JSON.stringify(dark));

        }
    };
    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    )

}

const useTheme = (): IThemeContext => {
    const context = useContext(ThemeContext)

    return context;
}

export { ThemeProvider, useTheme }