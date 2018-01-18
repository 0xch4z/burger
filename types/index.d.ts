/**
 * Module type declerations
 */

// extends for Redux DevTools Chrome extension
interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: <F extends Function>(f: F) => F;
  __INITIAL_STATE__?: any;
}
