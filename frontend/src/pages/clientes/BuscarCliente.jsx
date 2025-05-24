import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useState } from "react";

const url = "http://localhost:4000";

function BuscarCliente() {
  const datosTabla = {
    vehiculo: { disabled: true },
    ruta: { disabled: true },
    codigo: { disabled: true },
  };

  const [data, setData] = useState(datosTabla);
  const [seleccionVehiculo, setSeleccionVehiculo] = useState("Todos");
  const [seleccionRuta, setSeleccionRuta] = useState("Todos");
  const [inputBuscar, setInputBuscar] = useState("");
  const [estado, setEstado] = useState("Todos");
  const [seleccionBuscarPor, setSeleccionBuscarPor] = useState("Todos");
  const [resultado, setResultado] = useState([]);

  const [hidden, setHidden] = useState(true);

  function activarEspacios(e) {
    const opcion = e.target.value;

    if (opcion === "Vehiculo/Ruta") {
      setData({
        vehiculo: { disabled: false },
        ruta: { disabled: false },
        codigo: { disabled: true },
      });
      setInputBuscar("");
    } else if (opcion === "Todos") {
      setData({
        vehiculo: { disabled: true, selected: true },
        ruta: { disabled: true, selected: true },
        codigo: { disabled: true },
      });
      setSeleccionVehiculo("Todos");
      setSeleccionRuta("Todos");
      setInputBuscar("");
    } else {
      setData({
        vehiculo: { disabled: true, selected: true },
        ruta: { disabled: true },
        codigo: { disabled: false, selected: true },
      });
      setSeleccionVehiculo("Todos");
      setSeleccionRuta("Todos");
    }
  }

  async function enviar(e) {
    e.preventDefault();
    setResultado([]);
    try {
      const params = new URLSearchParams();

      if (estado !== "Todos") params.append("estado", estado);
      if (seleccionVehiculo !== "Todos")
        params.append("vehiculo", seleccionVehiculo);
      if (seleccionRuta !== "Todos") params.append("ruta", seleccionRuta);

      if (seleccionBuscarPor === "Codigo") {
        params.append("codigo", inputBuscar);
      } else if (seleccionBuscarPor === "Nombre") {
        params.append("nombre", inputBuscar);
      } else if (seleccionBuscarPor === "Barrio") {
        params.append("barrio", inputBuscar);
      }

      const response = await fetch(`${url}/buscarCliente?${params.toString()}`);
      const data = await response.json();

      setResultado(data);
      setHidden(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <div className="container my-5 pt-5 text-center">
        <h1 className="bg-light rounded-pill w-75 mx-auto">Buscar Clientes</h1>
      </div>

      <div
        className="container mb-5 bg-light rounded-5 p-5"
        data-bs-theme="dark"
      >
        <Form onSubmit={enviar}>
          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Estado:</Form.Label>
              <Form.Select
                value={estado}
                onChange={(e) => {
                  setEstado(e.target.value);
                }}
              >
                <option value={"Todos"}>Todos</option>
                <option value={"Activo"}>Activo</option>
                <option value={"Inactivo"}>Inactivo</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Buscar por:</Form.Label>
              <Form.Select
                value={seleccionBuscarPor}
                onChange={(e) => {
                  activarEspacios(e);
                  setSeleccionBuscarPor(e.target.value);
                }}
              >
                <option>Todos</option>
                <option>Codigo</option>
                <option>Barrio</option>
                <option>Nombre</option>
                <option>Vehiculo/Ruta</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Vehiculo:</Form.Label>
              <Form.Select
                disabled={data.vehiculo.disabled}
                value={seleccionVehiculo}
                onChange={(e) => setSeleccionVehiculo(e.target.value)}
              >
                {/* importar opciones desde la base de datos */}
                <option selected={data.vehiculo.selected}>Todos</option>
                <option>ABC 123</option>
                <option>DEF 456</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Ruta:</Form.Label>
              <Form.Select
                disabled={data.ruta.disabled}
                value={seleccionRuta}
                onChange={(e) => setSeleccionRuta(e.target.value)}
              >
                {/* importar opciones desde la base de datos */}
                <option selected={data.vehiculo.selected}>Todos</option>
                <option>Lunes - Jueves</option>
                <option>Martes - Viernes</option>
                <option>Miercoles - Sabado</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="codigo" className="col-6 fw-bold">
              <Form.Label>Buscar:</Form.Label>
              <Form.Control
                placeholder="Dato de la busqueda"
                disabled={data.codigo.disabled}
                value={inputBuscar}
                onChange={(e) => setInputBuscar(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Button
            variant="success"
            type="submit"
            className="d-block mx-auto w-25 mt-5"
          >
            Submit
          </Button>
        </Form>
      </div>
      <div className="container" data-bs-theme="dark" hidden={hidden}>
        <h4 className="bg-light w-50 text-center rounded-pill mx-auto">
          Coincidencias encontradas: {resultado.length}
        </h4>
        <table className="table mt-3 mx-auto table-striped table-hover table-bordered">
          <thead>
            <tr>
              <td>Codigo</td>
              <td>Nombre</td>
              <td>Direccion</td>
              <td>Barrio</td>
              <td>Telefono</td>
              <td>Descripcion</td>
              <td>Bot</td>
              <td>Vehiculo</td>
              <td>Ruta</td>
              <td>Saldo</td>
              <td>Estado</td>
              <td>Editar</td>
            </tr>
          </thead>
          <tbody>
            {resultado.map((item) => (
              <tr>
                <td key={item.cliente_id}>{item.codigo}</td>
                <td key={item.cliente_id}>{item.nombre}</td>
                <td key={item.cliente_id}>{item.direccion}</td>
                <td key={item.cliente_id}>{item.barrio}</td>
                <td key={item.cliente_id}>{item.telefono}</td>
                <td key={item.cliente_id}>{item.descripcion}</td>
                <td key={item.cliente_id}>{item.botellones}</td>
                <td key={item.cliente_id}>{item.vehiculo}</td>
                <td key={item.cliente_id}>{item.ruta}</td>
                <td key={item.cliente_id}>{item.saldo}</td>
                <td key={item.cliente_id}>{item.estado}</td>
                <td key={item.cliente_id}>
                  <Button className="button">Editar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BuscarCliente;
