import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { loadCSS } from 'fg-loadcss';
import clsx from 'clsx';
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Tooltip,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import GitHubIcon from '@material-ui/icons/GitHub';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import Routing from './src/Routing'
import InfoPopover from './src/InfoPopover'
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../../redux/actions'
import EffectBus from './src/EffectBus'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
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
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  headerFont: {
    fontFamily: "'MuseoModerno', cursive",
    color: '#26ce9e'
  },
  alphaButton: {
    fontFamily: "'MuseoModerno', cursive",
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
  }
}));

function AppBarContainer() {

  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const {
    expanded
  } = useSelector(state => state.effectBus);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const openGitHub = () => {
    window.open('https://github.com/matt-eric/waveforms')
  }

  const handleDrawerState = () => {
    dispatch(allActions.effectBusActions.setEffectBusData( 'expanded', !expanded ))
  }

  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return (

    <div>

      <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open, })}>

        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon/>
          </IconButton>

          <Typography variant='h6' className={classes.headerFont}>
            WAVEFORMS.APP
          </Typography>

          <Button variant="outlined" disabled className={classes.alphaButton}>
            ALPHA
          </Button>

          <div className={classes.iconButtons}>

            <IconButton className={classes.icon} onClick={() => openGitHub()}>
              <GitHubIcon/>
            </IconButton>

            <InfoPopover/>

          </div>

        </Toolbar>

      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{ paper: classes.drawerPaper }}
      >

        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>

      </Drawer>

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
