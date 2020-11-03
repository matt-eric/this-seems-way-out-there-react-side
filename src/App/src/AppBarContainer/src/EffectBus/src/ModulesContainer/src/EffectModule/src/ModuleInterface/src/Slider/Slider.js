import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Slider,
  Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../../../../../../../../../../../../redux/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
  param: {
    fontFamily: "'Fascinate', cursive",
    color: '#26ce9e',
  }
}));

const StyledSlider = withStyles({
  root: {
    color: '#26ce9e',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#26ce9e',
    border: '1px solid #000',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function CustomizedSlider(props) {

  const classes = useStyles();

  const dispatch = useDispatch();

  const {
    effectModules,
  } = useSelector(state => state.effectBus);

  const {
    setting,
    index,
    params,
  } = props

  const {
    displayName,
    value,
    max,
    min,
    step
  } = setting

  const handleSliderChange = (val) => {

    const effectsCopy = effectModules.map(effect => (
      {
        ...effect,
        params: {
          ...effect.params,
          settings: [...effect.params.settings]
        }
      }
    ));
    const currentEffect = effectsCopy[index]['params']['settings']
    const currentIndex = currentEffect.indexOf(effectsCopy[index]['params']['settings'].find(e => e.type === setting.type))
    const currentParameter = {...effectsCopy[index]['params']['settings'][currentIndex]}
    currentParameter['value'] = val
    effectsCopy[index]['params']['settings'][currentIndex] = currentParameter
    dispatch(allActions.effectBusActions.setEffectBusData('effectModules', effectsCopy))

  }

  return (
    <div className={classes.root}>
      <Typography className={classes.param}>
        {displayName}
      </Typography>
      <StyledSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        onChange={(e, val) => handleSliderChange(val)}
        step={step}
        max={max}
        min={min}
        value={value}
      />
    </div>
  );
}
