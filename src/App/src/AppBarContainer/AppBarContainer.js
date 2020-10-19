import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import Routing from './src/Routing'
import InfoPopover from './src/InfoPopover'
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../../redux/actions'
import EffectBus from './src/EffectBus'
import PropagateLoader from "react-spinners/PropagateLoader";

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  bottomAppBar: {
    top: 'auto',
    bottom: 0,
    position: 'fixed'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#26ce9e'
  },
  hide: {
    display: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
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
  alphaButton: {
    fontFamily: "'Fascinate', cursive",
    backgroundColor: '#26ce9e',
    color: '#fff',
    marginLeft: '20px'
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

  const openGitHub = () => {
    window.open('https://github.com/matt-eric/this-seems-way-out-there-react-side')
  }

  const handleDrawerState = () => {
    dispatch(allActions.effectBusActions.setEffectBusData( 'expanded', !expanded ))
  }

  if(!fontHasLoaded){
    const fontLoadingProcess = () => {
      setHeader(
        <Typography rel="preload" variant='h5' className={classes.headerFont}>
          This seems WAY out there.
        </Typography>
      )
      setFontHasLoaded(true)
    }
    setTimeout( fontLoadingProcess, 1750)
  }

  return (

    <div>

      <AppBar position="fixed">

        <Toolbar>

          { header }

          <div className={classes.iconButtons}>

            <IconButton className={classes.icon} onClick={() => openGitHub()}>
              <GitHubIcon/>
            </IconButton>

            <InfoPopover/>

          </div>

        </Toolbar>

      </AppBar>

      <main className={clsx(classes.content, { [classes.contentShift]: open, })}>
        <Routing/>
      </main>

      <AppBar position="fixed" className={classes.bottomAppBar}>

        <Toolbar>

          <IconButton onClick={() => handleDrawerState()} className={classes.icon} edge="start">
            <BlurOnIcon fontSize="large"/>
          </IconButton>

        </Toolbar>

      </AppBar>

      <EffectBus/>

    </div>

  );

}

export default AppBarContainer;
