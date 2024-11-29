import { sql } from './db.js'

sql`
  CREATE TABLE users (
      id text PRIMARY KEY,
      name character varying(255),
      password character varying(255),
      profile character varying(255)
  );
`.then(() => {
  console.log('tabela criada');
})