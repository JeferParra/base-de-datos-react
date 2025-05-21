import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function NuevoCliente() {
  return (
    <>
      <h1 className="my-5 pt-5 text-center">Nuevo Cliente</h1>
      <div
        className="container mb-5 bg-light p-5 rounded-5"
        data-bs-theme="dark"
      >
        <Form>
          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="codigo">
              <Form.Label>Codigo</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese el Codigo del cliente"
                min={0}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="nombre" autoComplete="off">
              <Form.Label>Nombre del Cliente</Form.Label>
              <Form.Control type="text" placeholder="Nombre del Cliente" />
            </Form.Group>
          </Row>

          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="direccion" className="col-8">
              <Form.Label>Direccion</Form.Label>
              <Form.Control placeholder="Direccion del cliente" />
            </Form.Group>
            <Form.Group as={Col} controlId="barrio">
              <Form.Label>Barrio</Form.Label>
              <Form.Control placeholder="Direccion del cliente" />
            </Form.Group>
          </Row>

          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="direccion" className="col-5">
              <Form.Label>Telefono</Form.Label>
              <Form.Control placeholder="Numero de Telefono" />
            </Form.Group>
            <Form.Group as={Col} controlId="barrio">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control placeholder="Breve descripcion de la casa" />
            </Form.Group>
          </Row>

          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Vehiculo</Form.Label>
              <Form.Select>
                <option hidden defaultValue="">
                  Seleccione
                </option>
                <option>Vehiculo 1</option>
                <option>Vehiculo 2</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Ruta</Form.Label>
              <Form.Select>
                <option hidden defaultValue="">
                  Seleccione
                </option>
                <option>Ruta 1</option>
                <option>Ruta 2</option>
                <option>Ruta 3</option>
              </Form.Select>
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

export default NuevoCliente;
