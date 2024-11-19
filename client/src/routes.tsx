import { Route, Routes } from "react-router-dom";
import Login from "./view/public";
import Layout from "./view/private/_layout";
import Home from "./view/private/home/home";
import Usuario from "./view/private/usuario";
import MapaCalor from "./pages/private/mapaCalor";
import Reportes from "./components/reports/reportes";
import RutasRecoridas from "./pages/private/RutasRecoridas";

const RoutesComponent = () => {
  return (
    <main className="w-full h-screen bg-bg">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/nav" element={<Layout />}>
          {/* Rutas accesibles para todos */}
          <Route index element={<Home />} />
          <Route path="usuario" element={<Usuario />} />
          <Route path="mapaCalor" element={<MapaCalor />} />
          <Route path="rutasRecoridas" element={<RutasRecoridas />} />
          <Route path="reportes" element={<Reportes />} />
        </Route>
      </Routes>
    </main>
  );
};

export default RoutesComponent;
