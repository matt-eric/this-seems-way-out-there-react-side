import React from 'react';
import ModulesContainer from './src/ModulesContainer'
import OptionsInterface from './src/OptionsInterface'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core'
import { Auth0Provider } from '@auth0/auth0-react';
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
    backgroundColor: '#000',
    opacity: '.75'
  },
  accordianDetails: {
    display: 'flex',
    flexDirection: 'row'
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
        <AccordionDetails className={classes.accordianDetails}>
          <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
            redirectUri={window.location.origin}
          >
            <OptionsInterface/>
            <ModulesContainer/>
          </Auth0Provider>
        </AccordionDetails>
      </Accordion>
    </div>

  )

}
