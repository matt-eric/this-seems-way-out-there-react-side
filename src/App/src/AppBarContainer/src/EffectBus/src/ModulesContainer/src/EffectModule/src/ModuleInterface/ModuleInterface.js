import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { useDispatch } from 'react-redux'
// import allActions from '../../../../../../../../../redux/actions'
import Slider from './src/Slider'
import WaveformControls from './src/WaveformControls'

const useStyles = makeStyles(theme => ({
  interface: {
    display: 'flex',
    flexDirecton: 'column',
    flexWrap: 'wrap',
    marginTop: '5px',
    margin: '20px'
  },
}));

export default function ModuleInterface(props){

  // const dispatch = useDispatch();

  const classes = useStyles();

  const {
    params,
    index
  } = props

  const {
    settings,
    type
  } = params

  const moduleSpecificElements = (type, index) => {
    const jsxAssociations = {
      waveform: <WaveformControls index={index} />
    }
    return jsxAssociations[type]
  }

  return (
    <div className={classes.interface}>
      {
        settings &&
          Object.keys(settings).map((setting, i) =>
            <Slider
              key={`parameter-slider-${i}`}
              setting={setting}
              params={params}
              index={index}
            />
          )
      }
      {moduleSpecificElements(type, index)}
    </div>
  );
}
