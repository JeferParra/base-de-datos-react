import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function HistorialCliente() {
  return (
    <>
      <div className="container mb-5" data-bs-theme="dark">
        <h1 className="my-5 pt-5 text-center">Historial Cliente</h1>;
        <div className="container bg-light py-5 rounded-pill">
          <Form>
            <Row>
              <Form.Group
                as={Col}
                controlId="codigo"
                className="col-4 fw-bold mx-auto"
              >
                <Form.Label>Buscar:</Form.Label>
                <Form.Control placeholder="Codigo Cliente" value={""} />
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
        <div className="container">
          <h1 className="text-center mt-5">Informacion del Cliente</h1>

          <table className="table w-50 mt-5 mx-auto table-striped table-hover">
            <tbody>
              <tr>
                <td className="w-25 fw-bold text-end">Codigo:</td>
                <td className="w-25">1234</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Nombre:</td>
                <td className="w-25">Nombre del Cliente</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Direccion:</td>
                <td className="w-25">Direccion registrada</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Barrio:</td>
                <td className="w-25">Nombre del Barrio</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Telefono:</td>
                <td className="w-25">123456789</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Descripcion:</td>
                <td className="w-25">
                  Una breve descripcion de la casa Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Ipsa delectus corrupti deserunt,
                  iusto aspernatur facere nemo, blanditiis quis laborum
                  voluptatem non dicta sapiente voluptatibus magnam provident
                  maiores sit? Ad, libero.
                </td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Saldo:</td>
                <td className="w-25">Monto adeudado por el cliente</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Botellones prestados:</td>
                <td className="w-25">Cantidad de botellones prestados</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Vehiculo encargado:</td>
                <td className="w-25">Identificacion del vehiculo</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Ruta:</td>
                <td className="w-25">Identificacion de la ruta asignada</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Estado del cliente:</td>
                <td className="w-25">
                  <span className="text-success">Activo</span> /
                  <span className="text-danger"> Inactivo</span>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="table w-100 mt-5 mx-auto table-striped table-hover table-bordered">
            <thead className="text-center">
              <tr>
                <th style={{ width: `${100 / 7}%` }}>Fecha</th>
                <th style={{ width: `${100 / 7}%` }}>Cantidad</th>
                <th style={{ width: `${100 / 7}%` }}>Valor</th>
                <th style={{ width: `${100 / 7}%` }}>Pagos</th>
                <th style={{ width: `${100 / 7}%` }}>Saldo</th>
                <th style={{ width: `${100 / 7}%` }}>Botellon P(+) R(-)</th>
                <th style={{ width: `${100 / 7}%` }}>Forma de pago</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fecha</td>
                <td>Cantidad</td>
                <td>Valor</td>
                <td>Pago</td>
                <td>Saldo</td>
                <td>Prestados</td>
                <td>forma de pago</td>
              </tr>
              <tr>
                <td>Fecha</td>
                <td>Cantidad</td>
                <td>Valor</td>
                <td>Pago</td>
                <td>Saldo</td>
                <td>Prestados</td>
                <td>forma de pago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default HistorialCliente;
