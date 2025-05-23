import { Pool } from "pg";

const db = new Pool({
  host: "localhost",
  user: "postgres",
  password: "jeferparra",
  port: 5432,
  database: "pruebaClientes",
});

export default db;
