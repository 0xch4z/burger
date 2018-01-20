import './config/env';
import 'reflect-metadata';

import * as express from 'express';
import * as compression from 'compression'
import { json as jsonParser } from 'body-parser'
import { createConnection } from 'typeorm';
import { join as pjoin } from 'path'
import { log, error } from 'console';

import * as routers from './routers'
import * as middleware from './middleware';
//import { entities } from './entity';
import { dbConfig } from './config';
import { renderClient } from './utils';
//import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const PORT = process.env.PORT || 3000;
const DEV = process.env.NODE_ENV !== 'production';

createConnection(dbConfig).then(async pool => {

  await pool.runMigrations()

  const app = express();

  if (DEV) {
    console.log('mounting webpack config')
    app.use(middleware.webpackDev);
    app.use(middleware.webpackHot);
  }

  app.disable('x-powered-by')
  app.use(compression());
  app.use(jsonParser());
  app.use('/public', express.static(pjoin(__dirname, 'public')));

  app.use('/api/burgers', routers.burgerRouter);
  app.get('*', renderClient);

  app.listen(PORT, err => {
    if (err) error(err.message);
    else log(`started on port ${PORT}`);
  });

}).catch(e => error(`DB connection pool error: ${e.message}`));
