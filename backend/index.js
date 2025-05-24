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

// POST

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

// GET

// Crear cliente

app.get("/buscarCliente", async (req, res) => {
  try {
    const { codigo, nombre, barrio, vehiculo, ruta, estado } = req.query;

    let query = "SELECT * FROM clientes WHERE 1=1";
    const values = [];

    if (codigo) {
      values.push(Number(codigo));
      query += ` AND codigo = $${values.length}`;
    }

    if (nombre) {
      values.push(nombre);
      query += ` AND nombre ILIKE '%' || $${values.length} || '%'`;
    }

    if (barrio) {
      values.push(barrio);
      query += ` AND barrio ILIKE '%' || $${values.length} || '%'`;
    }

    if (vehiculo && vehiculo !== "Todos") {
      values.push(vehiculo);
      query += ` AND vehiculo = $${values.length}`;
    }

    if (ruta && ruta !== "Todos") {
      values.push(ruta);
      query += ` AND ruta = $${values.length}`;
    }

    if (estado && estado !== "Todos") {
      values.push(estado);
      query += ` AND estado = $${values.length}`;
    }

    const response = await db.query(query, values);
    res.json(response.rows);
    console.log("Params:", req.query);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error en la búsqueda");
  }
});

// Listen

app.listen(port, () => {
  console.log(`El puerto se ha iniciado el el puerto ${port}`);
});
