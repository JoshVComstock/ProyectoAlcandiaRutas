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
import { rutas } from "../../data/rutas";
import HeatmapMap from "./heatMap";
import MapaConRutas from "./heatMap";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


const MapaCalor = () => {
  const rutas = [
    {
      start: [-17.4824895, -66.0991303],
      middle: [-17.483, -66.1],
      end: [-17.484, -66.101],
    },
    {
      start: [-17.4824895, -66.0991303],
      middle: [-17.4827, -66.0998],
      end: [-17.4835, -66.1009],
    },
    {
      start: [-17.482, -66.098],
      middle: [-17.4825, -66.099],
      end: [-17.4827, -66.0998],
    },
    {
      start: [-17.483, -66.1],
      middle: [-17.4837, -66.101],
      end: [-17.484, -66.101],
    },
    {
      start: [-17.4824895, -66.0991303],
      middle: [-17.4827, -66.0998],
      end: [-17.483, -66.1],
    },
    {
      start: [-17.4835, -66.1009],
      middle: [-17.4837, -66.101],
      end: [-17.484, -66.101],
    },
    {
      start: [-17.482, -66.098],
      middle: [-17.4824895, -66.0991303],
      end: [-17.483, -66.1],
    },
    {
      start: [-17.4824895, -66.0991303],
      middle: [-17.483, -66.1],
      end: [-17.484, -66.101],
    },
    {
      start: [-17.4827, -66.0998],
      middle: [-17.4835, -66.1009],
      end: [-17.4837, -66.101],
    },
  ];
  return (
    <>
      <MapaConRutas />
    </>
    /*  <MapWrapper>
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
    </MapWrapper> */
  );
};

export default MapaCalor;
