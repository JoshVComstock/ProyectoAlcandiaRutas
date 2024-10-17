import React, { useState } from "react";
import { User, Map, Route, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/types/enums/Routes";
import toast from "react-hot-toast";

const NavAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const handleLogout = () => {
    navigate(ROUTES.LOGIN);
    toast.success("Sesión cerrada correctamente!");
  };

  const menuItems = [
    { icon: User, label: "Usuario", color: "#6200ff", path: "usuario" },
    { icon: Map, label: "Mapa de Calor", color: "#0061cf", path: "mapaCalor" },
    {
      icon: Route,
      label: "Rutas más Caminadas",
      color: "#9747ff",
      path: "rutasCaminadas",
    },
  ];

  return (
    <div
      className={`h-screen bg-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          <h2
            className={`text-primary font-bold ${isOpen ? "block" : "hidden"}`}
          >
            Admin Panel
          </h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary hover:bg-primary100 rounded-full p-2 transition-colors duration-200"
          >
            {isOpen ? "←" : "→"}
          </button>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2 p-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item?.path}
                  className="flex items-center p-2 rounded-lg hover:bg-primary100 transition-colors duration-200"
               
                >
                  <item.icon
                    className="w-6 h-6"
                    style={{ color: item.color }}
                  />
                  <span
                    className={`ml-3 ${isOpen ? "block" : "hidden"}`}
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <li>
            <Link
              to=""
              className="flex items-center p-2 rounded-lg hover:bg-primary100 transition-colors duration-200"
              onClick={handleLogout}
            >
              <LogOut className="w-6 h-6" style={{ color: "#9747ff" }} />
              <span
                className={`ml-3 ${isOpen ? "block" : "hidden"}`}
                style={{ color: "#9747ff" }}
              >
                Cerrar sesion
              </span>
            </Link>
          </li>
        </nav>
        <div className="p-4">
          <div
            className={`bg-secundary100 rounded-lg p-3 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <p className="text-secundary text-sm">¿Necesitas ayuda?</p>
            <a href="#" className="text-primary font-bold text-sm">
              Contacta soporte
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavAdmin;
