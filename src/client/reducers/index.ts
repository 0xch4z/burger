import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncReducer } from 'redux-connect';

import { Store } from '../models'

export default combineReducers<Store>({
  routing: routerReducer,
  reduxAsyncConnect: reduxAsyncReducer,
});
