import React from "react"

import { useAuth } from "../hooks/auth";

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignIn from "../pages/Signin";

const Auth: React.FC = () => (

        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
);

export default Auth;