/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { createBrowserHistory } from 'history';

import effectBusReducer from './effectBusReducer.js'

const history = createBrowserHistory();

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {
  effectBus: effectBusReducer
}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
