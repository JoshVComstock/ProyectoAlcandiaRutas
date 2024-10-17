import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip,Polyline } from "react-leaflet";
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
        {user.rutas.map((ruta, index) => (
          <React.Fragment key={ruta.id}>
            <Polyline
              positions={[ruta.start, ruta.middle, ruta.end]}
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
