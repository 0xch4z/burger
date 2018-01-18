import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';

import { configureStore } from '../../client/store';
import { Html } from '../../client/containers';
import routes from '../../client/routes';

const manifest = require('../../../build/manifest.json');

const renderHtml = (markup: string, store: any) => {
  const html = renderToString(
    <Html markup={markup} manifest={manifest} store={store} />
  );

  return `<!doctype html> ${html}`;
};

export const renderClient = (req, res) => {
  const location = req.url;
  const memoryHistory = createMemoryHistory(req.originalUrl);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send({ error: true, message: 'Something broke ):' })
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const asyncRenderData = { ...renderProps, store }

      loadOnServer(asyncRenderData).then(() => {
        const markup = renderToString(
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        )
        res.status(200).send(renderHtml(markup, store))
      })
    }
  })
};
