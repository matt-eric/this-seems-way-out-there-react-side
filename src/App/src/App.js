import React from 'react';
// import AuthRouter from '../../AuthRouter';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { theme } from './theme'
import Simulator from './Components/Simulator'

const MuiTheme = createMuiTheme(theme)

function App() {

  return (

    <div className="App">

      <MuiThemeProvider theme={MuiTheme}>

        <Simulator/>

      </MuiThemeProvider>

    </div>

  );

}

export default App;
