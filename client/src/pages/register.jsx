import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
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

const BackButton = styled.button`
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

const Register = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const handleSend = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:3000/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nombre: name,
          usuario: usuario,
          password: password,
          role: role,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.data) {
          toast.success("Registro correcto");
          setName("");
          setUsuario("");
          setPassword("");
          setConfirmPassword("");
          onRegister();
        } else {
          toast.error("Error al registrar usuario ");
        }
      } else {
        toast.error(result.message || "Usuario no registrado");
      }
    } catch (error) {
      toast.error("Error de red. Por favor, verifica tu conexión.");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSend}>
        <Title>Registrarse</Title>
        <Input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
        <Button type="submit">Registrar</Button>
        <BackButton type="button" onClick={onRegister}>
          Volver a Iniciar Sesión
        </BackButton>
      </Form>
    </Container>
  );
};

export default Register;
