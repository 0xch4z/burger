import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';

import { rootReducer } from '../reducers';
import { Store } from '../models';

const PROD = process.env.NODE_ENV !== 'production';
const DEV = process.env.NODE_ENV === 'development';

export function configureStore(history, initialState?: Store): Redux.Store<Store> {

  const middlewares: Redux.Middleware[] = [
    routerMiddleware(history),
    thunk,
  ];

  /** Add Only Dev. Middlewares */
  if (!PROD && process.env.BROWSER) {
    const logger = createLogger();
    middlewares.push(logger);
  }

  const composeEnhancers = (!PROD &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares),
  ));

  if (DEV && (module as any).hot) {
    (module as any).hot.accept('../reducers', () => {
      store.replaceReducer((require('../reducers')));
    });
  }

  return store;
}
