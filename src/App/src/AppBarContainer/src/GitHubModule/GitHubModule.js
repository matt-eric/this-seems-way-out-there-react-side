import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Paper,
  Tooltip,
  Zoom
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#0A0A0A',
    marginRight: '10px',
    border: '1px solid #26ce9e',
    paddingRight: '10px'
  },
  icon: {
    color: '#26ce9e',
  },
}));

function GitHubModule(props) {

  const classes = useStyles();

  const openGitHub = (repo) => {
    window.open(`https://github.com/matt-eric/${repo}`)
  }

  return (

    <Tooltip TransitionComponent={Zoom} title={`${props.tooltip}-side Source Code`}>
      <Paper className={classes.paper} onClick={() => openGitHub(props.endpoint)} target="_blank">
        <IconButton className={classes.icon} >
          <GitHubIcon/>
        </IconButton>
        <img
          draggable="false"
          src={props.svg}
          width={"100%"}
          alt={props.alt}
        />
      </Paper>
    </Tooltip>

  );

}

export default GitHubModule;
