import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CustomModal({ show, onClose, title, body }) {
  return (
    <>
      <Modal show={show} onHide={onClose} data-bs-theme="dark">
        <div className="div">
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{body}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default CustomModal;
