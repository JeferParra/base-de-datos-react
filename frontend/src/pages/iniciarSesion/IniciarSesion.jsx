import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function IniciarSesion() {
  return (
    <>
      <div className="container my-5 pt-5 text-center">
        <h1 className="bg-white w-50 mx-auto py-2 rounded-pill">
          Iniciar Sesión
        </h1>
      </div>
      <div
        className="container mb-5 bg-light rounded-5 p-5 w-50"
        data-bs-theme="dark"
      >
        <Form>
          <Col>
            <Form.Group
              as={Row}
              controlId="usuario"
              className="col-6 fw-bold mx-auto mb-3"
            >
              <Form.Label className="px-0">Usuario:</Form.Label>
              <Form.Control placeholder="Nombre de usuario" />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group
              as={Row}
              controlId="contraseña"
              className="col-6 fw-bold mx-auto"
            >
              <Form.Label className="px-0">Contraseña:</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>
          </Col>

          <Button
            variant="success"
            type="submit"
            className="d-block mx-auto w-25 mt-5"
          >
            Iniciar Sesión
          </Button>
        </Form>
      </div>
    </>
  );
}

export default IniciarSesion;
