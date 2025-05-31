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

// // Productos

app.get("/productos", async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM productos");
    res.json(response.rows);
  } catch (error) {
    console.error("Problemas al cargar los productos", error.message);
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

    const response = await db.query(`${query} ORDER BY codigo ASC`, values);
    res.json(response.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error en la búsqueda");
  }
});

// Historial Cliente

app.get("/historialCliente", async (req, res) => {
  try {
    const { codigo } = req.query;
    const responseData = await db.query(
      "SELECT * FROM clientes WHERE codigo = $1",
      [codigo]
    );
    const responseVentas = await db.query(
      "SELECT * FROM ventas WHERE codigo = $1 ORDER BY fecha DESC",
      [codigo]
    );

    if (responseData.rows.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json({ cliente: responseData.rows[0], ventas: responseVentas.rows });
  } catch (error) {
    console.error(error.message);
  }
});

// PATCH

// Editar cliente en buscar cliente
app.patch("/editarCliente", async (req, res) => {
  const { codigo } = req.query;
  const campos = req.body;

  const columnas = Object.keys(campos);
  const valores = Object.values(campos);

  const setQuery = columnas.map((col, i) => `${col} = $${i + 1}`).join(" ,");
  valores.push(codigo);
  const query = `UPDATE clientes SET ${setQuery} WHERE codigo = $${valores.length}`;

  await db.query(query, valores);
  res.json({ mensaje: "Cliente actualizado correctamente" });
});

// Listen

app.listen(port, () => {
  console.log(`El puerto se ha iniciado el el puerto ${port}`);
});
