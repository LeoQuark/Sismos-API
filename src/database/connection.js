import pg from "pg";

//Conexion con la base de datos
const pool = new pg.Pool({
  host: "localhost",
  user: "postgres",
  password: "251100",
  database: "sismoschile",
  port: "5432",
});

export default pool;
