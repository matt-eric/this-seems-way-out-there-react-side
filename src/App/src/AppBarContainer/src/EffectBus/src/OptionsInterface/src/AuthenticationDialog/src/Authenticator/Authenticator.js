import React from 'react';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom'
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react'
import Login from './src/Login'

const loading = () => <div/>

export default withRouter(class AuthRouter extends React.Component {
  constructor(props) {
    super(props);
    this.onAuthRequired = this.onAuthRequired.bind(this);
  }

  onAuthRequired() {
    this.props.history.push('/login')
  }

  render() {

    return (

        <Security
          issuer={process.env.REACT_APP_OKTA_ISSUER}
          clientId={process.env.REACT_APP_OKTA_CLIENT_ID}
          redirectUri={window.location.origin + '/implicit/callback'}
          onAuthRequired={this.onAuthRequired}
          pkce={true}
        >

          <React.Suspense fallback={loading()} >

            <Switch>

              <Route path='/implicit/callback' component={LoginCallback}/>

              <Route
                exact
                path='/'
                name='Login'
                render={() => <Login baseUrl={process.env.REACT_APP_OKTA_BASE_URL}/>}
              />

              <SecureRoute exact path='/' name='Navigator' />

            </Switch>

          </React.Suspense>

        </Security>

    );

  }

});
