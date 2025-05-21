import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function VerPlanilla() {
  return (
    <>
      <h1 className="my-5 pt-5 text-center ">Ver Planilla</h1>
      <Form className="container bg-light p-5 rounded-5" data-bs-theme="dark">
        <h3>Datos de la Planilla:</h3>
        <Row className="fw-bold">
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
        </Row>
        <Button
          variant="success"
          type="submit"
          className="d-block mx-auto w-25 mt-5"
        >
          Buscar
        </Button>
      </Form>
      <div className="container" data-bs-theme="dark">
        <h5 className="text-center pt-4">Registos encontrados {"0"}</h5>
        <table className="table mt-3 mx-auto table-striped table-hover table-bordered">
          <thead className="fw-bold">
            <tr>
              <td>Codigo</td>
              <td>Producto</td>
              <td>Valor</td>
              <td>Cantidad</td>
              <td>Contado</td>
              <td>Credito</td>
              <td>Abono</td>
              <td>Saldo</td>
              <td>Botellon</td>
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
              <td>Botellon</td>
              <td>F. de pago</td>
            </tr>
          </tbody>
        </table>
        <table className="table w-50 mt-3 mx-auto table-striped table-hover table-bordered mt-5">
          <thead>
            <tr>
              <td className="text-center fw-bold" colSpan={2}>
                Cuadro Resumen
              </td>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td>Producto</td>
              <td>cantidad</td>
            </tr>
            <tr>
              <td>Contado</td>
              <td>cantidad</td>
            </tr>
            <tr>
              <td>Credito</td>
              <td>cantidad</td>
            </tr>
            <tr>
              <td>Abono</td>
              <td>cantidad</td>
            </tr>
            <tr>
              <td>Bot. Prestados</td>
              <td>cantidad</td>
            </tr>
            <tr>
              <td>Bot. Recuperados</td>
              <td>cantidad</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default VerPlanilla;
