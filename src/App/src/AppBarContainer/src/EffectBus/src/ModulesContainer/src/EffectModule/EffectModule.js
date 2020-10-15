import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ModuleToolbar from './src/ModuleToolbar'
import ModuleInterface from './src/ModuleInterface'
import { Paper } from '@material-ui/core';

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
}));

export default function EffectModule(props){

  const classes = useStyles();

  return (
    <Paper
      className={classes.module}
      ref={props.innerRef}
      {...props.draggableProps}
    >
      <ModuleToolbar
        innerRef={props.innerRef}
        draggableProps={props.draggableProps}
        dragHandleProps={props.dragHandleProps}
      />
      <ModuleInterface/>
    </Paper>
  );
}
