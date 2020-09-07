import React from 'react';
import Simulator from './src/Simulator'
import EffectBus from './src/EffectBus'
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

        <div className={classes.effects}>
          <EffectBus/>
        </div>

    </div>

  );

}

export default Playground;
