import { Pool } from 'pg';

export const connection = new Pool({
  user: 'admin',
  host: 'localhost',
  password: 'admin',
  database: 'pokecards',
  port: 5432,
});
