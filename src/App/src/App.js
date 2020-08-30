import React from 'react';
// import AuthRouter from '../../AuthRouter';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { theme } from './theme'

const MuiTheme = createMuiTheme(theme)

function App() {

  return (

    <div className="App">

      hello world

    </div>

  );

}

export default App;
