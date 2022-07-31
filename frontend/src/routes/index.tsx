import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import App from './app.routes';
import Auth from './auth.routes';

import { useAuth } from '../hooks/auth';
const BrowserRoutes: React.FC = () => {

    const { logged } = useAuth();
    return (
        <BrowserRouter>
            {!logged ? <Auth /> : <App />}
        </BrowserRouter>
    );
}

export default BrowserRoutes;