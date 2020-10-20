import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Authenticator from './src/Authenticator'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AuthenticationDialog(props) {

  return (
    <Dialog
      open={props.state}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => props.close()}
    >
      <Authenticator/>
    </Dialog>
  );
}
