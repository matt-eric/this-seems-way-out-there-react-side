import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom';
import AppBarContainer from './src/AppBarContainer'
import { theme } from './theme'

const MuiTheme = createMuiTheme(theme)

function App() {

  return (

    <div>

      { (/Mobi/.test(navigator.userAgent)) || (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)

      ?

      <div>
        We are working on optimizing This seems WAY out there. for mobile devices. Until then, please use a computer to enjoy This seems WAY out there..
      </div>

      :

      <BrowserRouter>

        <MuiThemeProvider theme={MuiTheme}>

          <AppBarContainer/>

        </MuiThemeProvider>

      </BrowserRouter>

      }

    </div>

  );

}

export default App;
