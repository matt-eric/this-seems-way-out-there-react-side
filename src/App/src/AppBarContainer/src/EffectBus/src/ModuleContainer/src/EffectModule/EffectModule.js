import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { useDispatch, useSelector } from 'react-redux'
// import allActions from '../../../../../../../../../redux/actions'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SaveIcon from '@material-ui/icons/Save';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import WidgetsIcon from '@material-ui/icons/Widgets';
import {
  IconButton,
  Paper
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
  toolBar: {
    display: 'flex',
    flexDirecton: 'row',
  },
  interface: {
    display: 'flex',
    flexDirecton: 'column'
  },
  delete: {
    position: 'relative',
    marginLeft: '35%'
  }
}));

export default function EffectModule(props){

  // const dispatch = useDispatch();

  const classes = useStyles();

  const toolBarIcons = [
    {
      icon: <PowerSettingsNewIcon />,
      tooltip: 'Bypass'
    },
    {
      icon: <WidgetsIcon />,
      tooltip: 'Module Type'
    },
    {
      icon: <SaveIcon />,
      tooltip: 'Save As Preset'
    },
  ]

  // const {
  //   effectModules
  // } = useSelector(state => state.effectBus);

  // const setEffectBusData = (type, data) => dispatch(allActions.effectBusActions.setEffectBusData(type, data))

  return (
    <Paper
      className={classes.module}
      ref={props.innerRef}
      {...props.draggableProps}
      {...props.dragHandleProps}
    >
      <div className={classes.toolBar}>
        {toolBarIcons.map(obj =>
          <IconButton color="secondary">
            {obj.icon}
          </IconButton>
        )}
          <IconButton color="secondary" className={classes.delete}>
            <DeleteForeverIcon />
          </IconButton>
      </div>
      <div className={classes.interface}>

        {/*interface content goes here*/}

      </div>
    </Paper>
  );
}
