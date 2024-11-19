import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/sidebar";
import Layout from "./pages/_layout";
import Home from "./pages/private/home";
import Usuario from "./pages/private/usuario";
import MapaCalor from "./pages/private/mapaCalor";
import Login from "./pages/login";
import { UserProvider } from "./hook/useUser";
import { Toaster } from "react-hot-toast";
import MapaConRutas from "./pages/private/heatMap";
import RutasRecorridas from "./pages/private/rutasRecoridas";
import MapaCalorFiltro from "./pages/private/filtrarRutasCalor";
function App() {
  return (
    <UserProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/nav" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="usuario" element={<Usuario />} />
            <Route path="mapaCalor" element={<MapaConRutas />} />
            <Route path="rutasRecoridas" element={<RutasRecorridas />} />
            <Route path="mapaCalorFiltro" element={<MapaCalorFiltro />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
