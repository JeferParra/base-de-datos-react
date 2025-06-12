import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

const url = import.meta.env.VITE_API_URL;

function VerPlanilla() {
  const [fecha, setFecha] = useState("");
  const [vehiculo, setVehiculo] = useState("Seleccione");
  const [ruta, setRuta] = useState("Seleccione");

  const [listaVehiculos, setListaVehiculos] = useState([]);
  const [listaRutas, setListaRutas] = useState([]);

  const [mostrarResultados, setMostrarResultados] = useState(true);
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [totalContados, setTotalContados] = useState(0);
  const [totalCreditos, setTotalCreditos] = useState(0);
  const [totalAbonos, setTotalAbonos] = useState(0);
  const [totalPrestados, setTotalPrestados] = useState(0);
  const [totalRecuperados, setTotalRecuperados] = useState(0);

  useEffect(() => {
    listas();
  }, []);

  // funciones

  async function listas() {
    try {
      // Vehiculos
      const responseVehiculos = await fetch(`${url}/vehiculos`);
      const responseListaVehiculos = await responseVehiculos.json();
      setListaVehiculos(responseListaVehiculos);

      // Rutas
      const responseRutas = await fetch(`${url}/rutas`);
      const responseListaRutas = await responseRutas.json();
      setListaRutas(responseListaRutas);
    } catch (error) {
      console.error(
        "Error al llamar las listas de la base de datos",
        error.message
      );
    }
  }

  async function cargarVentas(e) {
    e.preventDefault();

    try {
      const params = new URLSearchParams({
        fecha,
        vehiculo,
        ruta,
      });

      const response = await fetch(
        `${url}/cargarPlanillaVentas?${params.toString()}`
      );
      const responseVentas = await response.json();
      setVentas(responseVentas);
      console.log(responseVentas); // borrar console.log

      const listaProductos = {};
      let totalContados = 0;
      let totalCreditos = 0;
      let totalAbonos = 0;
      let totalPrestados = 0;
      let totalRecuperados = 0;

      responseVentas.forEach((venta) => {
        const { producto, cantidad } = venta;
        if (listaProductos[producto]) {
          listaProductos[producto] += cantidad;
        } else {
          listaProductos[producto] = cantidad;
        }

        totalContados += venta.contado;
        totalCreditos += venta.credito;
        totalAbonos += venta.abono;

        if (venta.prestado_recuperado > 0) {
          totalPrestados += venta.prestado_recuperado;
        } else if (venta.prestado_recuperado) {
          totalRecuperados += venta.prestado_recuperado;
        }
      });

      const listaResumen = Object.entries(listaProductos).map(
        ([producto, cantidad]) => ({
          producto,
          cantidad,
        })
      );
      setMostrarResultados(false);
      setProductos(listaResumen);
      setTotalContados(totalContados);
      setTotalCreditos(totalCreditos);
      setTotalAbonos(totalAbonos);
      setTotalPrestados(totalPrestados);
      setTotalRecuperados(totalRecuperados);
    } catch (error) {
      console.error();
    }
  }

  return (
    <>
      <div className="container">
        <div className="container my-5 pt-5 text-center">
          <h1 className="bg-white w-50 mx-auto py-2 rounded-pill">
            Ver Planilla
          </h1>
        </div>
        <Form
          className="container bg-light p-5 rounded-5"
          data-bs-theme="dark"
          onSubmit={cargarVentas}
        >
          <h3>Datos de la Planilla:</h3>
          <Row className="fw-bold">
            <Form.Group as={Col} controlId="fecha">
              <Form.Label>Fecha:</Form.Label>
              <Form.Control
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="vehiculo">
              <Form.Label>Vehiculo:</Form.Label>
              <Form.Select
                value={vehiculo}
                onChange={(e) => setVehiculo(e.target.value)}
              >
                <option disabled hidden>
                  Seleccione
                </option>
                {listaVehiculos.map((vehiculo) => (
                  <option key={vehiculo.id} value={vehiculo.vehiculo}>
                    {vehiculo.vehiculo}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="ruta">
              <Form.Label>Ruta:</Form.Label>
              <Form.Select
                value={ruta}
                onChange={(e) => setRuta(e.target.value)}
              >
                <option disabled hidden>
                  Seleccione
                </option>
                {listaRutas.map((ruta) => (
                  <option key={ruta.id} value={ruta.ruta}>
                    {ruta.ruta}
                  </option>
                ))}
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
        <h5
          className="bg-light w-25 text-center rounded-pill mx-auto m-5"
          hidden={mostrarResultados}
        >
          Registos encontrados: {ventas.length}
        </h5>
        <div
          className="container"
          data-bs-theme="dark"
          hidden={mostrarResultados}
        >
          <table className="table mt-3 mx-auto table-striped table-hover table-bordered">
            <thead className="fw-bold">
              <tr className="text-center align-middle">
                <td>Codigo</td>
                <td>Producto</td>
                <td>Valor</td>
                <td>Cantidad</td>
                <td>Contado</td>
                <td>Credito</td>
                <td>Abono</td>
                <td>Saldo</td>
                <td>
                  Botellon
                  <br /> P(+) R(-)
                </td>
                <td>F. de pago</td>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta.id}>
                  <td>{venta.codigo}</td>
                  <td>{venta.producto}</td>
                  <td>
                    $ {new Intl.NumberFormat("es-CO").format(venta.valor)}
                  </td>
                  <td>{venta.cantidad}</td>
                  <td>
                    $ {new Intl.NumberFormat("es-CO").format(venta.contado)}
                  </td>
                  <td>
                    $ {new Intl.NumberFormat("es-CO").format(venta.credito)}
                  </td>
                  <td>
                    $ {new Intl.NumberFormat("es-CO").format(venta.abono)}
                  </td>
                  <td>
                    $ {new Intl.NumberFormat("es-CO").format(venta.saldo)}
                  </td>
                  <td>{venta.prestado_recuperado}</td>
                  <td>{venta.forma_de_pago}</td>
                </tr>
              ))}
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
              <tr className="fw-bold text-success  ">
                <td>Item</td>
                <td>cantidad</td>
              </tr>
              {productos.map((producto) => (
                <tr key={producto.producto}>
                  <td>{producto.producto}</td>
                  <td>{producto.cantidad}</td>
                </tr>
              ))}
              <tr>
                <td>Bot. Prestados</td>
                <td>{totalPrestados}</td>
              </tr>
              <tr>
                <td>Bot. Recuperados</td>
                <td>{Math.abs(totalRecuperados)}</td>
              </tr>
              <tr>
                <td>Contado</td>
                <td>
                  $ {new Intl.NumberFormat("es-CO").format(totalContados)}
                </td>
              </tr>
              <tr>
                <td>Credito</td>
                <td>
                  $ {new Intl.NumberFormat("es-CO").format(totalCreditos)}
                </td>
              </tr>
              <tr>
                <td>Abono</td>
                <td>$ {new Intl.NumberFormat("es-CO").format(totalAbonos)}</td>
              </tr>
              <tr>
                <td>Total Ingresos</td>
                <td>
                  ${" "}
                  {new Intl.NumberFormat("es-CO").format(
                    totalAbonos + totalContados
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default VerPlanilla;
