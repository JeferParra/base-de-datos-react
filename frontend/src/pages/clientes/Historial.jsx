import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useState } from "react";

import CustomModal from "../../components/CustomModal";

const url = import.meta.env.VITE_API_URL;

function HistorialCliente() {
  const [hidden, setHidden] = useState(true);
  const [dataCliente, setDataCliente] = useState([]);
  const [dataVentas, setDataVentas] = useState([]);
  const [codigo, setCodigo] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  async function enviar(e) {
    e.preventDefault();

    console.log(dataCliente);
    console.log(dataVentas);

    try {
      const params = new URLSearchParams();
      params.append("codigo", codigo);

      const response = await fetch(
        `${url}/historialCliente?${params.toString()}`
      );

      // Revision de si existe el cliente
      if (!response.ok) {
        setHidden(true);
        const errorData = await response.json();
        setDataCliente({});
        setDataVentas([]);

        setModalMessage(errorData.error || "Cliente no encontrado");
        setShowModal(true);
        return;
      }

      // Cuando el cliente si existe

      setHidden(false);
      const data = await response.json();
      setDataCliente(data.cliente);
      setDataVentas(data.ventas);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <div className="container mb-5" data-bs-theme="dark">
        <div className="container"></div>
        <div className="container my-5 pt-5 text-center">
          <h1 className="bg-white w-50 mx-auto py-2 rounded-pill">
            Historial Cliente
          </h1>
        </div>
        <div className="container bg-light py-5 rounded-pill">
          <Form onSubmit={enviar}>
            <Row>
              <Form.Group
                as={Col}
                controlId="codigo"
                className="col-4 fw-bold mx-auto"
              >
                <Form.Label>Buscar:</Form.Label>
                <Form.Control
                  placeholder="Codigo Cliente"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
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
        </div>
        <div className="container" hidden={hidden}>
          <div className="container">
            <h3 className="text-center mt-5 bg-light w-50 mx-auto rounded-pill py-2 mb-5">
              Informacion del Cliente
            </h3>
          </div>

          <table className="table w-50 mt-3 mx-auto table-striped table-hover">
            <tbody>
              <tr>
                <td className="w-25 fw-bold text-end">Codigo:</td>
                <td className="w-25">{dataCliente.codigo}</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Nombre:</td>
                <td className="w-25">{dataCliente.nombre}</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Direccion:</td>
                <td className="w-25">{dataCliente.direccion}</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Barrio:</td>
                <td className="w-25">{dataCliente.barrio}</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Telefono:</td>
                <td className="w-25">{dataCliente.telefono}</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Descripcion:</td>
                <td className="w-25">{dataCliente.descripcion}</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Saldo:</td>
                <td className="w-25">{dataCliente.saldo}</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Botellones prestados:</td>
                <td className="w-25">{dataCliente.botellones}</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Vehiculo encargado:</td>
                <td className="w-25">{dataCliente.vehiculo}</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Ruta:</td>
                <td className="w-25">{dataCliente.ruta}</td>
              </tr>
              <tr>
                <td className="w-25 fw-bold text-end">Estado del cliente:</td>
                <td className="w-25">
                  <span
                    className={`${
                      dataCliente.estado === "Activo"
                        ? "text-success"
                        : "text-warning"
                    }`}
                  >
                    {dataCliente.estado}
                  </span>
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
              {dataVentas.map((venta) => (
                <tr key={venta.id}>
                  <td>{venta.fecha}</td>
                  <td>{venta.cantidad}</td>
                  <td>{venta.valor}</td>
                  <td>{venta.contado + venta.abono}</td>
                  <td>{venta.saldo}</td>
                  <td>{venta.prestado_recuperado}</td>
                  <td>{venta.forma_de_pago}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CustomModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Atención"
        body={modalMessage}
      />
    </>
  );
}

export default HistorialCliente;
