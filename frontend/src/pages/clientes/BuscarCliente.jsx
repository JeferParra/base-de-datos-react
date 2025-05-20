import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useState } from "react";

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

  return (
    <>
      <h1 className="my-5 pt-5 text-center">Este es Buscar Clientes</h1>
      <div className="container mb-5" data-bs-theme="dark">
        <Form>
          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Estado:</Form.Label>
              <Form.Select>
                {/* importar opciones desde la base de datos */}
                <option value={"Todos"}>Todos</option>
                <option value={"Activo"}>Activo</option>
                <option value={"Inactivo"}>Inactivo</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Buscar por:</Form.Label>
              <Form.Select onChange={(e) => activarEspacios(e)}>
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
    </>
  );
}

export default BuscarCliente;
