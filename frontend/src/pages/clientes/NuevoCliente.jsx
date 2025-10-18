import { useState } from "react";
import { useEffect } from "react";
import { Fade } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const url = import.meta.env.VITE_API_URL;

function NuevoCliente() {
  const [vehiculos, setVehiculos] = useState([]);
  const [rutas, setRutas] = useState([]);

  // Variables del formulario

  const [codigo, setCodigo] = useState("");
  const [validacionCodigo, setValidacionCodigo] = useState(true);
  const [codigoAnterior, setCodigoAnterior] = useState("");

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [barrio, setBarrio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [descripcion, setDesctipcion] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [ruta, setRuta] = useState("");

  const authData = JSON.parse(localStorage.getItem("authData"));
  const baseDeDatos = authData?.baseDeDatos;

  useEffect(() => {
    async function listas() {
      try {
        // vehiculos
        const resVehiculos = await fetch(`${url}/vehiculos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-basededatos": baseDeDatos,
          },
        });
        const listaVehiculos = await resVehiculos.json();
        setVehiculos(listaVehiculos);

        // rutas
        const resRutas = await fetch(`${url}/rutas`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-basededatos": baseDeDatos,
          },
        });
        const listaRutas = await resRutas.json();
        setRutas(listaRutas);
      } catch (error) {
        console.error(error.message);
      }
    }

    listas();
  }, []);

  async function datosCliente(e) {
    if (codigo === codigoAnterior || codigo.trim() === "") return;
    const params = new URLSearchParams();
    params.append("codigo", codigo);
    try {
      const response = await fetch(`${url}/clientes?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-basededatos": baseDeDatos,
        },
      });
      const data = await response.json();
      console.log(data.length);

      if (data.length === 0) {
        console.log("Codigo disponible");
        setValidacionCodigo(true);
        return;
      }

      setValidacionCodigo(false);
      console.log("codigo no disponible");
    } catch (error) {
      console.error("Error al cargar los datos de los clientes", error.message);
    }
  }

  async function enviar(e) {
    e.preventDefault();

    if (codigo.length !== 4) {
      alert("El codigo debe ser de 4 digitos.");
      return;
    }

    if (!vehiculo || vehiculo === "") {
      alert("⚠️ Por favor seleccione un vehículo antes de continuar.");
      return;
    }

    if (!ruta || ruta === "") {
      alert("⚠️ Por favor seleccione una ruta antes de continuar.");
      return;
    }

    try {
      const body = {
        codigo,
        nombre,
        direccion,
        barrio,
        telefono,
        descripcion,
        vehiculo,
        ruta,
      };

      const response = await fetch(`${url}/nuevoCliente`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-basededatos": baseDeDatos,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Nuevo cliente registrado exitosamente.");
        window.location = "/nuevoCliente";
      } else {
        alert(
          `❌ Error al registrar cliente: ${errorData.error || "Desconocido"}`
        );
      }
    } catch (error) {
      console.error(error.message);
      alert("⚠️ Ocurrió un error inesperado al registrar el cliente.");
    }
  }

  return (
    <>
      <div className="container my-5 pt-5 text-center">
        <h1 className="bg-white w-50 mx-auto py-2 rounded-pill">
          Nuevo Cliente
        </h1>
      </div>
      <div
        className="container mb-5 bg-light p-5 rounded-5"
        data-bs-theme="dark"
      >
        <Form onSubmit={enviar}>
          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="codigo">
              <Form.Label>Codigo</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese el Codigo del cliente"
                name="codigo"
                min={0}
                autoComplete="off"
                onChange={(e) => {
                  const valor = e.target.value;
                  // Solo permitir números y máximo 10 caracteres
                  if (/^\d{0,4}$/.test(valor)) {
                    setCodigo(valor);
                  }
                }}
                onBlur={() => datosCliente()}
                isInvalid={!validacionCodigo}
                value={codigo}
                autoFocus
                maxLength={4}
                required
              />
              <Form.Text className="text-danger" hidden={validacionCodigo}>
                ⚠️ El código ingresado ya existe.
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} controlId="nombre" autoComplete="off">
              <Form.Label>Nombre del Cliente</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del Cliente"
                name="nombre"
                onChange={(e) => setNombre(e.target.value)}
                value={nombre}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="direccion" className="col-8">
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                placeholder="Direccion del cliente"
                name="direccion"
                onChange={(e) => setDireccion(e.target.value)}
                value={direccion}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="barrio">
              <Form.Label>Barrio</Form.Label>
              <Form.Control
                placeholder="Direccion del cliente"
                name="barrio"
                onChange={(e) => setBarrio(e.target.value)}
                value={barrio}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="direccion" className="col-5">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="tel"
                maxLength={10}
                pattern="[0-9]{10}"
                placeholder="Numero de Telefono"
                name="telefono"
                onChange={(e) => {
                  const valor = e.target.value;
                  // Solo permitir números y máximo 10 caracteres
                  if (/^\d{0,10}$/.test(valor)) {
                    setTelefono(valor);
                  }
                }}
                value={telefono}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="barrio">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                placeholder="Breve descripcion de la casa"
                name="descripcion"
                onChange={(e) => setDesctipcion(e.target.value)}
                value={descripcion}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3 fw-bold">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Vehiculo</Form.Label>
              <Form.Select
                name="vehiculo"
                onChange={(e) => setVehiculo(e.target.value)}
                value={vehiculo}
                required
              >
                <option hidden defaultValue="">
                  Seleccione
                </option>
                {vehiculos.map((vehiculo) => (
                  <option key={vehiculo.id}>{vehiculo.vehiculo}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Ruta</Form.Label>
              <Form.Select
                name="ruta"
                onChange={(e) => setRuta(e.target.value)}
                value={ruta}
              >
                <option hidden defaultValue="">
                  Seleccione
                </option>
                {rutas.map((ruta) => (
                  <option key={ruta.id}>{ruta.ruta}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <Button
            variant="success"
            type="submit"
            className="d-block mx-auto w-25 mt-5"
          >
            Crear Cliente
          </Button>
        </Form>
      </div>
    </>
  );
}

export default NuevoCliente;
