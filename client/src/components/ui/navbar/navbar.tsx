import { Home, CarTaxiFront, Bus, Car, Truck, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/types/enums/Routes";
import toast from "react-hot-toast";
import { useUser } from "@/hook/useUser";
const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const navItems = [
    { icon: Home, label: "Caminar", color: "bg-green-500" },
    { icon: CarTaxiFront, label: "Taxi", color: "bg-yellow-500" },
    { icon: Bus, label: "Micro", color: "bg-blue-500" },
    { icon: Car, label: "Auto propio", color: "bg-red-500" },
    { icon: Truck, label: "Trufi", color: "bg-purple-500" },
  ];

  const handleLogout = () => {
    navigate(ROUTES.LOGIN);
    toast.success("Sesión cerrada correctamente!");
  };

  return (
    <div className="z-10 h-screen font-sans antialiased bg-gray-100 dark:bg-gray-100 dark:text-gray-100">
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition-all duration-300 ease-in-out transform bg-white shadow-lg dark:bg-gray-800 translate-x-0
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold">Menu</h2>
        </div>
        <nav className="p-4 ">
          {navItems.map((item, index) => (
            <a
              key={index}
              className={`flex items-center px-4 py-3 mb-2 transition-all duration-200 ease-in-out rounded-lg ${item.color} bg-opacity-10 hover:bg-opacity-20 group`}
            >
              <item.icon
                className={`w-6 h-6 mr-3 ${item.color.replace("bg-", "text-")}`}
              />
              <span
                className={`text-sm font-medium ${item.color.replace(
                  "bg-",
                  "text-"
                )}`}
              >
                {item.label}
              </span>
            </a>
          ))}
          {user?.usuario == "admin" ? (
            <>
              <Link to={ROUTES.USUARIO}>Usuarios</Link>
            </>
          ) : (
            <></>
          )}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t dark:border-gray-700">
          <button
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
