import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
<link rel="stylesheet" href="../src/styles/App.css" />;

// Loading
import Loading from "./Loading";

// Import Components
import Header from "./Header";

// Home
import Home from "../pages/home/Home";

// Clientes
import NuevoCliente from "../pages/clientes/NuevoCliente";
import BuscarCliente from "../pages/clientes/BuscarCliente";
import HistorialCliente from "../pages/clientes/Historial";

// Ventas
import CargarPlanilla from "../pages/ventas/CargarPlanilla";
import VerPlanilla from "../pages/ventas/VerPlanilla";

// Iniciar Sesion
import IniciarSesion from "../pages/iniciarSesion/IniciarSesion";

const url = import.meta.env.VITE_API_URL;

function App() {
  const [backendReady, setBackendReady] = useState(false);
  const [estaAutenticado, setEstaAutenticado] = useState(
    () => localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    localStorage.setItem("auth", estaAutenticado);
  }, [estaAutenticado]);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`${url}/ping`);
        if (response.ok) {
          setBackendReady(true);
        }
      } catch (error) {
        console.error("Error al despertar el backend: ", error.message);
      }
    };

    checkBackend();
  }, []);

  if (!backendReady) return <Loading />;

  return (
    <>
      <div className="container d-flex flex-column min-vh-100 min-vw-100 bg-secondary px-0">
        <Router>
          {estaAutenticado && (
            <Header setEstaAutenticado={setEstaAutenticado} />
          )}

          <Routes>
            <Route
              path="/iniciarSesion"
              element={
                <IniciarSesion setEstaAutenticado={setEstaAutenticado} />
              }
            />

            <Route
              path="/"
              element={
                estaAutenticado ? (
                  <Home />
                ) : (
                  <Navigate to="/iniciarSesion" replace />
                )
              }
            />

            <Route
              path="/nuevoCliente"
              element={
                estaAutenticado ? (
                  <NuevoCliente />
                ) : (
                  <Navigate to="/iniciarSesion" replace />
                )
              }
            />
            <Route
              path="/buscarCliente"
              element={
                estaAutenticado ? (
                  <BuscarCliente />
                ) : (
                  <Navigate to="/iniciarSesion" replace />
                )
              }
            />
            <Route
              path="/historialCliente"
              element={
                estaAutenticado ? (
                  <HistorialCliente />
                ) : (
                  <Navigate to="/iniciarSesion" replace />
                )
              }
            />

            <Route
              path="/cargarPlanilla"
              element={
                estaAutenticado ? (
                  <CargarPlanilla />
                ) : (
                  <Navigate to="/iniciarSesion" replace />
                )
              }
            />
            <Route
              path="/verPlanilla"
              element={
                estaAutenticado ? (
                  <VerPlanilla />
                ) : (
                  <Navigate to="/iniciarSesion" replace />
                )
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
