import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import {
  IconButton,
  Popover,
  Typography,
  Tooltip
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    fontFamily: "'MuseoModerno', cursive",
  },
  icon: {
    color: '#26ce9e',
  }
}));

export default function InfoPopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Tooltip title="What is This?">
        <IconButton className={classes.icon} onClick={handleClick}>
          <HelpIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
          This is a development environment and an alpha release of an evolving project. Some features may not work as expected. Enjoy.
        </Typography>
      </Popover>
    </div>
  );
}
