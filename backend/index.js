import env from "dotenv";
env.config();

import express from "express";
import cors from "cors";
import { getDBConnection } from "./db.js";
import bcrypt from "bcrypt";

const port = process.env.PORT || 4000;
const app = express();

// Middleware

app.use(cors());
app.use(express.json()); // req.body

// db.connect()
//   .then(() => console.log("Conexión exitosa a Neon"))
//   .catch((err) => console.error("Error de conexión", err));

// setInterval(() => {
//   db.query("SELECT 1").catch((err) => {
//     console.warn("Ping a la base de datos falló:", err.message);
//   });
// }, 60000);

// Listas

// // Clientes

app.get("/clientes", async (req, res) => {
  const baseDeDatos = req.headers["x-basededatos"];
  const { codigo } = req.query;
  try {
    const db = getDBConnection(baseDeDatos);
    await db.connect();

    let query = "SELECT * FROM clientes";
    const values = [];

    if (codigo) {
      query += " WHERE codigo = $1";
      values.push(codigo);
    }

    const response = await db.query(query, values);
    res.json(response.rows);
    await db.end();
  } catch (error) {
    console.error(error.message);
  }
});

// // Vehiculos

app.get("/vehiculos", async (req, res) => {
  const baseDeDatos = req.headers["x-basededatos"];
  try {
    const db = getDBConnection(baseDeDatos);
    await db.connect();

    const response = await db.query("SELECT * FROM vehiculos");
    res.json(response.rows);
    await db.end();
  } catch (error) {
    console.error(error.message);
  }
});

// // Rutas

app.get("/rutas", async (req, res) => {
  const baseDeDatos = req.headers["x-basededatos"];
  try {
    const db = getDBConnection(baseDeDatos);
    await db.connect();

    const response = await db.query("SELECT * FROM rutas");
    res.json(response.rows);
    await db.end();
  } catch (error) {
    console.error(error.message);
  }
});

// // Productos

app.get("/productos", async (req, res) => {
  const baseDeDatos = req.headers["x-basededatos"];
  try {
    const db = getDBConnection(baseDeDatos);
    await db.connect();

    const response = await db.query("SELECT * FROM productos");
    res.json(response.rows);
    await db.end();
  } catch (error) {
    console.error("Problemas al cargar los productos", error.message);
  }
});

// ROUTES

// POST

// Nuevo Cliente

app.post("/nuevoCliente", async (req, res) => {
  const baseDeDatos = req.headers["x-basededatos"];

  try {
    const db = getDBConnection(baseDeDatos);
    await db.connect();
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

    const response = await db.query(
      `INSERT INTO clientes 
    (codigo, nombre, direccion, barrio, telefono, descripcion, vehiculo, ruta, estado)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8,'Activo')`,
      [codigo, nombre, direccion, barrio, telefono, descripcion, vehiculo, ruta]
    );

    res.json({ mensaje: "Cliente registrado exitosamente." });

    await db.end();
  } catch (error) {
    console.error("Error en /nuevoCliente:", error);
    res.status(500).json({ error: error.message });
  }
});

// Cargar venta (planilla)
app.post("/cargarVenta", async (req, res) => {
  const baseDeDatos = req.headers["x-basededatos"];
  try {
    const db = getDBConnection(baseDeDatos);
    await db.connect();
    const {
      fecha,
      vehiculo,
      ruta,
      producto,
      valor,
      codigo,
      cantidad,
      botellones,
      formaDePago,
      contado,
      credito,
      abono,
      saldo,
    } = req.body;
    const responseData = await db.query(
      "SELECT * FROM clientes WHERE codigo = $1",
      [codigo]
    );
    const cliente = responseData.rows[0];
    console.log(cliente);
    res.json({ cliente: responseData.rows[0] });

    //actualizar saldo del cliente
    await db.query("UPDATE clientes SET saldo = $1 WHERE codigo = $2", [
      saldo,
      codigo,
    ]);

    //actualizar cantidad total de botellones que tiene el cliente
    const totalBotellonesCliente =
      Number(cliente.botellones) + Number(botellones);
    await db.query("UPDATE clientes SET botellones = $1 WHERE codigo = $2", [
      totalBotellonesCliente,
      codigo,
    ]);

    const responseVenta = await db.query(
      `
      INSERT INTO ventas
        (codigo, producto, valor, cantidad, contado, credito, abono, saldo, botellones, forma_de_pago, fecha, vehiculo, ruta, prestado_recuperado)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      `,
      [
        codigo,
        producto,
        valor,
        cantidad,
        contado,
        credito,
        abono,
        saldo,
        totalBotellonesCliente,
        formaDePago,
        fecha,
        vehiculo,
        ruta,
        botellones,
      ]
    );
    await db.end();
  } catch (error) {
    console.error("Error al tratar de cargar la venta", error.message);
  }
});

