import React, { useState } from 'react';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Input copy';

import Input from '../../components/Input';
import {
    Container,
    Logo,
    Form,
    FormTitle

} from './styles';

import { useAuth } from '../../hooks/auth'

const SignIn: React.FC = () => {
    const { signIn } = useAuth()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Minha Carteira" />
                <h2>Minha Carteira</h2>
            </Logo>
            <Form onSubmit={() => signIn(email, password)}>
                <FormTitle>Entrar</FormTitle>
                <Input type="email"
                    required
                    placeholder='e-mail'
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <Input
                    type="password"
                    required
                    placeholder='senha'
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <Button type="submit">Acessar</Button>
            </Form>
        </Container>
    );
}

export default SignIn;