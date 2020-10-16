import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { useDispatch } from 'react-redux'
// import allActions from '../../../../../../../../../redux/actions'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import {
  IconButton,
  Paper,
  Tooltip,
  Zoom
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
  delete: {
    position: 'relative',
    marginLeft: '70%'
  }
}));

export default function ModuleToolbar(props){

  // const dispatch = useDispatch();

  const classes = useStyles();

  const {
    dragHandleProps,
  } = props

  const toolBarIcons = [
    {
      icon: <PowerSettingsNewIcon />,
      tooltip: 'Bypass'
    },
    // {
    //   icon: <WidgetsIcon />,
    //   tooltip: 'Module Type'
    // },
    // {
    //   icon: <SaveIcon />,
    //   tooltip: 'Save As Preset'
    // },
  ]

  return (
    <div className={classes.toolBar}>
      {toolBarIcons.map(obj =>
        <IconButton
          color="secondary"
        >
          <Tooltip TransitionComponent={Zoom} title={obj.tooltip}>
            {obj.icon}
          </Tooltip>
        </IconButton>
      )}
        <IconButton color="secondary"
          className={classes.delete}
          {...dragHandleProps}
        >
          <Tooltip TransitionComponent={Zoom} title="Re-order signal chain">
            <DragIndicatorIcon/>
          </Tooltip>
        </IconButton>
    </div>
  );
}
