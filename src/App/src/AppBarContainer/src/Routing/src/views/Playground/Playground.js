import React from 'react';
import Simulator from './src/Simulator'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  simulator: {

  },
  effects: {

  }
}));

function Playground() {

  const classes = useStyles();

  return (

    <div className={classes.root}>

        <div className={classes.simulator}>
          <Simulator/>
        </div>

    </div>

  );

}

export default Playground;
