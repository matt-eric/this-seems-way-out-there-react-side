import React from 'react';
import StopIcon from '@material-ui/icons/Stop';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../../../../../../../../../../../../redux/actions'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    border: '1px solid #69f0ae',
    borderRadius: '5px',
    padding: '3px',
    marginTop: '10px',
    marginLeft: '80px',
    display: 'flex',
    justifyContent: 'space-around'
  },
  selected: {
  },
  nonSelected: {
    border: '1px solid #69f0ae',
    backgroundColor: 'rgba(105, 240, 174, .5)',
  },
  icon: {
    color: '#69f0ae',
  }
}));

export default function WaveformControls(props) {

  const classes = useStyles();

  const dispatch = useDispatch();

  const { index } = props;

  const {
    effectModules,
  } = useSelector(state => state.effectBus);

  const currentShape = effectModules[index]['params']['pointShape']

  const handleChange = () => {
    const effectsCopy = [...effectModules]
    const shapes = []
    const shapeOptions = ['circle', 'square']
    shapes[0] = currentShape
    shapes[1] = shapeOptions.find(option => option !== currentShape)
    effectsCopy[index]['params']['pointShape'] = shapes.reverse()[0]
    dispatch(allActions.effectBusActions.setEffectBusData('effectModules', effectsCopy))
  };

  return (

    <div
      className={classes.container}
      value={currentShape}
      aria-label="text formatting"
    >

      <ToggleButton
        disabled={currentShape === 'circle'}
        className={currentShape === 'square' ? classes.selected : classes.nonSelected}
        value="circle"
        onClick={ () => handleChange() }
      >
        <FiberManualRecordIcon className={classes.icon}/>
      </ToggleButton>

      <ToggleButton
        disabled={currentShape === 'square'}
        className={currentShape === 'circle' ? classes.selected : classes.nonSelected}
        value="square"
        onClick={ () => handleChange() }
      >
        <StopIcon className={classes.icon}/>
      </ToggleButton>

      {
        /*
        <ToggleButton className={classes.button} value="color" aria-label="color" disabled>
          <FormatColorFillIcon className={classes.icon}/>
          <ArrowDropDownIcon className={classes.icon}/>
        </ToggleButton>
        */
      }

    </div>

  );
}
