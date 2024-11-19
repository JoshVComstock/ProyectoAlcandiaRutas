import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

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

const Button = styled.button`
  background-color: ${(props) =>
    props.primary ? "#6200ff" : props.color || "#6200ff"};
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  border: none;
  margin-right: 0.5rem;

  &:hover {
    background-color: ${(props) =>
      props.primary ? "#4b00c2" : props.hoverColor || "#4b00c2"};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const Table = styled.table`
  min-width: 100%;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const TableHead = styled.th`
  padding: 1rem 1.5rem;
  background-color: #6200ff;
  color: white;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: rgba(151, 71, 255, 0.1);
  }
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  animation: ${slideDown} 0.3s ease-out;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: #4a5568;
  font-size: 0.875rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #4a5568;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #6200ff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const ModalTitle = styled.h2`
  color: #6200ff;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Usuario = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://backendrutas.onrender.com/usuario", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const res = await response.json();
      if (response.ok) {
        setUsers(res.data);
        console.log(users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(
          `https://backendrutas.onrender.com/usuario/${editingUser.id}`,
          formData
        );
      } else {
        await axios.post("https://backendrutas.onrender.com/usuario", formData);
      }
      fetchUsers();
      setModalOpen(false);
      setEditingUser(null);
      setFormData({ nombre: "", usuario: "", password: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ nombre: user.nombre, usuario: user.usuario, password: "" });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backendrutas.onrender.com/usuario/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Container>
      <Title>Gestión de Usuarios</Title>
      <Button primary onClick={() => setModalOpen(true)}>
        Agregar Usuario
      </Button>

      <Table>
        <thead>
          <tr>
            <TableHead>Nombre</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Acciones</TableHead>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.nombre}</TableCell>
              <TableCell>{user.usuario}</TableCell>
              <TableCell>
                <Button
                  color="#eab308"
                  hoverColor="#ca8a04"
                  onClick={() => handleEdit(user)}
                >
                  Editar
                </Button>
                <Button
                  color="#ef4444"
                  hoverColor="#dc2626"
                  onClick={() => handleDelete(user.id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {modalOpen && (
        <Modal>
          <ModalContent>
            <ModalTitle>{editingUser ? "Editar Usuario" : "Agregar Usuario"}</ModalTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="nombre">Nombre:</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="usuario">Usuario:</Label>
                <Input
                  id="usuario"
                  name="usuario"
                  type="text"
                  value={formData.usuario}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Contraseña:</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={!editingUser}
                />
              </FormGroup>
              <ButtonGroup>
                <Button type="submit" primary>
                  {editingUser ? "Actualizar" : "Crear"}
                </Button>
                <Button
                  type="button"
                  color="#6b7280"
                  hoverColor="#4b5563"
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Usuario;