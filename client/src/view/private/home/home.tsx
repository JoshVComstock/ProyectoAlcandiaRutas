import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import "leaflet-routing-machine";
import { useUser } from "@/hook/useUser";

const Routing: React.FC<{
  start: LatLngExpression;
  middle: LatLngExpression;
  end: LatLngExpression;
}> = ({ start, middle, end }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const hideRoutingInstructions = (routingControl: any) => {
      const container = routingControl.getContainer();
      if (container) {
        container.style.display = "none";
      }
    };

    const firstSegment = L.Routing.control({
      waypoints: [L.latLng(start), L.latLng(middle)],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }],
      },
    }).addTo(map);

    hideRoutingInstructions(firstSegment);

    const secondSegment = L.Routing.control({
      waypoints: [L.latLng(middle), L.latLng(end)],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "red", weight: 4 }],
      },
    }).addTo(map);
    hideRoutingInstructions(secondSegment);

    const thirdSegment = L.Routing.control({
      waypoints: [L.latLng(end), L.latLng(end[0] + 0.01, end[1] + 0.01)],
      routeWhileDragging: false,
      lineOptions: {
        styles: [{ color: "green", weight: 4 }],
      },
    }).addTo(map);
    hideRoutingInstructions(thirdSegment);

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
  const { user } = useUser(); // Obtener el usuario desde el contexto

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={user.rutas[0].start} // Cambiar al inicio de la primera ruta
        zoom={13}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {user.rutas.map((ruta) => (
          <Routing
            key={ruta.id}
            start={ruta.start}
            middle={ruta.middle}
            end={ruta.end}
          />
        ))}
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

      {showRoutes && user.rutas.length > 0 && (
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
          <h3>Detalles de las Rutas</h3>
          {user.rutas.map((ruta) => (
            <div key={ruta.id}>
              <p>Punto de inicio: {JSON.stringify(ruta.start)}</p>
              <p>Punto intermedio: {JSON.stringify(ruta.middle)}</p>
              <p>Punto de fin: {JSON.stringify(ruta.end)}</p>
              <p>Distancia aproximada: 1.5 km</p>
              <p>Tiempo estimado: 10 minutos</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
