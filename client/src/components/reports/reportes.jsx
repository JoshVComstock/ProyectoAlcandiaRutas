import { useState, useEffect, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import {
  FileSpreadsheet,
  FileText,
  RefreshCw,
  AlertCircle,
  Filter,
  Calendar,
} from "lucide-react";

// Animaciones y estilos
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(98, 0, 255, 0.8), rgba(151, 71, 255, 0.8));
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Card = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  max-width: 900px;
  width: 100%;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #6200ff;
  text-align: center;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background: #6200ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s, transform 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(151, 71, 255, 0.9);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  margin-top: 1.5rem;

  th, td {
    padding: 1rem;
    border-bottom: 1px solid #ddd;
  }

  th {
    background: rgba(98, 0, 255, 0.1);
    color: #6200ff;
    text-align: left;
    font-size: 0.9rem;
    font-weight: bold;
  }

  td {
    font-size: 0.9rem;
    color: #333;
  }

  tr:hover {
    background: rgba(98, 0, 255, 0.1);
  }
`;

const NoData = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #777;
`;

// Modal de filtros con estilos mejorados
const FilterModal = ({ isOpen, onClose, onApply, selectedFilter }) => {
  const [localFilter, setLocalFilter] = useState(selectedFilter);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          padding: "2rem",
          width: "400px",
          animation: "fadeIn 0.3s ease",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            color: "#333",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <Filter style={{ color: "#6200ff", fontSize: "1.8rem" }} />
          Filtros Avanzados
        </h2>
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="filtro"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
              color: "#6200ff",
            }}
          >
            Selecciona un filtro:
          </label>
          <select
            id="filtro"
            value={localFilter}
            onChange={(e) => setLocalFilter(e.target.value)}
            style={{
              width: "100%",
              padding: "0.8rem",
              border: "2px solid #6200ff",
              borderRadius: "8px",
              outline: "none",
              fontSize: "1rem",
              transition: "border-color 0.3s",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <option value="all">Todas las rutas</option>
            <option value="today">Hoy</option>
            <option value="lastWeek">Última semana</option>
            <option value="lastMonth">Último mes</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "0.8rem",
              backgroundColor: "#e0e0e0",
              color: "#333",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#d6d6d6")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#e0e0e0")}
          >
            Cancelar
          </button>
          <button
            onClick={() => onApply(localFilter)}
            style={{
              flex: 1,
              padding: "0.8rem",
              backgroundColor: "#6200ff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#4b00cc")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#6200ff")}
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

const Reportes = () => {
  const [rutas, setRutas] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  const fetchRutas = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/rutas?filter=${filter}`);
      if (!response.ok) {
        throw new Error(`Error al obtener rutas: ${response.status}`);
      }
      const result = await response.json();
      setRutas(result.data || []);
    } catch (error) {
      console.error("Error fetching rutas:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async (type) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/report/${type}?filter=${filter}`);
      if (!response.ok) {
        throw new Error(`Error al descargar reporte: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      const extension = type === "excel" ? "xlsx" : "pdf";
      a.href = url;
      a.download = `reporte-rutas-${new Date().toISOString().split("T")[0]}.${extension}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error("Error descargando reporte:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRutas();
  }, [filter]);

  const filteredRutas = useMemo(() => rutas, [rutas]);

  return (
    <Container>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={(selectedFilter) => {
          setFilter(selectedFilter);
          setIsFilterModalOpen(false);
        }}
        selectedFilter={filter}
      />
      {error && (
        <div style={{ marginBottom: "1rem", color: "red" }}>
          <AlertCircle /> {error}
        </div>
      )}
      <Card>
        <Title>
          <Calendar /> Reportes de Rutas
        </Title>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Button onClick={() => setIsFilterModalOpen(true)} disabled={loading}>
  <Filter style={{ marginRight: "0.5rem" }} /> Filtros
</Button>

          <Button onClick={() => downloadReport("excel")} disabled={loading}>
            <FileSpreadsheet /> Excel
          </Button>
          <Button onClick={() => downloadReport("pdf")} disabled={loading}>
            <FileText /> PDF
          </Button>
        </div>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Inicio</th>
              <th>Medio</th>
              <th>Final</th>
              <th>Tipo</th>
              <th>Usuarios</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {filteredRutas.length ? (
              filteredRutas.map((ruta) => (
                <tr key={ruta.id}>
                  <td>{ruta.id}</td>
                  <td>{ruta.start.join(", ")}</td>
                  <td>{ruta.middle.join(", ")}</td>
                  <td>{ruta.end.join(", ")}</td>
                  <td>{ruta.tipoCaminata}</td>
                  <td>{ruta.cantidadUsuarios}</td>
                  <td>{new Date(ruta.fechaCreacion).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  <NoData>No hay rutas disponibles.</NoData>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default Reportes;
