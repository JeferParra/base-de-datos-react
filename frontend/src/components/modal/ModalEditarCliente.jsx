import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

const url = import.meta.env.VITE_API_URL;

function ModalEditarCliente({
  show,
  onClose,
  clienteData,
  onClienteActualizado,
}) {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [barrio, setBarrio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [ruta, setRuta] = useState("");
  const [estado, setEstado] = useState("");

  const [vehiculos, setVehiculos] = useState([]);
  const [rutas, setRutas] = useState([]);

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

  useEffect(() => {
    if (clienteData) {
      setCodigo(clienteData.codigo || "");
      setNombre(clienteData.nombre || "");
      setDireccion(clienteData.direccion || "");
      setBarrio(clienteData.barrio || "");
      setTelefono(clienteData.telefono || "");
      setDescripcion(clienteData.descripcion || "");
      setVehiculo(clienteData.vehiculo || "");
      setRuta(clienteData.ruta || "");
      setEstado(clienteData.estado || "Activo");
    }
  }, [clienteData]);

  // Editar Cliente
  async function editarCliente(codigo, datosEditados) {
    const params = new URLSearchParams();
    params.append("codigo", codigo);

    try {
      const response = await fetch(
        `${url}/editarCliente?${params.toString()}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosEditados),
        }
      );
      if (response.ok) {
        onClienteActualizado(); // actualiza la tabla principal
        onClose(); // cierra el modal
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              const datosEditados = {
                nombre,
                direccion,
                barrio,
                telefono,
                descripcion,
                vehiculo,
                ruta,
                estado,
              };
              editarCliente(codigo, datosEditados);
            }}
          >
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
                  disabled
                />
              </Form.Group>
            </Row>
            <Row className="mb-3 fw-bold">
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
              <Form.Group as={Col} controlId="direccion">
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                  placeholder="Direccion del cliente"
                  name="direccion"
                  onChange={(e) => setDireccion(e.target.value)}
                  value={direccion}
                  required
                />
              </Form.Group>
            </Row>
            <Row className="mb-3 fw-bold">
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
              <Form.Group as={Col} controlId="direccion">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  placeholder="Numero de Telefono"
                  name="telefono"
                  onChange={(e) => setTelefono(e.target.value)}
                  value={telefono}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3 fw-bold">
              <Form.Group as={Col} controlId="barrio">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control
                  placeholder="Breve descripcion de la casa"
                  name="descripcion"
                  onChange={(e) => setDescripcion(e.target.value)}
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

            <Row className="mb-3 fw-bold">
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  name="estado"
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option>Activo</option>
                  <option>Inactivo</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Button
              variant="success"
              type="submit"
              className="d-block mx-auto w-25 mt-5"
            >
              Editar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalEditarCliente;
