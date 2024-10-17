import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Home, User, LogOut, ChevronLeft, MapIcon, Route } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hook/useUser";
const SidebarContainer = styled(motion.div)`
  width: ${(props) => (props.isCollapsed ? "80px" : "250px")};
  height: 100vh;
  background-color: #ffffff;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  color: #333;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  color: #6200ff;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #4b5563;
  text-decoration: none;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(151, 71, 255, 0.2);
    color: #6200ff;
  }
`;

const NavText = styled.span`
  margin-left: 0.75rem;
  display: ${(props) => (props.isCollapsed ? "none" : "inline")};
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const LogoutButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem;
  background-color: rgba(151, 71, 255, 0.2);
  color: #4b5563;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e5e7eb;
    color: #6200ff;
  }
`;

const CollapseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: ${(props) => (props.isCollapsed ? "-1rem" : "1rem")};
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(151, 71, 255, 0.2);
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useUser();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
    console.log(isLogin ? "Login" : "Register", { email, password, name });
  };
  return (
    <SidebarContainer
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      isCollapsed={isCollapsed}
    >
      <Logo>{isCollapsed ? "TM" : "Travel Mode"}</Logo>
      <Logo>{isCollapsed ? " " : `Bienvenido`}</Logo>
      <Logo>{isCollapsed ? " " : `${user.nombre}`}</Logo>

      <CollapseButton
        onClick={() => setIsCollapsed(!isCollapsed)}
        isCollapsed={isCollapsed}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft
          size={20}
          style={{ transform: isCollapsed ? "rotate(180deg)" : "none" }}
        />
      </CollapseButton>
      <nav>
       
          
        {user.nombre == "admin" ? (
          <>
           <NavItem
              to={"/nav"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home size={20} />
              <NavText isCollapsed={isCollapsed}>Inicio</NavText>
            </NavItem>
            <NavItem to={"usuario"}>
              <User size={20} />
              <NavText isCollapsed={isCollapsed}>Usuarios</NavText>
            </NavItem>
            <NavItem
              to={"mapaCalor"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapIcon size={20} />
              <NavText isCollapsed={isCollapsed}>Mapa de calor</NavText>
            </NavItem>
            <NavItem
              to={"rutasRecoridas"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Route size={20} />
              <NavText isCollapsed={isCollapsed}>Rutas mas recoridas</NavText>
            </NavItem>
          </>
        ) : (
          <>
            {" "}
            <NavItem
              to={"/nav"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home size={20} />
              <NavText isCollapsed={isCollapsed}>Inicio</NavText>
            </NavItem>
          </>
        )}
      </nav>
      <Spacer />
      <LogoutButton
        onClick={handleSubmit}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LogOut
          size={20}
          style={{ marginRight: isCollapsed ? "0" : "0.75rem" }}
        />
        {!isCollapsed && "Cerrar Sesión"}
      </LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;
