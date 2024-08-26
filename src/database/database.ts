import dotenv from 'dotenv';
import { Pool } from 'pg';

if (process.env.NODE_ENV !== 'PROD') {
  console.log('NODE_ENV', 'DEV');
  dotenv.config();
}

const config = {
  user: process.env.POSTGRE_USER,
  host: process.env.POSTGRE_URL,
  password: process.env.POSTGRE_PASSWORD,
  database: 'pokecards',
  port: 5432,
}
console.log(config);
export const connection = new Pool(config);
