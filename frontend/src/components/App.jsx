import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
<link rel="stylesheet" href="../src/styles/App.css" />;

// Import Components
import Header from "./Header";
import NuevoCliente from "../pages/clientes/NuevoCliete";
import BuscarCliente from "../pages/clientes/BuscarCliente";
import HistorialCliente from "../pages/clientes/HIstorialCliente";

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
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
