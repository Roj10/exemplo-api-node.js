import 'dotenv/config';
import postgres from 'postgres';

let { PGHOSTLOCAL, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const sql = postgres({
  host: PGHOSTLOCAL,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: false,
});

export { sql };