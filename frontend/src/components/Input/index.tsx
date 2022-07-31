import React, { HtmlHTMLAttributes, InputHTMLAttributes } from "react";

import {
    Container
} from './style';

type IInputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<IInputProps> = ({ ...rest }) => {
    return (

        <Container {...rest} />

    );
}

export default Input;