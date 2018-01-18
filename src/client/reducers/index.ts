import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncReducer } from 'redux-connect';

import { Store } from 'models'

export const rootReducer: Redux.Reducer<Store> = combineReducers<Store>({
  routing: routerReducer,
  reduxAsyncConnect: reduxAsyncReducer,
});

export default rootReducer;
