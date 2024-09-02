import { useState } from 'react'
import { NestableMenu, NestableMenuProps } from './NestableMenu';
import { Button, ButtonProps } from '@mui/material';
import React from 'react';

export interface NestableMenuButtonProps extends Omit<NestableMenuProps, 'anchorEl' | 'setAnchorEl'> {
    /**
     * Label for the button.
     */
    label: string
    buttonProps?: ButtonProps;
}

export function NestableMenuButton(props: NestableMenuButtonProps) {
    const { label, buttonProps, groups } = props;
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
            <NestableMenu
                anchorEl={ anchorEl }
                setAnchorEl={ setAnchorEl }
                groups={ groups }
            />
        </>
    )
}