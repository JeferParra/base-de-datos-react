import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
<link rel="stylesheet" href="../src/styles/App.css" />;

// Import Components
import Header from "./Header";

// Clientes
import NuevoCliente from "../pages/clientes/NuevoCliete";
import BuscarCliente from "../pages/clientes/BuscarCliente";
import HistorialCliente from "../pages/clientes/HistorialCliente";

// Ventas
import CargarPlanilla from "../pages/ventas/CargarPlanilla";
import VerPlanilla from "../pages/ventas/VerPlanilla";

function App() {
  return (
    <>
      <div className="container d-flex flex-column min-vh-100 min-vw-100 bg-secondary px-0">
        <Router>
          <Header />

          <Routes>
            <Route path="/nuevoCliente" element={<NuevoCliente />} />
            <Route path="/buscarCliente" element={<BuscarCliente />} />
            <Route path="/historialCliente" element={<HistorialCliente />} />

            <Route path="/cargarPlanilla" element={<CargarPlanilla />} />
            <Route path="/verPlanilla" element={<VerPlanilla />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
