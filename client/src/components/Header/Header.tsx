import styled from '@emotion/styled';
import {AppBar, Box, PaletteMode, Toolbar, Tooltip} from '@mui/material';
import Typography from '@mui/material/Typography';
import logo from '../../assets/icons/ico.png'
import {FC} from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  // @ts-ignore
  boxShadow: theme.shadows[3]
}));

interface Props {
    changeTheme: (themeMode: PaletteMode) => void
    themeMode: PaletteMode
}

const Header: FC<Props> = ({changeTheme, themeMode}) => {
    const handleChangeThemeClick = () => {
        const themeModeToSet: PaletteMode = themeMode === 'dark' ? 'light' : 'dark'
        changeTheme(themeModeToSet)
        window.localStorage.setItem('themeMode', themeModeToSet)
    }
    return (
      <DashboardNavbarRoot position='sticky'>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 90,
            left: 0,
            px: 2,
          }}
        >
          <Tooltip title="Logo">
            <img
                style={{
                    maxWidth: '50px',
                }}
                src={logo}
                alt=""
            />
          </Tooltip>
          <Tooltip title="PR0MOTH3R v2.0">
            <Typography ml={2} variant="h5">
                PR0MOTH3R v2.0
            </Typography>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
            <span
                style={{paddingRight: '20px'}}
                onClick={handleChangeThemeClick}
            >
                {themeMode === 'dark'
                    ? <Brightness7Icon fontSize='large' cursor='pointer'/>
                    : <Brightness4Icon fontSize='large' cursor='pointer'/>
                }
            </span>
        </Toolbar>
      </DashboardNavbarRoot>
    );
};

export default Header