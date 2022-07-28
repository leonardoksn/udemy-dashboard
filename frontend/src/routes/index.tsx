import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import App from './app.routes';

const BrowserRoutes: React.FC = () =>(
    <BrowserRouter>
    <App/>
    </BrowserRouter>
   
)

export default BrowserRoutes;