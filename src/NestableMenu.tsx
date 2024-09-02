import React, { useState } from 'react';
import {
    Menu as MuiMenu, MenuProps as MuiMenuProps, List, ListProps, MenuItemProps, TypographyProps
} from '@mui/material';
import { NestableMenuItem } from './components/NestableMenuItem';
import { SubMenuTitle } from './components/SubMenuTitle';

interface MenuOptionWithAction {
    /**
     * Menu options to display nested within this parent menu option.
     * Providing an action is not supported if sub-menu options are provided.
     */
    subMenuOptions?: never;
    /**
     * Function to call when the option is clicked.
     * Providing an sub-menu options is not supported if an action is provided.
     */
    action?: () => any;
}

interface MenuOptionWithSubMenuOptions {
    /**
     * Menu options are not supported if there is an action.
     * Providing an action is not supported if sub-menu options are provided.
     */
    subMenuOptions?: MenuOption[];
    /**
     * Function to call when the option is clicked.
     * Providing an sub-menu options is not supported if an action is provided.
     */
    action?: never;
}

export type MenuOption = {
    /**
     * Label for the menu item.
     */
    label: string;
    /**
     * Secondary label for additional information.
     */
    subtext?: string;
} & (MenuOptionWithAction | MenuOptionWithSubMenuOptions);

export interface NestableMenuProps extends Omit<MuiMenuProps, 'open'> {
    /**
     * Options to display in the menu.
     */
    options: MenuOption[];
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

export function NestableMenu(props: NestableMenuProps): JSX.Element {
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
            handleClose();
        } else if (subMenuOptions) {
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
                        <SubMenuTitle
                            handleBack={ handleBack }
                            subMenuTitle={ subMenuTitle }
                            subMenuTitleLabelProps={ subMenuTitleLabelProps }
                        />
                    )
                }
                {
                    currentMenu.map((option, index) => {
                        return (
                            <NestableMenuItem
                                option={ option }
                                itemLabelProps={ itemLabelProps }
                                onClick={ () => handleClick(option, index) }
                            />
                        )
                    })
                }
            </List>
        </MuiMenu>
    );
};