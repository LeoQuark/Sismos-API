import pg from "pg";

//Conexion con la base de datos
const pool = new pg.Pool({
  host: "api.jkd.cl",
  user: "grupo_m",
  password: "HrhGZmr2",
  database: "grupo_m_db",
  port: "6432",
});

export default pool;
