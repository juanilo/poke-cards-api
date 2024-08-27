import dotenv from 'dotenv';
import { Pool } from 'pg';

if (process.env.NODE_ENV !== 'PROD') {
  console.log('environment=DEV');
  dotenv.config();
}

const USER = process.env.POSTGRE_USER || '';
const PASSWORD = process.env.POSTGRE_PASSWORD || '';;
const URL = process.env.POSTGRE_URL || '';

if (!USER || !PASSWORD) {
  console.log('DB Credentials / HOST values not defined');
}

export const connection = new Pool({
  user: USER,
  host: URL,
  password: PASSWORD,
  database: 'pokecards',
  port: 5432,
});
