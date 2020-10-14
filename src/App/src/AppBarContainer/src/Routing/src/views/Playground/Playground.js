import React from 'react';
import Simulator from './src/Simulator'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    width: '100vw',
  },
  simulator: {
    overflow: 'none',
    width: 'auto',
    pisition: 'relative'
  },
}));

function Playground() {

  const classes = useStyles();

  return (

    <div className={classes.root}>

          <Simulator/>

    </div>

  );

}

export default Playground;
