import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import Loading from "../../components/loading";
import { Atom } from "react-loading-indicators";

const slideDown = keyframes`
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #6200ff;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  animation: ${slideDown} 0.5s ease-out;
`;

const Table = styled.table`
  min-width: 100%;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const TableHead = styled.th`
  padding: 1rem 1.5rem;
  background-color: #6200ff;
  color: white;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: rgba(151, 71, 255, 0.1);
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
`;
const DivLoading = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RutasRecorridas = () => {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRutas();
  }, []);

  const fetchRutas = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://127.0.0.1:3000/rutaRecoridas");
      setRutas(response.data.data);
    } catch (error) {
      console.error("Error fetching rutas:", error);
      setError(
        "Hubo un error al cargar las rutas. Por favor, intente de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Rutas más recorridas</Title>

      {loading ? (
        <DivLoading>
          <Atom color="#6200ff" size="medium" text="" textColor="" />
        </DivLoading>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHead>#</TableHead>
              <TableHead>Nombre calle</TableHead>
              <TableHead>Personas caminadas</TableHead>
            </tr>
          </thead>
          <tbody>
            {rutas.map((ruta, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{ruta.street}</TableCell>
                <TableCell>{ruta.count}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default RutasRecorridas;
