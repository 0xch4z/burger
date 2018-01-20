import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";
import { entities } from '../entity';

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
} = process.env

export const dbConfig: ConnectionOptions = {
  type: 'mysql',
  host: DB_HOST || 'localhost',
  port: parseInt(DB_PORT) || 3306,
  database: DB_NAME || 'burger_db',
  username: DB_USER || 'root',
  password: DB_PASS || '',
  entities,
}
