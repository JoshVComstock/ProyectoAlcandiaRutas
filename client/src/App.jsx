import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/sidebar";
import Layout from "./pages/_layout";
import Home from "./pages/private/home";
import Usuario from "./pages/private/usuario";
import MapaCalor from "./pages/private/mapaCalor";
import RutasRecoridas from "./pages/private/RutasRecoridas";
import Login from "./pages/login";
import { UserProvider } from "./hook/useUser";
import { Toaster } from "react-hot-toast";
import Reportes from './components/reports/reportes';
import FiltradosTodo from "./components/filtradoUsuarios/filtradosTodo";
function App() {

  return (
    <UserProvider>
    <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/nav" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="usuario" element={<Usuario />} />
            <Route path="mapaCalor" element={<MapaCalor />} />
            <Route path="rutasRecoridas" element={<RutasRecoridas />} />
            <Route path="reportes" element={<Reportes />} />
            <Route path="FiltradosTodo" element={<FiltradosTodo />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
