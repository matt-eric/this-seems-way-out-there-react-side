import React from 'react';
// import AuthRouter from '../../AuthRouter';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { theme } from './theme'
import Routing from './Routing'

const MuiTheme = createMuiTheme(theme)

function App() {

  return (

    <div>

      <BrowserRouter>

        <MuiThemeProvider theme={MuiTheme}>

          <Routing/>

        </MuiThemeProvider>

      </BrowserRouter>

    </div>

  );

}

export default App;
