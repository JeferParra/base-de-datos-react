import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function ModalConfirmarVenta({
  show,
  onClose,
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
  onClick,
  onExited,
}) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      onExited={onExited}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      data-bs-theme="dark"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Resumen del ultimo ingreso
        </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <div className="container">
            <table className="table mt-4 mx-auto table-striped table-hover table-bordered">
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
                  <td>{codigo}</td>
                  <td>{producto}</td>
                  <td>
                    ${" "}
                    {new Intl.NumberFormat("es-CO").format(
                      producto !== "Abono" ? valorProducto : pago
                    )}
                  </td>
                  <td>{cantidad}</td>
                  <td>$ {new Intl.NumberFormat("es-CO").format(contado)}</td>
                  <td>$ {new Intl.NumberFormat("es-CO").format(credito)}</td>
                  <td>$ {new Intl.NumberFormat("es-CO").format(abono)}</td>
                  <td>$ {new Intl.NumberFormat("es-CO").format(nuevoSaldo)}</td>
                  <td>{botellones}</td>
                  <td>{formaDePago}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            type="submit"
            className="d-block mx-auto w-25 mt-2"
            onClick={onClick}
            autoFocus
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalConfirmarVenta;
