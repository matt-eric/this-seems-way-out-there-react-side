import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom';
import AppBarContainer from './src/AppBarContainer'
import { Typography } from '@material-ui/core';
import { theme } from './theme'

const MuiTheme = createMuiTheme(theme)

function App() {

  return (

    <div>

      <MuiThemeProvider theme={MuiTheme}>

        { (/Mobi/.test(navigator.userAgent)) || (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)

        ?

        <Typography color="secondary">
          We are working on optimizing This seems WAY out there. for mobile devices. Please use a computer to enjoy This seems WAY out there..
        </Typography>

        :

        <BrowserRouter>

            <AppBarContainer/>

        </BrowserRouter>

        }

      </MuiThemeProvider>

    </div>

  );

}

export default App;
