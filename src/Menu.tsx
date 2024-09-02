import React, { useState } from 'react';
import {
    Menu as MuiMenu, MenuProps as MuiMenuProps, MenuItem, List, Divider, Typography,
    Box, IconButton, ListProps, MenuItemProps, TypographyProps
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface MenuOption {
    /**
     * Label for the menu item.
     */
    label: string;
    /**
     * Secondary label for additional information.
     */
    subtext?: string;
    /**
     * Menu options to display nested within this parent menu option.
     */
    subMenuOptions?: MenuOption[];
    /**
     * Function to call when the option is clicked.
     */
    action?: () => any;
}

export interface MenuProps extends Omit<MuiMenuProps, 'open'> {
    /**
     * Options to display in the menu.
     */
    options: MenuOption[]; // TODO - Change to groups to allow dividers between options.
    /**
     * Anchor of the element to pin the menu to.
     */
    anchorEl: HTMLElement | null;
    /**
     * Setter function for the anchor.
     */
    setAnchorEl: (element: HTMLElement | null) => void;
    listProps?: ListProps;
    menuItemProps?: MenuItemProps;
    subMenuTitleLabelProps?: TypographyProps;
    itemLabelProps?: TypographyProps;
}

export function Menu(props: MenuProps): JSX.Element {
    const { options, anchorEl, setAnchorEl, listProps, menuItemProps,
        itemLabelProps, subMenuTitleLabelProps, ...rest } = props;

    const [ currentMenuIndexes, setCurrentMenuIndexes ] = useState<number[]>([]);

    const { currentMenu, subMenuTitle } = React.useMemo(() => {
        let menu = options;
        let subMenuTitle;
        for (const index of currentMenuIndexes) {
            subMenuTitle = menu[ index ].label
            menu = menu[ index ].subMenuOptions!;
        }
        return {
            currentMenu: menu,
            subMenuTitle
        };
    }, [ currentMenuIndexes, options ]);

    const handleClick = React.useCallback((option: MenuOption, index: number) => {
        const { action, subMenuOptions } = option;
        if (action) {
            action();
        }
        if (subMenuOptions) {
            setCurrentMenuIndexes([ ...currentMenuIndexes, index ]);
        }
    }, [ currentMenuIndexes ]);

    const handleClose = React.useCallback(() => {
        setAnchorEl(null);
    }, [ setAnchorEl ]);

    const handleExit = React.useCallback(() => {
        setCurrentMenuIndexes([]);
    }, [ setAnchorEl ]);

    const handleBack = React.useCallback(() => {
        setCurrentMenuIndexes(currentMenuIndexes.slice(0, -1));
    }, [ currentMenuIndexes, setCurrentMenuIndexes ]);

    return (
        <MuiMenu
            anchorEl={ anchorEl }
            open={ !!anchorEl }
            onClose={ handleClose }
            anchorOrigin={ {
                vertical: 'top',
                horizontal: 'right',
            } }
            transformOrigin={ {
                vertical: 'top',
                horizontal: 'right',
            } }
            TransitionProps={ {
                onExited: handleExit
            } }
            { ...rest }
        >
            <List { ...listProps }>
                {
                    typeof subMenuTitle !== 'undefined' && (
                        <Box display="flex" flexDirection="column" gap={ 1 } marginBottom={ 1 } paddingX={ 1 }>
                            <Box display="flex" flexDirection="row" alignItems="center" gap={ 1 } marginRight={ 1 }>
                                <IconButton aria-label="back" onClick={ handleBack }>
                                    <ArrowBackIcon />
                                </IconButton>
                                <Typography fontSize="1.1rem" { ...subMenuTitleLabelProps }>
                                    { subMenuTitle }
                                </Typography>
                            </Box>
                            <Divider orientation="horizontal" flexItem />
                        </Box>
                    )
                }
                {
                    currentMenu.map((option, index) => {
                        return (
                            <Box
                                display="flex"
                                flexDirection="row"
                                alignSelf="flex-start"
                                justifyContent="space-between"
                                gap={ 1 }
                                component={ MenuItem }
                                onClick={ () => handleClick(option, index) }
                                key={ option.label }
                                { ...menuItemProps }
                            >
                                <Typography { ...itemLabelProps }>
                                    { option.label }
                                </Typography>
                                { option.subMenuOptions && <ChevronRightIcon /> }
                            </Box>
                        )
                    })
                }
            </List>
        </MuiMenu>
    );
};