// GET

// Buscar cliente

app.get("/buscarCliente", async (req, res) => {
  const baseDeDatos = req.headers["x-basededatos"];
  try {
    const db = getDBConnection(baseDeDatos);
    await db.connect();
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
    await db.end();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error en la búsqueda");
  }
});

// Historial Cliente

app.get("/historialCliente", async (req, res) => {
  const baseDeDatos = req.headers["x-basededatos"];
  try {
    const db = getDBConnection(baseDeDatos);
    await db.connect();
    const { codigo } = req.query;
    const responseData = await db.query(
      "SELECT * FROM clientes WHERE codigo = $1",
      [codigo]
    );
    const responseVentas = await db.query(
      "SELECT * FROM ventas WHERE codigo = $1 ORDER BY fecha DESC, fecha_creacion DESC",
      [codigo]
    );

    if (responseData.rows.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json({ cliente: responseData.rows[0], ventas: responseVentas.rows });

    await db.end();
  } catch (error) {
    console.error(error.message);
  }
});

// Planilla de ventas

app.get("/cargarPlanillaVentas", async (req, res) => {
  try {
    const { fecha, vehiculo, ruta } = req.query;

    const response = await db.query(
      "SELECT * FROM ventas WHERE fecha = $1 AND vehiculo = $2 AND ruta = $3 ORDER BY fecha_modificacion ASC",
      [fecha, vehiculo, ruta]
    );

    console.log("Query params recibidos:", { fecha, vehiculo, ruta });

    res.json(response.rows);
    console.log(response.rows);
  } catch (error) {
    console.error("Error al cargar la planilla de ventas: ", error.message);
  }
});

// Login

app.post("/login", async (req, res) => {
  try {
    const db = getDBConnection("usuarios");
    await db.connect();
    const { usuario, empresa, password } = req.body;

    const userResult = await db.query(
      "SELECT * FROM usuarios WHERE usuario = $1",
      [usuario]
    );

    if (userResult.rows.length === 0) {
      await db.end();
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = userResult.rows[0];

    const passwordMatch = await bcrypt.compare(password, user.contrasena);
    if (!passwordMatch) {
      await db.end();
      return res.status(401).json({ error: "Contrasena incorrecta" });
    }

    if (empresa !== user.empresa) {
      await db.end();
      return res.status(401).json({ error: "La empresa no coincide" });
    }

    // Pendiente configurar Cookie de inicio de sesion

    res.json({
      mensaje: "Datos recibidos correctamente",
      usuario: user.usuario_nombre,
      empresa: user.empresa_nombre,
      base_de_datos: user.base_de_datos,
    });
    await db.end();
  } catch (error) {
    console.error("Error al acceder al los usuarios: ", error.message);
  }
});

app.get("/ping", (req, res) => {
  res.status(200).send("Server On");
});

// PATCH

// Editar cliente en buscar cliente
app.patch("/editarCliente", async (req, res) => {
  const baseDeDatos = req.headers["x-basededatos"];
  try {
    const db = getDBConnection(baseDeDatos);
    await db.connect();

    const { codigo } = req.query;
    const campos = req.body;

    const columnas = Object.keys(campos);
    const valores = Object.values(campos);

    const setQuery = columnas.map((col, i) => `${col} = $${i + 1}`).join(" ,");
    valores.push(codigo);
    const query = `UPDATE clientes SET ${setQuery} WHERE codigo = $${valores.length}`;

    await db.query(query, valores);
    res.json({ mensaje: "Cliente actualizado correctamente" });
    await db.end();
  } catch (error) {
    console.error("Error al editar el cliente: ", error.message);
  }
});

// Listen

app.listen(port, () => {
  console.log(`El puerto se ha iniciado el el puerto ${port}`);
});
