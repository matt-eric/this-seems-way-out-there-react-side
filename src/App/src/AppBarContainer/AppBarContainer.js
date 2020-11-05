import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import VisualizationContainer from './src/VisualizationContainer'
import InfoPopover from './src/InfoPopover'
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../../redux/actions'
import EffectBus from './src/EffectBus'
import GitHubModule from './src/GitHubModule'
import PropagateLoader from "react-spinners/PropagateLoader";
import react from './src/GitHubModule/src/svg/react.svg'
import node from './src/GitHubModule/src/svg/node.svg'

const useStyles = makeStyles((theme) => ({
  bottomAppBar: {
    top: 'auto',
    bottom: 0,
    position: 'fixed'
  },
  content: {
    backgroundColor: '#000',
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    backgroundColor: '#000',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  headerFont: {
    fontFamily: "'Fascinate', cursive",
    color: '#26ce9e'
  },
  iconButtons: {
    position: 'absolute',
    right: 20,
    display: 'flex',
  },
  icon: {
    color: '#26ce9e',
  },
  loader: {
    marginLeft: '145px',
    marginBottom: '16px'
  }
}));

function AppBarContainer() {

  const dispatch = useDispatch();
  const classes = useStyles();
  const [open] = React.useState(false);
  const [fontHasLoaded, setFontHasLoaded] = React.useState(false)
  const [header, setHeader] = React.useState(
    <div className={classes.loader} >
      <PropagateLoader
        size={15}
        color={"#26ce9e"}
        loading={true}
      />
    </div>
  );

  const {
    expanded
  } = useSelector(state => state.effectBus);

  const handleDrawerState = () => {
    dispatch(allActions.effectBusActions.setEffectBusData( 'expanded', !expanded ))
  }

  const iconProps = [
    {
      endpoint: "this-seems-WAY-out-there-node-side",
      svg: node,
      alt: "node",
    },
    {
      endpoint: "this-seems-WAY-out-there-react-side",
      svg: react,
      alt: "react",
    },
  ]

  if(!fontHasLoaded){
    const fontLoadingProcess = () => {
      setHeader(
        <Typography rel="preload" variant='h5' className={classes.headerFont}>
          This seems WAY out there.
        </Typography>
      )
      setFontHasLoaded(true)
    }
    setTimeout( fontLoadingProcess, 1500)
  }

  return (

    <div>

      <AppBar position="fixed">

        <Toolbar>

          { header }

          <div className={classes.iconButtons}>

            {
              iconProps.map((iconInfo, i) => {
                const { endpoint, svg, alt } = iconInfo
                return (<GitHubModule
                  svg={svg}
                  alt={alt}
                  endpoint={endpoint}
                />)
              })
            }

            <InfoPopover/>

          </div>

        </Toolbar>

      </AppBar>

      <main className={clsx(classes.content, { [classes.contentShift]: open, })}>
        <VisualizationContainer/>
      </main>

      <AppBar position="fixed" className={classes.bottomAppBar}>

        <Toolbar>

          <Tooltip TransitionComponent={Zoom} title={`Effect Bus`}>
            <IconButton onClick={() => handleDrawerState()} className={classes.icon} edge="start">
              <BlurOnIcon fontSize="large"/>
            </IconButton>
          </Tooltip>

        </Toolbar>

      </AppBar>

      <EffectBus/>

    </div>

  );

}

export default AppBarContainer;
