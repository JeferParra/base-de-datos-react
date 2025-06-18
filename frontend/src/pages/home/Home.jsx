import { Button, Col, Row, Stack } from "react-bootstrap";

function Home() {
  return (
    <>
      <div className="container my-5 pt-5 text-center">
        <h1 className="bg-white w-50 mx-auto py-2 rounded-pill">Inicio</h1>
      </div>

      <Row>
        <Col>
          <h5 className="bg-white w-25 mx-auto py-1 rounded-pill text-center mb-5">
            Clientes
          </h5>
          <Stack gap={5}>
            <Button
              className="mx-auto w-50 d-block"
              size="lg"
              variant="dark"
              href="/nuevoCliente"
            >
              Nuevo Cliente
            </Button>
            <Button
              className="mx-auto w-50 d-block"
              size="lg"
              variant="dark"
              href="/buscarCliente"
            >
              Buscar Cliente
            </Button>
            <Button
              className="mx-auto w-50 d-block"
              size="lg"
              variant="dark"
              href="/historialCliente"
            >
              Historial Cliente
            </Button>
          </Stack>
        </Col>

        <Col>
          <h5 className="bg-white w-25 mx-auto py-1 rounded-pill text-center mb-5">
            Ventas
          </h5>
          <Stack gap={5}>
            <Button
              className="mx-auto w-50 d-block"
              size="lg"
              variant="dark"
              href="/cargarPlanilla"
            >
              Cargar Planilla
            </Button>
            <Button
              className="mx-auto w-50 d-block"
              size="lg"
              variant="dark"
              href="/verPlanilla"
            >
              Ver Planilla
            </Button>
          </Stack>
        </Col>
      </Row>
    </>
  );
}

export default Home;
