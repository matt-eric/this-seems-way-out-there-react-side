import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../../../../../../../../redux/actions'

const useStyles = makeStyles(theme => ({
  module: {
    width: '200px',
    height: '200px',
    margin: '5px',
    backgroundColor: '#04080a',
    border: '2px solid #69f0ae'
  }
}));

export default function EffectModule(props){

  const dispatch = useDispatch();

  const classes = useStyles();

  const {
    effectModules
  } = useSelector(state => state.effectBus);

  const setEffectBusData = (type, data) =>     dispatch(allActions.effectBusActions.setEffectBusData(type, data))

  return (
    <Paper
      className={classes.module}
      ref={props.innerRef}
      {...props.draggableProps}
      {...props.dragHandleProps}
    >
      hello world
    </Paper>
  );
}
