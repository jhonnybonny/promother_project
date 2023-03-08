import {Box, Container, Grid} from "@mui/material";
import ServersList from "../ServersList";
import AddServerForm from "../forms/EditConfig";
import Header from '../Header/Header';
import {ThemeProvider} from "@emotion/react";
import {setupTheme} from "../../theme";
import {PaletteMode} from '../../theme/theme-switch'
import React from "react";
import EditBTSConfig from '../forms/EditBTSConfig';
import AddException from '../forms/AddException';
import Coordinates from '../Coordinates';
import EditSmsConfig from '../forms/EditSmsConfig';

function App() {
    const themeModeInStorage = window.localStorage.getItem('themeMode') as PaletteMode
    const getThemeModeFromStorage = (): PaletteMode => {
        if (themeModeInStorage) return themeModeInStorage
        window.localStorage.setItem('themeMode', 'light')
        return 'light'
    }
    const [themeMode, changeTheme] = React.useState<PaletteMode>(getThemeModeFromStorage())
    const theme = React.useMemo(
        () => setupTheme(themeMode),
        [themeMode]
    )
    const appBackground = themeMode === 'dark' ? '#000' : '#fff'
    return (
      <ThemeProvider theme={theme}>
        <div
            style={{
                background: appBackground,
                minHeight: '100vh'
            }}
            className="App"
        >
          <Header
              themeMode={themeMode}
              changeTheme={changeTheme}
          />
          <Box
              component="main"
              sx={{flexGrow: 1, py: 0, mt: 3}}
          >
            <Container maxWidth={false}>
              <Grid container spacing={3}>
                  <Grid item xl={4} md={12} xs={12}>
                      <Coordinates />
                      <EditSmsConfig />
                      <AddServerForm />
                      <EditBTSConfig />
                      <AddException />
                  </Grid>
                  <Grid item xl={8} md={12} xs={12}>
                      <ServersList />
                  </Grid>
              </Grid>
            </Container>
          </Box>
        </div>
      </ThemeProvider>
  );
}

export default App;
