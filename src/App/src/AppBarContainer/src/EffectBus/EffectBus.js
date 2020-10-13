import React from 'react';
import EffectModule from './src/EffectModule'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    top: 'auto',
    position: 'absolute',
    bottom: '10px',
    maxHeight: '50%',
    overflow: 'scroll',
    width: '100vw',
    paddingBottom: '3em',
  },
  panel: {
    backgroundColor: '#04080a'
  }
}));

export default function EffectBus(props) {

  const classes = useStyles();

  const {
    expanded
  } = useSelector(state => state.effectBus);

  return(

    <div className={classes.root}>

      <ExpansionPanel className={classes.panel} expanded={expanded}>

        <ExpansionPanelSummary
          aria-controls="panel1a-content"
          style={{display: 'none'}}
        >
        </ExpansionPanelSummary>

        <ExpansionPanelDetails >

          <EffectModule/>

        </ExpansionPanelDetails>

      </ExpansionPanel>

    </div>

  )

}
