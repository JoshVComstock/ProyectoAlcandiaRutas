import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useUser } from "../../hook/useUser";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 4rem);
`;

const Home = () => {
  const { user } = useUser();
  const [nuevasRutas, setNuevasRutas] = useState([]);

  const obtenerRutaOSRM = async (start, end) => {
    try {
      const response = await fetch(
        `http://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
      );
      if (!response.ok)
        throw new Error("Error en la respuesta del servidor OSRM");
      const data = await response.json();
      return data.routes[0]?.geometry?.coordinates || [];
    } catch (error) {
      console.error("Error obteniendo la ruta desde OSRM:", error);
      return [];
    }
  };
  const obtenerRutas = async () => {
    try {
      if (!user?.rutas || user.rutas.length === 0) {
        console.warn("No hay rutas definidas en el usuario.");
        return;
      }

      const rutasCalculadas = [];
      for (const ruta of user.rutas) {
        if (!ruta.start || !ruta.middle || !ruta.end) {
          console.warn("Una de las rutas tiene datos incompletos:", ruta);
          continue;
        }

        // Obtenemos el tramo 1 y 2 desde la API de OSRM
        const tramo1 = await obtenerRutaOSRM(ruta.start, ruta.middle);
        const tramo2 = await obtenerRutaOSRM(ruta.middle, ruta.end);

        // Agregamos los puntos calculados como `path`
        rutasCalculadas.push({
          start: ruta.start,
          end: ruta.end,
          path: [...tramo1, ...tramo2], // Coordenadas detalladas
        });
      }

      setNuevasRutas(rutasCalculadas);
    } catch (error) {
      console.error("Error al cargar las rutas:", error);
    }
  };
  useEffect(() => {
    obtenerRutas();
  }, []);

  const position = [-17.375265, -66.158412];

  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#F3FF33"];

  return (
    <MapWrapper>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {nuevasRutas.map((ruta, index) => (
          <React.Fragment key={index}>
            <Polyline
              positions={ruta.path.map(([lng, lat]) => [lat, lng])} // Cambia de [lng, lat] a [lat, lng]
              pathOptions={{ color: colors[index % colors.length], weight: 5 }}
            />
            <Marker position={ruta.start}>
              <Tooltip permanent direction="top" offset={[0, -20]}>
                Inicio
              </Tooltip>
            </Marker>
            <Marker position={ruta.end}>
              <Tooltip permanent direction="top" offset={[0, -20]}>
                Final
              </Tooltip>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>
    </MapWrapper>
  );
};

export default Home;
