import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../resources/api";

interface IAuthContext {
    logged: boolean;
    signIn(email: string, password: string): void;
    signOut(): void;
}

interface IChildrenProps {
    children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)


const AuthProvider = ({ children }: IChildrenProps) => {
    const [logged, setLoggged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@minha-carteira:logged')

        return !!isLogged;
    })

    const signIn = (email: string, password: string) => {

        const fetch = async () => {
            await api.post('/auth/login', {
                email,
                password
            })
                .then(response => {
                    console.log(response)
                    if (response.status === 200) {

                        localStorage.setItem('@minha-carteira:logged', response.data.token)
                        setLoggged(state => state = true)
                    }else{
                        alert("Usuário e senha invalidos")
                    }
                })
             }
             fetch()
    }

    const signOut = () => {
        localStorage.removeItem('@minha-carteira:logged');
        setLoggged(false)
    }
    return (

        <AuthContext.Provider value={{ logged, signIn, signOut }}>
            {children}
        </AuthContext.Provider>

    );
}

const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext)

    return context;
}
export { useAuth, AuthProvider };