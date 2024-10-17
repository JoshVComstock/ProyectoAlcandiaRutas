// Loading.js
import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 8px solid ${({ theme }) => theme.primary100}; /* Color de fondo */
  border-top: 8px solid ${({ theme }) => theme.primary}; /* Color de la parte superior */
  border-radius: 50%;
  width: 60px; /* Ancho del loader */
  height: 60px; /* Altura del loader */
  animation: ${spin} 1s linear infinite; /* Animación de giro */
  margin: auto; /* Centrar en el contenedor */
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.primary};
  text-align: center;
  margin-top: 10px; /* Espacio entre el loader y el texto */
`;

const Loading = () => (
  <div>
    <Loader />
    <LoadingText>Cargando...</LoadingText>
  </div>
);

export default Loading;
