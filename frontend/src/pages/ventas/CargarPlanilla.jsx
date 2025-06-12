import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";
import { useEffect } from "react";
import ModalConfirmarVenta from "../../components/modal/ModalConfirmarVenta";

const url = import.meta.env.VITE_API_URL;

function CargarPlanilla() {
  // Datos predeterminados
  const [fecha, setFecha] = useState("");
  const [vehiculo, setVehiculo] = useState("Seleccione");
  const [ruta, setRuta] = useState("Seleccione");
  const [producto, setProducto] = useState("Seleccione");
  const [valorProducto, setValorProducto] = useState(0);

  // Datos Variables
  const [codigo, setCodigo] = useState("");
  const [validacionCodigo, setValidacionCodigo] = useState(true);
  const [cantidad, setCantidad] = useState(0);
  const [cantidadImput, setCantidadImput] = useState(false);
  const [pago, setPago] = useState(0);
  const [botellones, setBotellones] = useState(0);
  const [formaDePago, setFormaDePago] = useState("Efectivo");

  // Listas de la base de datos
  const [listaVehiculos, setListaVehiculos] = useState([]);
  const [listaRutas, setListaRutas] = useState([]);
  const [listaProductos, setListaProductos] = useState([]);

  // Informacion previa del cliente
  const [infoCliente, setInfoCliente] = useState([]);

  // Datos de la venta
  const [contado, setContado] = useState(0);
  const [credito, setCredito] = useState(0);
  const [abono, setAbono] = useState(0);
  const [nuevoSaldo, setNuevoSaldo] = useState(0);

  // Mostrar resultados
  const [mostrarResultados, setMostrarResultados] = useState(true);

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

      // Productos
      const responseProductos = await fetch(`${url}/productos`);
      const responseListaProductos = await responseProductos.json();
      setListaProductos(responseListaProductos);
    } catch (error) {
      console.error(
        "Error al llamar las listas de la base de datos",
        error.message
      );
    }
  }

  async function datosCliente(e) {
    const params = new URLSearchParams();
    params.append("codigo", codigo);
    try {
      const response = await fetch(
        `${url}/historialCliente?${params.toString()}`
      );
      const data = await response.json();

      if (!data.cliente || Object.keys(data.cliente).length === 0) {
        console.log("Cliente no encontrado");
        setInfoCliente({});
        setValidacionCodigo(false);
        return;
      }

      setValidacionCodigo(true);
      setInfoCliente(data.cliente);
      console.log(data);
    } catch (error) {
      console.error("Error al cargar los datos de los clientes", error.message);
    }
  }

  async function cargarVenta(e) {
    e.preventDefault();

    // Chequeo de los campos
    if (
      vehiculo === "Seleccione" ||
      ruta === "Seleccione" ||
      producto === "Seleccione"
    ) {
      alert("Complete todos los campos obligatorios.");
      return;
    }

    if (!validacionCodigo) {
      alert("Ingrese un codigo valido.");
      return;
    }

    if (producto !== "Abono" && cantidad === 0) {
      console.log(producto);
      console.log(cantidad);
      alert("Ingrese la cantidad de producto o revise si es un Abono");
      return;
    }

    if (isNaN(cantidad)) {
      alert("Tipo de dato incorrecto en Cantidad");
      return;
    }

    if (isNaN(pago)) {
      alert("Tipo de dato incorrecto en Pago");
      return;
    }

    if (isNaN(botellones)) {
      alert("Tipo de dato incorrecto en Botellones");
      return;
    }

    const body = {
      fecha,
      vehiculo,
      ruta,
      producto,
      codigo,
      cantidad,
      pago,
      botellones,
      formaDePago,
    };
    console.log("datos del formulario: ", body);
    console.log("datos del cliente: ", infoCliente);

    // Datos previos del Cliente
    let saldo = parseInt(infoCliente.saldo ?? 0);
    const botellonesPrestados = infoCliente.botellones ?? 0;

    // Datos de la venta
    const precioProducto = listaProductos.find((p) => p.nombre === producto);
    console.log("precio Producto", precioProducto);
    const precioFinal = producto === "Abono" ? pago : precioProducto.valor;

    setValorProducto(Number(precioFinal));

    const compra = precioFinal * Number(cantidad);
    const pagoNumner = Number(pago);
    let contado = 0;
    let credito = 0;
    let abono = 0;
    let saldoFinal = saldo;

    if (pago > saldo + compra) {
      console.log("Error: Se está pagando más de lo que debe.");
      alert("Error: Se está pagando más de lo que debe.");
      return;
    }

    if (pagoNumner <= compra && saldo === 0) {
      contado = pagoNumner;
      credito = compra - contado;
      saldoFinal = credito;
      console.log("opcion 1");
      //
    } else if (compra + saldo === pagoNumner) {
      abono = saldo;
      contado = compra;
      console.log("opcion 2");
      console.log(typeof pagoNumner);
    } else if (!pagoNumner || pagoNumner === 0) {
      credito = compra;
      saldoFinal = saldo + credito;
      console.log("opcion 3");
    } else if (
      pagoNumner >= compra &&
      pagoNumner > saldo &&
      compra + saldo > pagoNumner
    ) {
      credito = compra + saldo - pagoNumner;
      contado = compra - credito;
      abono = pagoNumner - contado;
      saldoFinal = credito;
      console.log("opcion 4");
    } else if (pagoNumner < saldo) {
      credito = compra;
      abono = pagoNumner;
      saldoFinal = saldo + compra - pagoNumner;
      console.log("opcion 5");
    } else if (pagoNumner < compra + saldo) {
      contado = pagoNumner - saldo;
      abono = saldo;
      credito = compra - pagoNumner;
      saldoFinal = credito;
      console.log("opcion 6");
    } else {
      console.log("No esta dentro de las opciones");
    }

    setContado(contado);
    setCredito(credito);
    setAbono(abono);
    setNuevoSaldo(saldoFinal);
    setMostrarResultados(false);
  }

  // Confirmacion de la venta
  const inputRef = useRef(null);

  // Enfoque a la casilla codigo al confirmar la venta
  useEffect(() => {
    if (mostrarResultados && inputRef.current) {
      requestAnimationFrame(() => {
        inputRef.current.focus();
        inputRef.current.select();
      });
    }
  }, [mostrarResultados]);

  function handleModalClose() {
    setMostrarResultados(true);
  }

  function handleModalExited() {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, 100);
  }

  function calcularVenta() {}

  async function confirmarVenta(e) {
    e.preventDefault();

    try {
      const body = {
        fecha,
        vehiculo,
        ruta,
        producto,
        valor: valorProducto,
        codigo,
        cantidad,
        botellones,
        formaDePago,
        contado,
        credito,
        abono,
        saldo: nuevoSaldo,
      };
      const response = await fetch(`${url}/cargarVenta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      setMostrarResultados(!mostrarResultados);

      setCodigo("");
      setCantidad(0);
      setPago(0);
      setBotellones(0);
      setFormaDePago("Efectivo");
    } catch (error) {
      console.error(
        "Error al cargar la venta en la base de datos en el modalConfirmar",
        error.message
      );
    }
  }

  return (
    <>
      <div className="container" data-bs-theme="dark">
        <div className="container my-5 pt-5 text-center">
          <h1 className="bg-white w-50 mx-auto py-2 rounded-pill">
            Cargar Planilla
          </h1>
        </div>

        <Form
          className="container bg-light rounded-5 p-5"
          onSubmit={cargarVenta}
        >
          <h3>Datos predeterminado de la planilla:</h3>
          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="fecha">
              <Form.Label>Fecha:</Form.Label>
              <Form.Control
                required
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="vehiculo">
              <Form.Label>Vehiculo:</Form.Label>
              <Form.Select
                required
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
                required
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
            <Form.Group as={Col} controlId="producto">
              <Form.Label>Producto:</Form.Label>
              <Form.Select
                required
                value={producto}
                onChange={(e) => {
                  const nuevoProducto = e.target.value;
                  setProducto(nuevoProducto);
                  if (nuevoProducto === "Abono") {
                    setCantidad(0);
                    setCantidadImput(true);
                  } else {
                    setCantidadImput(false);
                  }
                }}
              >
                <option disabled hidden>
                  Seleccione
                </option>
                <option>Abono</option>
                {listaProductos.map((producto) => (
                  <option key={producto.producto_id} value={producto.nombre}>
                    {producto.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
          <h3>Datos de la venta:</h3>
          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="codigo">
              <Form.Label>Codigo:</Form.Label>
              <Form.Control
                required
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                onFocus={(e) => e.target.select()}
                onBlur={() => datosCliente()}
                isInvalid={!validacionCodigo}
                ref={inputRef}
                autoFocus
              />
              <Form.Text className="text-danger" hidden={validacionCodigo}>
                ⚠️ El código ingresado no existe.
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} controlId="cantidad">
              <Form.Label>Cantidad:</Form.Label>
              <Form.Control
                type="text"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                onFocus={(e) => e.target.select()}
                disabled={cantidadImput}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="pago">
              <Form.Label>Pago:</Form.Label>
              <Form.Control
                type="text"
                value={pago}
                onChange={(e) => setPago(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="botellones">
              <Form.Label>Botellones P(+) R(-):</Form.Label>
              <Form.Control
                type="number"
                value={botellones}
                onChange={(e) => setBotellones(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formaDePgo">
              <Form.Label>Forma de Pago:</Form.Label>
              <Form.Select
                value={formaDePago}
                onChange={(e) => setFormaDePago(e.target.value)}
              >
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
        <ModalConfirmarVenta
          show={!mostrarResultados}
          onClose={handleModalClose}
          onExited={handleModalExited}
          onSubmit={confirmarVenta}
          onClick={confirmarVenta}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              confirmarVenta();
            }
          }}
          {...{
            codigo,
            producto,
            valorProducto,
            cantidad,
            contado,
            credito,
            abono,
            pago,
            nuevoSaldo,
            botellones,
            formaDePago,
          }}
        />
      </div>
    </>
  );
}

export default CargarPlanilla;
