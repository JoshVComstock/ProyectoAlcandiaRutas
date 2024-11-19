import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./sidebar"; 

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 2rem;
  background-color: #f9fafb;
  transition: margin-left 0.3s ease;
`;

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    navigate("/login");
  };

  return (
    <LayoutContainer>
      <Sidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        onNavigate={handleNavigation}
        onLogout={handleLogout}
      />
      <MainContent sidebarCollapsed={sidebarCollapsed}>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
