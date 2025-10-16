import pg from "pg";
import env from "dotenv";
env.config();

// const db = new Pool({
//   host: "localhost",
//   user: "postgres",
//   password: "jeferparra",
//   port: 5432,
//   database: "pruebaClientes",
// });

const { Client } = pg;

export const getDBConnection = (baseDeDatos) => {
  let database;

  switch (baseDeDatos) {
    case "demo":
      database = process.env.DB_DEMO;
      break;
    case "colAgua":
      database = process.env.DB_COLAGUA;
      break;
    case "usuarios":
      database = process.env.DB_USUARIOS;
      break;
    default:
      throw new Error("Empresa no valida o no configurada.");
  }

  const db = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  });

  return db;
};

// Reconexion automatica a la base de datos despues de un tiempo de inactividad
// db.on("error", (err) => {
//   console.error("❌ Error inesperado en una conexión del pool:", err.message);
//   process.exit(1); // nodemon reinicia la app
// });

// export default db;
