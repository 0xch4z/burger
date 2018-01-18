import 'isomorphic-fetch';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';

import routes from './routes';
import { configureStore } from './store'

const cmp = props => <ReduxAsyncConnect {...props} />

const store = configureStore(browserHistory, window.__INITIAL_STATE__)

const root = document.getElementById('app');

ReactDOM.hydrate(
  <Provider store={store} key="provider">
    <Router
      render={cmp}
    >
      {routes}
    </Router>
  </Provider>,
  root
);
