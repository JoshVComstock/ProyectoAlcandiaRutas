import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Popup } from "react-leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import useGet from "../../hook/useGet";

const MapaConRutas = () => {
  const { data: rutasData } = useGet("allRutas");
  const [rutasCalle, setRutasCalle] = useState({
    nuevasRutas: [],
    segmentos: {},
    cargando: false,
    error: null,
  });

  const obtenerRutaOSRM = async (start, end) => {
    try {
      const response = await fetch(
        `http://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
      );
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor OSRM");
      }
      const data = await response.json();
      return data.routes[0]?.geometry?.coordinates || [];
    } catch (error) {
      console.error("Error obteniendo la ruta desde OSRM:", error);
      throw error;
    }
  };

  const obtenerRutasCalle = async () => {
    try {
      setRutasCalle((prev) => ({ ...prev, cargando: true, error: null }));
      const nuevasRutas = [];
      const segmentos = {};

      const incrementarFrecuencia = (segmento) => {
        const clave = `${segmento[0][0]},${segmento[0][1]}-${segmento[1][0]},${segmento[1][1]}`;
        segmentos[clave] = (segmentos[clave] || 0) + 1;
      };

      for (const ruta of rutasData) {
        const tramo1 = await obtenerRutaOSRM(ruta.start, ruta.middle);
        const tramo2 = await obtenerRutaOSRM(ruta.middle, ruta.end);
        const rutaCompleta = [...tramo1, ...tramo2];

        rutaCompleta.forEach((punto, index, array) => {
          if (index < array.length - 1) {
            const segmento = [punto, array[index + 1]];
            incrementarFrecuencia(segmento);
          }
        });

        nuevasRutas.push(rutaCompleta);
      }

      setRutasCalle({
        nuevasRutas,
        segmentos,
        cargando: false,
        error: null,
      });
    } catch (error) {
      setRutasCalle((prev) => ({
        ...prev,
        cargando: false,
        error: "Error al cargar las rutas",
      }));
    }
  };

  const obtenerColorPorFrecuencia = (frecuencia) => {
    const colores = {
      1: { color: "#2196F3", descripcion: "Poco transitado" },
      3: { color: "#FFC107", descripcion: "Tránsito moderado" },
      5: { color: "#FF9800", descripcion: "Alto tránsito" },
      7: { color: "#F44336", descripcion: "Muy transitado" },
    };

    for (const [limite, datos] of Object.entries(colores).reverse()) {
      if (frecuencia >= parseInt(limite)) {
        return datos;
      }
    }
    return colores[1];
  };

  const obtenerFrecuenciaSegmento = (punto1, punto2) => {
    const clave = `${punto1[0]},${punto1[1]}-${punto2[0]},${punto2[1]}`;
    return rutasCalle.segmentos[clave] || 0;
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>Mapa de Calor de Rutas</Title>
          <Legend>
            {Object.entries({
              1: "Poco (1 vez o menos)",
              3: "Moderado (más de 1 vez)",
              5: "Alto (más de 3 veces)",
              7: "Muy Alto (más de 5 veces)",
            }).map(([freq, label]) => (
              <LegendItem key={freq}>
                <ColorBox
                  color={obtenerColorPorFrecuencia(parseInt(freq)).color}
                />
                <Label>{label}</Label>
              </LegendItem>
            ))}
          </Legend>
          <LoadButton onClick={obtenerRutasCalle}>
            {rutasCalle.cargando ? "Cargando..." : "Cargar Rutas"}
          </LoadButton>
        </HeaderContent>
      </Header>
      <MapContent>
        {rutasCalle.cargando && (
          <LoadingOverlay>
            <LoadingText>Cargando rutas...</LoadingText>
          </LoadingOverlay>
        )}
        <StyledMapContainer center={[-17.4825, -66.0991]} zoom={15}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {rutasCalle.nuevasRutas.map((ruta, rutaIndex) => (
            <React.Fragment key={rutaIndex}>
              {ruta.map((punto, index, array) => {
                if (index < array.length - 1) {
                  const frecuencia = obtenerFrecuenciaSegmento(
                    punto,
                    array[index + 1]
                  );
                  const { color, descripcion } =
                    obtenerColorPorFrecuencia(frecuencia);
                  return (
                    <Polyline
                      key={`${rutaIndex}-${index}`}
                      positions={[
                        [punto[1], punto[0]],
                        [array[index + 1][1], array[index + 1][0]],
                      ]}
                      pathOptions={{
                        color,
                        weight: 4,
                        opacity: 0.7,
                      }}
                    >
                      <Popup>
                        <PopupContent>
                          <strong>Frecuencia:</strong> {frecuencia} veces
                          <br />
                          <strong>Nivel:</strong> {descripcion}
                        </PopupContent>
                      </Popup>
                    </Polyline>
                  );
                }
                return null;
              })}
            </React.Fragment>
          ))}
        </StyledMapContainer>
      </MapContent>
    </Container>
  );
};

export default MapaConRutas;

const LoadButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #a5d6a7;
    cursor: not-allowed;
  }
`;
const Container = styled.div`
  margin: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Legend = styled.div`
  display: flex;
  gap: 1rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ColorBox = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 4px;
  background-color: ${(props) => props.color};
`;

const Label = styled.span`
  font-size: 0.875rem;
  color: #666;
`;

const MapContent = styled.div`
  position: relative;
  padding: 1rem;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const LoadingText = styled.div`
  font-size: 1.125rem;
  color: #333;
  background: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  padding: 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  margin: 1rem;
`;

const StyledMapContainer = styled(MapContainer)`
  height: 70vh;
  width: 100%;
  border-radius: 8px;
  z-index: 1;
`;

const PopupContent = styled.div`
  font-size: 0.875rem;

  strong {
    color: #333;
  }
`;
