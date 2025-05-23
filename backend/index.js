import express from "express";
import cors from "cors";
import db from "./db.js";

const port = 4000;
const app = express();

// Middleware

app.use(cors());
app.use(express.json()); // req.body

// Listas

// // Vehiculos

app.get("/vehiculos", async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM vehiculos");
    res.json(response.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// // Rutas

app.get("/rutas", async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM rutas");
    res.json(response.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// ROUTES

// Post

// Nuevo Cliente

app.post("/nuevoCliente", async (req, res) => {
  try {
    console.log(req.body);
    const {
      codigo,
      nombre,
      direccion,
      barrio,
      telefono,
      descripcion,
      vehiculo,
      ruta,
    } = req.body;

    console.log("Nuevo cliente registrado");

    const response = await db.query(
      `INSERT INTO clientes 
    (codigo, nombre, direccion, barrio, telefono, descripcion, vehiculo, ruta, estado)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8,'Activo')`,
      [codigo, nombre, direccion, barrio, telefono, descripcion, vehiculo, ruta]
    );
  } catch (error) {
    console.error(error.message);
  }
});

// Listen

app.listen(port, () => {
  console.log(`El puerto se ha iniciado el el puerto ${port}`);
});
