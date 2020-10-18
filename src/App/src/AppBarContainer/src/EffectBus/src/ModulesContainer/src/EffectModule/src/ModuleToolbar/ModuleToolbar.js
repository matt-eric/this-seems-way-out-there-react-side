import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../../../../../../../../../../redux/actions'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import {
  IconButton,
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
  dragIndicator: {
    position: 'relative',
    marginLeft: '70%',
    color: '#69f0ae'
  },
  toolbarIcons: {
    color: '#69f0ae'
  }
}));

export default function ModuleToolbar(props){

  const dispatch = useDispatch();

  const classes = useStyles();

  const {
    effectModules,
  } = useSelector(state => state.effectBus);

  const {
    dragHandleProps,
    index
  } = props

  const toolBarIcons = [
    {
      icon: <PowerSettingsNewIcon className={classes.toolbarIcons} />,
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

  const toggleBypass = () => {
    const effectsCopy = [...effectModules]
    effectsCopy[index]['params']['bypass'] = !effectModules[index]['params']['bypass']
    dispatch(allActions.effectBusActions.setEffectBusData('effectModules', effectsCopy))
  }

  return (
    <div className={classes.toolBar}>
      {toolBarIcons.map((obj, i) =>
        <IconButton
          key={`toolbar-button-${i}`}
          color="secondary"
          onClick={() => toggleBypass()}
        >
          <Tooltip TransitionComponent={Zoom} title={obj.tooltip}>
            {obj.icon}
          </Tooltip>
        </IconButton>
      )}
        <IconButton color="secondary"
          className={classes.dragIndicator}
          {...dragHandleProps}
        >
          <Tooltip TransitionComponent={Zoom} title="Re-order signal chain">
            <DragIndicatorIcon/>
          </Tooltip>
        </IconButton>
    </div>
  );
}
