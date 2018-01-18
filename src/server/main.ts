import * as express from 'express';
import * as compression from 'compression'
import { join as pjoin } from 'path'
import { log, error } from 'console';

import * as middleware from './middleware';
import { renderClient } from './utils';

const PORT = process.env.PORT || 3000;
const DEV = process.env.NODE_ENV !== 'production';

const app = express();

if (DEV) {
  app.use(middleware.webpackDev);
  app.use(middleware.webpackHot);
}

app.use(compression());
app.use('/public', express.static(pjoin(__dirname, 'public')));

app.get('*', renderClient);

app.listen(PORT, err => {
  if (err) error(err.message)
  else log(`started on port ${PORT}`)
});
