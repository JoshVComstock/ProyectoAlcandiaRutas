import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import "leaflet-routing-machine";

const Routing: React.FC<{
  start: LatLngExpression;
  middle: LatLngExpression;
  end: LatLngExpression;
}> = ({ start, middle, end }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Primer segmento (start -> middle)
    const firstSegment = L.Routing.control({
      waypoints: [L.latLng(start), L.latLng(middle)],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }],
      },
    }).addTo(map);

    // Segundo segmento (middle -> end)
    const secondSegment = L.Routing.control({
      waypoints: [L.latLng(middle), L.latLng(end)],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "red", weight: 4 }],
      },
    }).addTo(map);

    // Último segmento (end -> más allá)
    const thirdSegment = L.Routing.control({
      waypoints: [L.latLng(end), L.latLng(end[0] + 0.01, end[1] + 0.01)],
      routeWhileDragging: false,
      lineOptions: {
        styles: [{ color: "green", weight: 4 }],
      },
    }).addTo(map);

    return () => {
      map.removeControl(firstSegment);
      map.removeControl(secondSegment);
      map.removeControl(thirdSegment);
    };
  }, [map, start, middle, end]);

  return null;
};

const Home = () => {
  const [showRoutes, setShowRoutes] = useState(false);
  const positionStart: LatLngExpression = [-17.3751, -66.15868];
  const positionMiddle: LatLngExpression = [-17.3776, -66.16234];
  const positionEnd: LatLngExpression = [-17.3801, -66.165];

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={positionStart}
        zoom={13}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Routing start={positionStart} middle={positionMiddle} end={positionEnd} />
      </MapContainer>

      <button
        onClick={() => setShowRoutes(!showRoutes)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {showRoutes ? "Ocultar Rutas" : "Mostrar Rutas"}
      </button>

      {showRoutes && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "20px",
            width: "300px",
            height: "200px",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "5px",
            padding: "10px",
            zIndex: 1000,
            overflowY: "auto",
          }}
        >
          <h3>Detalles de la Ruta</h3>
          <p>Punto de inicio: [-17.3751, -66.15868]</p>
          <p>Punto intermedio: [-17.3776, -66.16234]</p>
          <p>Punto de fin: [-17.3801, -66.165]</p>
          <p>Distancia aproximada: 1.5 km</p>
          <p>Tiempo estimado: 10 minutos</p>
        </div>
      )}
    </div>
  );
};

export default Home;
