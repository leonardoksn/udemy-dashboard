import React from 'react';

import {
    Container,
    ToggleLabel,
    ToggleSelector

} from './styles'
interface IToggleProps{
    labelLeft: string;
    labelRight: string;
    checked: boolean;
    onChange(): void;

}
// const [value,setValue] = useState(false);
export const Toggle: React.FC<IToggleProps> = (
    {
        labelLeft,
        labelRight,
        onChange,
        checked
    }
) => (
        <Container>
            <ToggleLabel>{labelLeft}</ToggleLabel>
            <ToggleSelector
                checked={checked}
                uncheckedIcon={false}
                checkedIcon={false}
                onChange={onChange}
            />
            <ToggleLabel>{labelRight}</ToggleLabel>
        </Container>
    )

