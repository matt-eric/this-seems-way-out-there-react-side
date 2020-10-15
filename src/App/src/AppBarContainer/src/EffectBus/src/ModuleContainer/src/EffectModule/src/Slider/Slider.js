import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { useDispatch } from 'react-redux'
import allActions from '../../../../../../../../../../../redux/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const StyledSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
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

export default function CustomizedSlider() {

  const classes = useStyles();

  const dispatch = useDispatch();

  const handleSliderChange = (val) => {
    dispatch(allActions.effectBusActions.setEffectBusData('sparkleFocus', parseFloat(`.${val}`)))
  }

  return (
    <div className={classes.root}>
      <StyledSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={20}
        onChange={(e, val) => handleSliderChange(val)}
      />
    </div>
  );
}
