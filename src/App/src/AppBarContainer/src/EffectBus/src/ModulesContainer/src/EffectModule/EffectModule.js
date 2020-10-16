import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ModuleToolbar from './src/ModuleToolbar'
import ModuleInterface from './src/ModuleInterface'
import {
  Paper,
  Typography
 } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  module: {
    width: '300px',
    height: '300px',
    margin: '5px',
    padding: '5px',
    backgroundColor: '#04080a',
    border: '2px solid #69f0ae',
    display: 'flex',
    flexDirection: 'column'
  },
  effectName: {
    fontFamily: "'Fascinate', cursive",
    color: '#26ce9e',
    display: 'flex',
    justifyContent: 'center'
  },
}));

export default function EffectModule(props){

  const classes = useStyles();

  const {
    innerRef,
    draggableProps,
    dragHandleProps,
    params
  } = props

  return (
    <Paper
      className={classes.module}
      ref={innerRef}
      {...draggableProps}
    >
      <ModuleToolbar
        innerRef={innerRef}
        draggableProps={draggableProps}
        dragHandleProps={dragHandleProps}
      />
      <Typography variant='h5' className={classes.effectName}>
        {params.displayName}
      </Typography>
      <ModuleInterface/>
    </Paper>
  );
}
