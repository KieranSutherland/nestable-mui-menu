import { Box, MenuItemProps, MenuItem as MuiMenuItem, Typography } from "@mui/material";
import { MenuOption, NestableMenuProps } from "..";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface NestableMenuItemProps extends MenuItemProps {
    option: MenuOption;
    itemLabelProps: NestableMenuProps[ 'itemLabelProps' ];
}

export function NestableMenuItem(props: NestableMenuItemProps) {
    const { option, itemLabelProps, ...rest } = props;

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignSelf="flex-start"
            justifyContent="space-between"
            gap={ 1 }
            component={ MuiMenuItem }
            key={ option.label }
            { ...rest }
        >
            <Box
                display="flex"
                flexDirection="column"
                alignSelf="flex-start"
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    alignSelf="flex-start"
                    justifyContent="space-between"
                    gap={ 1 }
                >
                    <Typography { ...itemLabelProps }>
                        { option.label }
                    </Typography>
                </Box>
                <Typography fontSize="0.8rem" marginRight="auto" fontWeight="light" { ...itemLabelProps }>
                    { option.subtext }
                </Typography>
            </Box>
            { option.subMenuOptions && <ChevronRightIcon /> }
        </Box>
    )
}