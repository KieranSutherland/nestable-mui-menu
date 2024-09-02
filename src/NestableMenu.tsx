import React, { useState } from 'react';
import {
    Menu as MuiMenu, MenuProps as MuiMenuProps, List, ListProps, MenuItemProps, TypographyProps, Divider
} from '@mui/material';
import { NestableMenuItem } from './components/NestableMenuItem';
import { SubMenuTitle } from './components/SubMenuTitle';

interface MenuOptionWithAction {
    /**
     * Menu options to display nested within this parent menu option.
     * Providing an action is not supported if sub-menu options are provided.
     */
    subMenuGroups?: never;
    /**
     * Function to call when the option is clicked.
     * Providing an sub-menu options is not supported if an action is provided.
     */
    action?: () => any;
}

interface MenuOptionWithsubMenuGroups {
    /**
     * Menu options are not supported if there is an action.
     * Providing an action is not supported if sub-menu options are provided.
     */
    subMenuGroups?: MenuOption[][];
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
} & (MenuOptionWithAction | MenuOptionWithsubMenuGroups);

export interface NestableMenuProps extends Omit<MuiMenuProps, 'open'> {
    /**
     * Groups of options to display in the menu.
     */
    groups: MenuOption[][];
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

interface CurrentMenuIndex {
    groupIndex: number;
    itemIndex: number;
}

export function NestableMenu(props: NestableMenuProps): JSX.Element {
    const { groups, anchorEl, setAnchorEl, listProps, menuItemProps,
        itemLabelProps, subMenuTitleLabelProps, ...rest } = props;

    const [ currentMenuIndexes, setCurrentMenuIndexes ] = useState<CurrentMenuIndex[]>([]);

    const { currentMenu, subMenuTitle } = React.useMemo(() => {
        let menu = groups;
        let subMenuTitle;
        for (const { groupIndex, itemIndex } of currentMenuIndexes) {
            const currentItem = menu[ groupIndex ][ itemIndex ];
            subMenuTitle = currentItem.label
            menu = currentItem.subMenuGroups!;
        }
        return {
            currentMenu: menu,
            subMenuTitle
        };
    }, [ currentMenuIndexes, groups ]);

    const handleClick = React.useCallback((option: MenuOption, groupIndex: number, itemIndex: number) => {
        const { action, subMenuGroups } = option;
        if (action) {
            action();
            handleClose();
        } else if (subMenuGroups) {
            setCurrentMenuIndexes([
                ...currentMenuIndexes,
                {
                    groupIndex,
                    itemIndex
                }
            ]);
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
                    currentMenu.map((options, groupIndex) => {
                        return (
                            <React.Fragment>
                                {
                                    options.map((option, itemIndex) => {
                                        return (
                                            <NestableMenuItem
                                                option={ option }
                                                itemLabelProps={ itemLabelProps }
                                                onClick={ () => handleClick(option, groupIndex, itemIndex) }
                                            />
                                        )
                                    })
                                }
                                { groupIndex !== currentMenu.length - 1 && <Divider orientation="horizontal" flexItem /> }
                            </React.Fragment>
                        )
                    })
                }
            </List>
        </MuiMenu>
    );
};