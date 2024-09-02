import { Box, Divider, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NestableMenuProps } from "..";

export interface SubMenuTitleProps {
    handleBack: () => void;
    subMenuTitle: string;
    subMenuTitleLabelProps: NestableMenuProps[ 'subMenuTitleLabelProps' ]
}

export function SubMenuTitle(props: SubMenuTitleProps) {
    const { handleBack, subMenuTitle, subMenuTitleLabelProps } = props;

    return (
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