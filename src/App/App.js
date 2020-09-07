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

      <BrowserRouter>

        <MuiThemeProvider theme={MuiTheme}>

          <AppBarContainer/>

        </MuiThemeProvider>

      </BrowserRouter>

    </div>

  );

}

export default App;
