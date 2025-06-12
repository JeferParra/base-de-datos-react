import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const url = import.meta.env.VITE_API_URL;

function NuevoCliente() {
  const [vehiculos, setVehiculos] = useState([]);
  const [rutas, setRutas] = useState([]);

  // Variables del formulario

  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [barrio, setBarrio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [descripcion, setDesctipcion] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [ruta, setRuta] = useState("");

  useEffect(() => {
    async function listas() {
      try {
        // vehiculos
        const resVehiculos = await fetch(`${url}/vehiculos`);
        const listaVehiculos = await resVehiculos.json();
        setVehiculos(listaVehiculos);

        // rutas
        const resRutas = await fetch(`${url}/rutas`);
        const listaRutas = await resRutas.json();
        setRutas(listaRutas);
      } catch (error) {
        console.error(error.message);
      }
    }

    listas();
  }, []);

  async function enviar(e) {
    // e.preventDefault();
    try {
      const body = {
        codigo,
        nombre,
        direccion,
        barrio,
        telefono,
        descripcion,
        vehiculo,
        ruta,
      };

      const response = await fetch(`${url}/nuevoCliente`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/nuevoCliente";
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <div className="container my-5 pt-5 text-center">
        <h1 className="bg-white w-50 mx-auto py-2 rounded-pill">
          Nuevo Cliente
        </h1>
      </div>
      <div
        className="container mb-5 bg-light p-5 rounded-5"
        data-bs-theme="dark"
      >
        <Form onSubmit={enviar}>
          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="codigo">
              <Form.Label>Codigo</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese el Codigo del cliente"
                name="codigo"
                min={0}
                autoComplete="off"
                onChange={(e) => setCodigo(e.target.value)}
                value={codigo}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="nombre" autoComplete="off">
              <Form.Label>Nombre del Cliente</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del Cliente"
                name="nombre"
                onChange={(e) => setNombre(e.target.value)}
                value={nombre}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="direccion" className="col-8">
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                placeholder="Direccion del cliente"
                name="direccion"
                onChange={(e) => setDireccion(e.target.value)}
                value={direccion}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="barrio">
              <Form.Label>Barrio</Form.Label>
              <Form.Control
                placeholder="Direccion del cliente"
                name="barrio"
                onChange={(e) => setBarrio(e.target.value)}
                value={barrio}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="direccion" className="col-5">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                placeholder="Numero de Telefono"
                name="telefono"
                onChange={(e) => setTelefono(e.target.value)}
                value={telefono}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="barrio">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                placeholder="Breve descripcion de la casa"
                name="descripcion"
                onChange={(e) => setDesctipcion(e.target.value)}
                value={descripcion}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Vehiculo</Form.Label>
              <Form.Select
                name="vehiculo"
                onChange={(e) => setVehiculo(e.target.value)}
                value={vehiculo}
              >
                <option hidden defaultValue="">
                  Seleccione
                </option>
                {vehiculos.map((vehiculo) => (
                  <option key={vehiculo.id}>{vehiculo.vehiculo}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Ruta</Form.Label>
              <Form.Select
                name="ruta"
                onChange={(e) => setRuta(e.target.value)}
                value={ruta}
              >
                <option hidden defaultValue="">
                  Seleccione
                </option>
                {rutas.map((ruta) => (
                  <option key={ruta.id}>{ruta.ruta}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <Button
            variant="success"
            type="submit"
            className="d-block mx-auto w-25 mt-5"
          >
            Crear Cliente
          </Button>
        </Form>
      </div>
    </>
  );
}

export default NuevoCliente;
