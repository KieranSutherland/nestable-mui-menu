import { useState } from 'react'
import { Menu, MenuProps } from './Menu';
import { Button, ButtonProps } from '@mui/material';
import React from 'react';

export interface MenuButtonProps extends Omit<MenuProps, 'anchorEl' | 'setAnchorEl'> {
    /**
     * Label for the button.
     */
    label: string
    buttonProps?: ButtonProps;
}

export function MenuButton(props: MenuButtonProps) {
    const { label, buttonProps, options } = props;
    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);

    const handleButtonClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, [ setAnchorEl ]);

    return (
        <>
            <Button
                variant="contained"
                onClick={ handleButtonClick }
                { ...buttonProps }
            >
                { label }
            </Button>
            <Menu
                anchorEl={ anchorEl }
                setAnchorEl={ setAnchorEl }
                options={ options }
            />
        </>
    )
}