import { ROUTES } from "@/types/enums/Routes";
import { useNavigate } from "react-router-dom";
import Back from "@assets/LoginBack.png";
import Logo from "@assets/LogoSistemas.png";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "@/hook/useUser";

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  const handleInicio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usuario && password) {
      try {
        const response = await fetch("http://127.0.0.1:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usuario, password }),
        });

        const result = await response.json();

        if (response.ok) {
          if (result.data) {
            toast.success("Inicio de sesión correcto");
            setUser(result.data);
            navigate(ROUTES.DASHBOARD);
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
    <div
      className="w-full h-full flex items-center justify-start bg-cover bg-center"
      style={{ backgroundImage: `url(${Back})` }}
    >
      <div className="w-full h-full p-8 flex flex-col space-y-8">
        <img src={Logo} alt="Logo" className="h-[10%] w-[200px]" />
        <div className="space-y-6 h-[70%] w-[600px] flex flex-col justify-center items-center">
          <div className="text-center m-5">
            <h2 className="text-5xl font-bold text-primary">Login</h2>
          </div>
          <form className="space-y-6 w-[70%]" onSubmit={handleInicio}>
            <div>
              <input
                id="usuario"
                name="usuario"
                type="text"
                autoComplete="usuario"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary100"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary100"
                placeholder="Contraseña"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary100 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Recuérdame
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-primary hover:border-b-2"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary100 focus:outline-none"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
