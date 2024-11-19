import React, { useState } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";

// Animaciones
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideDown = keyframes`
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Estilos Contenedor Principal
const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

// Título Principal
const Title = styled.h1`
  color: #6200ff;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  animation: ${slideDown} 0.5s ease-out;
`;

// Contenedor de Pestañas
const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

// Estilos de Pestaña
const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: ${props => props.active ? '#6200ff' : '#e2e8f0'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? '#4b00c2' : '#d1d8e0'};
  }
`;

// Panel de Contenido de Pestañas
const TabPanel = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
`;

// Grupo de Input
const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

// Etiqueta
const Label = styled.label`
  display: block;
  color: #4a5568;
  font-size: 0.875rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

// Input
const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #4a5568;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #6200ff;
  }
`;

// Botón
const Button = styled.button`
  background-color: #6200ff;
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  border: none;
  margin-top: 1rem;

  &:hover {
    background-color: #4b00c2;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Tabla
const Table = styled.table`
  width: 100%;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

// Encabezado de Tabla
const TableHead = styled.th`
  padding: 1rem 1.5rem;
  background-color: #6200ff;
  color: white;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
`;

// Celda de Tabla
const TableCell = styled.td`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

// Fila de Tabla
const TableRow = styled.tr`
  &:hover {
    background-color: rgba(151, 71, 255, 0.1);
  }
`;

const FiltradosTodo = () => {
  const [username, setUsername] = useState("");
  const [filtradoData, setFiltradoData] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [resultadosFecha, setResultadosFecha] = useState([]);
  const [tipoCaminata, setTipoCaminata] = useState("");
  const [rutasData, setRutasData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const fetchFiltradoPorUsuario = async () => {
    if (!username.trim()) {
      setError("Por favor, ingresa un nombre de usuario válido.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://127.0.0.1:3000/usuario/filtrado/${username}`);
      const { usuario, rutas } = response.data;
      setUsuario(usuario);
      setFiltradoData(rutas);
      if (!rutas.length) setError(`No hay datos para el usuario ${username}.`);
    } catch (err) {
        console.error("Error al filtrar:", err);
        setError("Ocurrió un error al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRutasPorFecha = async () => {
    if (!fechaInicio || !fechaFin) {
      setError("Por favor, selecciona un rango de fechas válido.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://127.0.0.1:3000/ruta/filtradas-fecha", {
        params: { fechaInicio, fechaFin },
      });
      setResultadosFecha(response.data.data);
    } catch (err) {
        console.error("Error al filtrar:", err);
        setError("Ocurrió un error al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFiltradoPorTipoCaminata = async () => {
    if (!tipoCaminata.trim()) {
      setError("Por favor, ingresa un tipo de caminata válido.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://127.0.0.1:3000/ruta/filtradas/${tipoCaminata}`);
      const { Rutas } = response.data;
      setRutasData(Rutas);
      if (!Rutas.length) setError(`No hay rutas disponibles para '${tipoCaminata}'.`);
    } catch (err) {
        console.error("Error al filtrar:", err);
        setError("Ocurrió un error al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  // Arreglo de pestañas con sus componentes y títulos
  const tabs = [
    {
      title: "Filtrado por Usuario",
      component: (
        <>
          <InputGroup>
            <Label>Nombre de Usuario:</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa el nombre de usuario"
            />
          </InputGroup>
          <Button onClick={fetchFiltradoPorUsuario} disabled={loading}>
            {loading ? "Cargando..." : "Filtrar"}
          </Button>
          {usuario && (
            <p style={{ color: "#6200ff", marginTop: "1rem" }}>
              Usuario: {usuario}
            </p>
          )}
          {filtradoData.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <TableHead>Tipo de Caminata</TableHead>
                  <TableHead>Cantidad de Rutas</TableHead>
                </tr>
              </thead>
              <tbody>
                {filtradoData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.tipo_caminata}</TableCell>
                    <TableCell>{data.cantidad_rutas}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )
    },
    {
      title: "Filtrado por Fecha",
      component: (
        <>
          <InputGroup>
            <Label>Fecha de Inicio:</Label>
            <Input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <Label>Fecha de Fin:</Label>
            <Input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </InputGroup>
          <Button onClick={fetchRutasPorFecha} disabled={loading}>
            {loading ? "Cargando..." : "Filtrar"}
          </Button>
          {resultadosFecha.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <TableHead>Calle</TableHead>
                  <TableHead>Cantidad de Personas</TableHead>
                </tr>
              </thead>
              <tbody>
                {resultadosFecha.map((resultado, index) => (
                  <TableRow key={index}>
                    <TableCell>{resultado.calle}</TableCell>
                    <TableCell>{resultado.cantidad}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )
    },
    {
      title: "Filtrado por Tipo de Caminata",
      component: (
        <>
          <InputGroup>
            <Label>Tipo de Caminata:</Label>
            <Input
              type="text"
              value={tipoCaminata}
              onChange={(e) => setTipoCaminata(e.target.value)}
              placeholder="Ingresa el tipo de caminata"
            />
          </InputGroup>
          <Button onClick={fetchFiltradoPorTipoCaminata} disabled={loading}>
            {loading ? "Cargando..." : "Filtrar"}
          </Button>
          {rutasData.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <TableHead>Ruta ID</TableHead>
                  <TableHead>Inicio</TableHead>
                  <TableHead>Punto Medio</TableHead>
                  <TableHead>Fin</TableHead>
                  <TableHead>Cantidad de Usuarios</TableHead>
                </tr>
              </thead>
              <tbody>
                {rutasData.map((ruta, index) => (
                  <TableRow key={index}>
                    <TableCell>{ruta.RutaID}</TableCell>
                    <TableCell>{ruta.Inicio.join(", ")}</TableCell>
                    <TableCell>{ruta.PuntoMedio.join(", ")}</TableCell>
                    <TableCell>{ruta.Fin.join(", ")}</TableCell>
                    <TableCell>{ruta.CantidadUsuarios}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )
    }
  ];

  return (
    <Container>
      <Title>Filtrados Todo</Title>
      
      <TabContainer>
        {tabs.map((tab, index) => (
          <Tab 
            key={index} 
            active={activeTab === index} 
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </Tab>
        ))}
      </TabContainer>

      <TabPanel active={true}>
        {tabs[activeTab].component}
      </TabPanel>

      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
    </Container>
  );
};

export default FiltradosTodo;