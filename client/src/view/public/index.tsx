import { ROUTES } from "@/types/enums/Routes";
import { useNavigate } from "react-router-dom";
import Back from "@assets/LoginBack.png";
import Logo from "@assets/LogoSistemas.png";
const Login = () => {
  const navigate = useNavigate();

  const handleInicio = () => {
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div
      className="w-full h-full flex items-center justify-start bg-cover bg-center"
      style={{ backgroundImage: `url(${Back})` }}
    >
      <div className="w-full h-full p-8 flex flex-col space-y-8 ">
        <img src={Logo} alt="Logo" className="h-[10%] w-[200px]" />
        <div className="space-y-6 h-[70%] w-[600px] flex flex-col justify-center items-center ">
          <div className="text-center m-5">
            <h2 className="text-5xl font-bold text-primary">Login</h2>
          </div>
          <form className="space-y-6 w-[70%] ">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary100"
                placeholder="Usuario"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
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
                  Recuerdame
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-primary hover:border-b-2"
                >
                  Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary100 focus:outline-none"
                onClick={handleInicio}
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
