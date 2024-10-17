import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Register from "./register";
import { useUser } from "../hook/useUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(
    135deg,
    rgba(98, 0, 255, 0.8),
    rgba(151, 71, 255, 0.8)
  );
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  width: 400px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #6200ff;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.8rem 0;
  border: 1px solid #6200ff;
  border-radius: 8px;
  outline: none;
  transition: border 0.3s, box-shadow 0.3s;

  &:focus {
    border: 1px solid rgba(151, 71, 255, 0.7);
    box-shadow: 0 0 5px rgba(98, 0, 255, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: #6200ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: rgba(151, 71, 255, 0.9);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: transparent;
  color: #6200ff;
  border: 1px solid #6200ff;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  transition: background 0.3s, color 0.3s, transform 0.3s;

  &:hover {
    background: #6200ff;
    color: white;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [regis, setRegis] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();
  const handleInicio = async (e) => {
    e.preventDefault();
    if (usuario && password) {
      try {
        const response = await fetch("http://127.0.0.1:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ usuario, password }),
        });

        const result = await response.json();

        if (response.ok) {
          if (result.data) {
            toast.success("Inicio de sesión correcto");
            setUser(result.data);
            navigate("/nav");
            console.log(result.data);
          } else {
            toast.error("Usuario no autorizado");
          }
        } else {
          toast.error(result.message || "Usuario no autorizado");
        }
      } catch (error) {
        toast.error("Error de red. Por favor, verifica tu conexión.");
      }
    } else {
      toast.error("Por favor, ingresa el usuario y la contraseña");
    }
  };

  return (
    <Container>
      {regis ? (
        <>
          <Register onRegister={() => setRegis(!regis)} />
        </>
      ) : (
        <>
          <Form onSubmit={handleInicio}>
            <Title>Iniciar Sesión</Title>
            <Input
              type="text"
              placeholder="Correo Electrónico"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">Iniciar Sesión</Button>
            <RegisterButton type="button" onClick={() => setRegis(!regis)}>
              Registrar
            </RegisterButton>
          </Form>
        </>
      )}
    </Container>
  );
};

export default Login;
