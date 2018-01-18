import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';

import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { ServerStyleSheet } from 'styled-components'

import { configureStore } from '../../client/store';
import { Html } from '../../client/containers';
import routes from '../../client/routes';

const manifest = require('../../../build/manifest.json');

const makeMuiTheme = userAgent => getMuiTheme({ userAgent })

const renderHtml = (markup: string, styles: string, store: any) => {
  const html = renderToString(
    <Html markup={markup} serverStyles={styles} manifest={manifest} store={store} />
  );

  return `<!doctype html> ${html}`;
};

export const renderClient = (req, res) => {
  const location = req.url;
  const memoryHistory = createMemoryHistory(req.originalUrl);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  const userAgent = req.headers['user-agent'];
  const sheet = new ServerStyleSheet();

  match({ history, routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send({ error: true, message: 'Something broke ):' })
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const asyncRenderData = Object.assign({}, renderProps, { store });

      loadOnServer(asyncRenderData).then(() => {
        const markup = renderToString(
          sheet.collectStyles(
            <MuiThemeProvider muiTheme={makeMuiTheme(userAgent)}>
              <Provider store={store} key="provider">
                <ReduxAsyncConnect {...renderProps} />
              </Provider>
            </MuiThemeProvider>
          )
        )
        const styles = sheet.getStyleTags()
        res.status(200).send(renderHtml(markup, styles, store))
      })
    }
  })
};
