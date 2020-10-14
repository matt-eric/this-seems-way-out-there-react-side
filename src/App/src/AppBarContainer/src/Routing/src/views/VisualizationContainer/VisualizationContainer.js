import React from 'react';
import Visualizer from './src/Visualizer'
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

      <Visualizer/>

    </div>

  );

}

export default Playground;
