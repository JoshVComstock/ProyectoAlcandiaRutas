import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import Loading from "../../components/loading";
import { Atom } from "react-loading-indicators";
import NombreCalles from "./callesRutas";
import useGet from "../../hook/useGet";
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

const RutasRecorridas = () => {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data } = useGet("allRutas");
  useEffect(() => {
    fetchRutas();
  }, []);

  const fetchRutas = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "https://backendrutas.onrender.com/rutaRecoridas"
      );
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
  const inicio = data.map((ruta) => `${ruta.start[0]}, ${ruta.start[1]}`);
  const final = data.map((ruta) => `${ruta.middle[0]}, ${ruta.middle[1]}`);
  console.log("Inicio:", inicio);
  console.log("Final:", final);
  console.log(data);
  return (
    <Container>
      <Title>Rutas más recorridas</Title>
      <NombreCalles data={data} />
    </Container>
  );
};

export default RutasRecorridas;
