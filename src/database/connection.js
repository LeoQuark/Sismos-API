import pg from "pg";

//Conexion con la base de datos
const pool = new pg.Pool({
  host: "db",
  user: "postgres",
  password: "postgres",
  database: "sismoschile",
  port: "5432",
});

export default pool;
