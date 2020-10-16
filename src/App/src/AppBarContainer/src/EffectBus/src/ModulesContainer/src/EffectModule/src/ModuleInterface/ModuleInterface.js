import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { useDispatch } from 'react-redux'
// import allActions from '../../../../../../../../../redux/actions'
import Slider from './src/Slider'

const useStyles = makeStyles(theme => ({
  interface: {
    display: 'flex',
    flexDirecton: 'column',
    marginTop: '35px',
    margin: '20px'
  },
}));

export default function ModuleInterface(props){

  // const dispatch = useDispatch();

  const classes = useStyles();

  const {
    params,
    index
  } = props

  return (
    <div className={classes.interface}>
      {
        params.settings &&
          Object.keys(params.settings).map(setting =>
            <Slider
              setting={setting}
              params={params}
              index={index}
            />
          )
      }
    </div>
  );
}
