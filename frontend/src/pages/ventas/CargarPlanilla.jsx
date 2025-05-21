import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function CargarPlanilla() {
  return (
    <>
      <div className="container" data-bs-theme="dark">
        <h1 className="my-5 pt-5 text-center">Cargar Planilla</h1>
        <Form className="container bg-light rounded-5 p-5">
          <h3>Datos predeterminado de la planilla:</h3>
          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="fecha">
              <Form.Label>Fecha:</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group as={Col} controlId="vehiculo">
              <Form.Label>Vehiculo:</Form.Label>
              <Form.Select>
                <option>ABC 123</option>
                <option>DEF 456</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="ruta">
              <Form.Label>Ruta:</Form.Label>
              <Form.Select>
                <option>Lunes - Jueves</option>
                <option>Martes - Viernes</option>
                <option>Miercoles - Sabado</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="producto">
              <Form.Label>Producto:</Form.Label>
              <Form.Select>
                <option>Producto 1</option>
                <option>Producto 2</option>
                <option>Producto 3</option>
                <option>Producto 4</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <h3>Datos de la venta:</h3>
          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="codigo">
              <Form.Label>Codigo:</Form.Label>
              <Form.Control type="text" autoFocus />
            </Form.Group>
            <Form.Group as={Col} controlId="cantidad">
              <Form.Label>Cantidad:</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group as={Col} controlId="pago">
              <Form.Label>Pago:</Form.Label>
              <Form.Control type="text" value={0} />
            </Form.Group>
            <Form.Group as={Col} controlId="botellones">
              <Form.Label>Botellones P(+) R(-):</Form.Label>
              <Form.Control type="number" value={0} />
            </Form.Group>
            <Form.Group as={Col} controlId="formaDePgo">
              <Form.Label>Forma de Pago:</Form.Label>
              <Form.Select>
                <option>Efectivo</option>
                <option>Aplicacion</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Button
            variant="success"
            type="submit"
            className="d-block mx-auto w-25 mt-5"
          >
            Cargar
          </Button>
        </Form>
        <div className="container">
          <h5 className="mt-5 text-center">Resumen del ultimo ingreso</h5>
          <table className="table mt-3 mx-auto table-striped table-hover">
            <thead>
              <tr>
                <td>Codigo</td>
                <td>Producto</td>
                <td>Valor</td>
                <td>Cantidad</td>
                <td>Contado</td>
                <td>Credito</td>
                <td>Abono</td>
                <td>Saldo</td>
                <td>Botellones</td>
                <td>F. de pago</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Codigo</td>
                <td>Producto</td>
                <td>Valor</td>
                <td>Cantidad</td>
                <td>Contado</td>
                <td>Credito</td>
                <td>Abono</td>
                <td>Saldo</td>
                <td>Botellones</td>
                <td>F. de pago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CargarPlanilla;
