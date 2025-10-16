import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_API_URL;

function IniciarSesion({ setAuthData }) {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [empresa, setEmpresa] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, empresa, password }),
      });

      if (!response.ok) {
        alert("Usuario o contrasena invalidos.");
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setAuthData({
          autenticado: true,
          empresa: data.empresa,
          usuario: data.usuario,
          baseDeDatos: data.base_de_datos,
        });
        console.log(data); // Eliminar el console.log
      }

      navigate("/");
    } catch (error) {
      console.error("Error en la peticion:", error);
    }
  };

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
        <Form onSubmit={handleSubmit}>
          <Col>
            <Form.Group
              as={Row}
              controlId="usuario"
              className="col-6 fw-bold mx-auto mb-3"
            >
              <Form.Label className="px-0">Usuario:</Form.Label>
              <Form.Control
                placeholder="Nombre de usuario"
                onChange={(e) => setUsuario(e.target.value)}
                required
                autoFocus
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group
              as={Row}
              controlId="empresa"
              className="col-6 fw-bold mx-auto mb-3"
            >
              <Form.Label className="px-0">Empresa:</Form.Label>
              <Form.Control
                placeholder="Empresa"
                onChange={(e) => setEmpresa(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group
              as={Row}
              controlId="contraseña"
              className="col-6 fw-bold mx-auto"
            >
              <Form.Label className="px-0">Contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
