import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import "leaflet-routing-machine";

const Routing: React.FC<{ start: LatLngExpression; end: LatLngExpression }> = ({
  start,
  end,
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start), L.latLng(end)], // Puntos de inicio y fin
      routeWhileDragging: true, // Permite arrastrar la ruta
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }], // Estilo de la ruta
      },
    }).addTo(map);

    return () => map.removeControl(routingControl); // Limpiar el control al desmontar
  }, [map, start, end]);

  return null;
};

const Home = () => {
  const positionStart: LatLngExpression = [-17.3751, -66.15868]; // Punto inicial
  const positionEnd: LatLngExpression = [-17.3801, -66.165]; // Punto final

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={positionStart}
        zoom={13}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Routing start={positionStart} end={positionEnd} />
        <Marker position={positionStart}>
          <Popup>Start Point</Popup>
        </Marker>
        <Marker position={positionEnd}>
          <Popup>End Point</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Home;
