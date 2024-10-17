import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

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

const MapaCalor = () => {
  const position = [-17.375265, -66.158412];
  const position1 = [-17.378224, -66.161144];

  // Datos para el mapa de calor (latitud, longitud, intensidad)
  const heatmapData = [
    [-17.375265, -66.158412, 100],
    [-17.378224, -66.161144, 100],
    [-17.376, -66.159, 60],
    [-17.377, -66.16, 80],
    // Agrega más puntos según sea necesario
  ];

  // Función para convertir intensidad a color
  const getColor = (intensity) => {
    const hue = ((1 - intensity / 100) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  };

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
        {heatmapData.map((point, index) => (
          <Circle
            key={index}
            center={[point[0], point[1]]}
            pathOptions={{
              fillColor: getColor(point[2]),
              fillOpacity: 0.7,
              stroke: false,
              radius: 100,
            }}
            radius={100}
          />
        ))}
        <Marker position={position1}>
          <Tooltip permanent direction="top" offset={[0, -20]}>
            Final
          </Tooltip>
        </Marker>
        <Marker position={position}>
          <Tooltip permanent direction="top" offset={[0, -20]}>
            Inicio
          </Tooltip>
        </Marker>
      </MapContainer>
    </MapWrapper>
  );
};

export default MapaCalor;
