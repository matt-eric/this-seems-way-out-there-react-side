import React from 'react';
import Visualizer from './src/Visualizer'
import { makeStyles } from '@material-ui/core/styles';
// import { useSelector } from 'react-redux'
import { WhisperSpinner } from "react-spinners-kit";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '100%',
    marginBottom: '100%'
  },
}));

export default function VisualizationContainer() {

  const classes = useStyles();
  const [visualizerHasLoaded, setVisualizerHasLoaded] = React.useState(false)
  const [content, setContent] = React.useState(
    <div className={classes.spinnerContainer} >
      <WhisperSpinner
        size={500}
        frontColor="#040404"
        backColor="#26ce9e"
      />
    </div>
  );

  // const {
  //   effectModules,
  // } = useSelector(state => state.effectBus);

  if(!visualizerHasLoaded){
    const fontLoadingProcess = () => {
      setContent(
        <Visualizer/>
      )
      setVisualizerHasLoaded(true)
    }
    setTimeout( fontLoadingProcess, 1500)
  }

  return (

    <div className={classes.root}>
      { content }
    </div>

  );

}
