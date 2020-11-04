import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ModuleToolbar from './src/ModuleToolbar'
import ModuleInterface from './src/ModuleInterface'
import { useSelector } from 'react-redux'
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
    backgroundColor: '#000',
    border: '2px solid #69f0ae',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  effectName: {
    fontFamily: "'Fascinate', cursive",
    color: '#26ce9e',
    display: 'flex',
    justifyContent: 'center'
  },
  bypass: {
    backgroundColor: '#009760',
    width: '300px',
    height: '300px',
  },
}));

export default function EffectModule(props){

  const classes = useStyles();

  const {
    effectModules,
  } = useSelector(state => state.effectBus);

  const {
    innerRef,
    draggableProps,
    dragHandleProps,
    params,
    index
  } = props

  return (
    <Paper
      className={classes.module}
      ref={innerRef}
      {...draggableProps}
    >
      <div className={effectModules[index]['params']['bypass'] ? classes.bypass : undefined}>
        <ModuleToolbar
          index={index}
          innerRef={innerRef}
          draggableProps={draggableProps}
          dragHandleProps={dragHandleProps}
        />
        <Typography variant='h5' className={classes.effectName}>
          {params.displayName}
        </Typography>
        { !effectModules[index]['params']['bypass'] &&
          <ModuleInterface
            params={params}
            index={index}
          />
        }
      </div>
    </Paper>
  );
}
