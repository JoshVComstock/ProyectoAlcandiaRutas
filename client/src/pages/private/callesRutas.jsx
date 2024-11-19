import React, { useState, useEffect } from "react";
import styled from "styled-components";

const NombreCalles = ({ data }) => {
  const [calles, setCalles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerCalles = async () => {
      try {
        setCargando(true);
        setError(null);
        const callesTemp = {};

        for (const { start, middle, end } of data) {
          // Obtener primera parte de la ruta (inicio a medio)
          const responseRuta1 = await fetch(
            `http://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${middle[1]},${middle[0]}?overview=full&annotations=true&steps=true`
          );

          // Obtener segunda parte de la ruta (medio a fin)
          const responseRuta2 = await fetch(
            `http://router.project-osrm.org/route/v1/driving/${middle[1]},${middle[0]};${end[1]},${end[0]}?overview=full&annotations=true&steps=true`
          );

          if (!responseRuta1.ok || !responseRuta2.ok) {
            throw new Error("Error al obtener la ruta");
          }

          const dataRuta1 = await responseRuta1.json();
          const dataRuta2 = await responseRuta2.json();

          if (!dataRuta1.routes?.[0] || !dataRuta2.routes?.[0]) {
            throw new Error("No se encontró una ruta completa");
          }

          // Procesar pasos de ambas rutas
          [dataRuta1, dataRuta2].forEach((ruta) => {
            ruta.routes[0].legs[0].steps.forEach((step) => {
              const nombreCalle = step.name || "Calle sin nombre";

              if (!callesTemp[nombreCalle]) {
                callesTemp[nombreCalle] = {
                  nombre: nombreCalle,
                  distanciaTotal: 0,
                };
              }
              callesTemp[nombreCalle].distanciaTotal += step.distance;
            });
          });
        }

        const callesAgrupadas = Object.values(callesTemp)
          .filter((calle) => calle.nombre !== "")
          .sort((a, b) => b.distanciaTotal - a.distanciaTotal);

        setCalles(callesAgrupadas);
      } catch (err) {
        setError(err.message);
        console.error("Error al obtener las calles:", err);
      } finally {
        setCargando(false);
      }
    };

    if (data.length > 0) {
      obtenerCalles();
    }
  }, [data]);

  const formatearDistancia = (metros) => {
    if (metros >= 1000) {
      return `${(metros / 1000).toFixed(1)} km`;
    }
    return `${Math.round(metros)} m`;
  };

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Análisis de Calles en la Ruta</Title>
      {cargando ? (
        <LoadingMessage>Cargando calles...</LoadingMessage>
      ) : (
        <ListContainer>
          {calles.map((calle, index) => (
            <StreetItem key={`${calle.nombre}-${index}`}>
              <StreetInfo>
                <StreetName>{calle.nombre}</StreetName>
                <TotalDistance>
                  {formatearDistancia(calle.distanciaTotal)}
                </TotalDistance>
              </StreetInfo>
            </StreetItem>
          ))}
        </ListContainer>
      )}
    </Container>
  );
};

export default NombreCalles;

const Container = styled.div`
  width: 100%;
  height: 500px;
  margin: 0 auto;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Summary = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SummaryItem = styled.div`
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const SummaryIcon = styled.div`
  font-size: 1.5rem;
`;

const SummaryContent = styled.div`
  flex: 1;
`;

const SummaryLabel = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.25rem;
`;

const SummaryValue = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
`;

const ListContainer = styled.div`
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

const StreetList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
  overflow-y: auto;

  /* Estilo del scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;

    &:hover {
      background: #94a3b8;
    }
  }
`;

const StreetItem = styled.li`
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    border-color: #60a5fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

const StreetInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StreetName = styled.div`
  font-weight: 500;
  color: #1e293b;
`;

const TotalDistance = styled.div`
  color: #64748b;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DistanceIcon = styled.span`
  font-size: 1rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #64748b;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LoadingSpinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  padding: 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  text-align: center;
`;
