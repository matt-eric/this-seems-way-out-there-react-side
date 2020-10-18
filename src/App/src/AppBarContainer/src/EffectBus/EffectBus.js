import React from 'react';
import ModulesContainer from './src/ModulesContainer'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    top: 'auto',
    position: 'fixed',
    bottom: '10px',
    maxHeight: '50%',
    overflowX: 'scroll',
    width: '100%',
    paddingBottom: '3em',
  },
  panel: {
    backgroundColor: '#04080a',
    opacity: '.75'
  }
}));

export default function EffectBus(props) {

  const classes = useStyles();

  const {
    expanded
  } = useSelector(state => state.effectBus);

  return(

    <div className={classes.root}>
      <Accordion className={classes.panel} expanded={expanded}>
        <AccordionSummary
          aria-controls="panel1a-content"
          style={{display: 'none'}}
        />
        <AccordionDetails >
          <ModulesContainer/>
        </AccordionDetails>
      </Accordion>
    </div>

  )

}
