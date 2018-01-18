import * as React from 'react';
import { IndexRoute, Route } from 'react-router';

import { App, Home, Other } from '../containers';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="other" component={Other} />
  </Route>
)