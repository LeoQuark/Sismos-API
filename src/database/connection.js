import pg from "pg";

//Conexion con la base de datos
const pool = new pg.Pool({
  host: "localhost",
  user: "postgres",
  password: "Leonardo4422",
  database: "sismoschile",
  port: "5432",
});

export default pool;
