import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CloudIcon from '@material-ui/icons/Cloud';
import Auth0Lock from 'auth0-lock';
import { makeStyles } from '@material-ui/core/styles';
import {
  Tooltip,
  Zoom
 } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  optionsContainer: {
    height: '300px',
    display: 'flex',
    flexDirection: 'column'
  },
  optionsButton: {
    color: '#69f0ae',
    backgroundColor: '#000',
    border: '1px solid #69f0ae',
    marginTop: '5px',
    marginBottom: '10px',
    marginRight: '10px',
    '&:hover': {
        backgroundColor: '#04080a',
        color: '#69f0ae'
    }
  }
}));

export default function ModulesContainer(){

  // const dispatch = useDispatch();

  const classes = useStyles();

  // const {
  //   effectModules,
  // } = useSelector(state => state.effectBus);

  const addModule = () => {
    // const mapModules = (count) =>
    //   Array.from({ length: count }, (v, k) => k).map((k) => ({
    //     id: `item-${k}`,
    //     content: `item ${k}`,
    //   }));
    // dispatch(allActions.effectBusActions.setEffectBusData('effectModules', mapModules.length+1))
  }

  const authenticator = new Auth0Lock(
    process.env.REACT_APP_AUTH0_CLIENT_ID || '',
    process.env.REACT_APP_AUTH0_DOMAIN || '',
    { redirect: false }
  );

  return (

    <div className={classes.optionsContainer}>

      { process.env.REACT_APP_NODE_ENV === 'development-auth' &&

        <>

          <Tooltip TransitionComponent={Zoom} title={'Sign In'} placement="right">
            <Button className={classes.optionsButton} variant='contained' onClick={() => authenticator.show()}>
              <CloudIcon fontSize='large'/>
            </Button>
          </Tooltip>

          <Tooltip TransitionComponent={Zoom} title={'Add Effect Module'} placement="right">
            <Button className={classes.optionsButton} variant='contained' onClick={() => addModule()}>
              <AddIcon fontSize='large'/>
            </Button>
          </Tooltip>

        </>

      }

    </div>

  );

}
