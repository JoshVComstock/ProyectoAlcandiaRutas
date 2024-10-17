import { Route, Routes } from "react-router-dom";
import Login from "./view/public";
import { ROUTES } from "./types/enums/Routes";
import Layout from "./view/private/_layout";
import Home from "./view/private/home/home";
import Usuario from "./view/private/usuario";
import { useUser } from "./hook/useUser";
const RoutesComponent = () => {
  const { user } = useUser();
  return (
    <main className="w-full h-screen bg-bg">
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.DASHBOARD} element={<Layout />}>
          {user?.nombre == "admin" ? (
            <Route path={ROUTES.USUARIO} element={<Usuario />} />
          ) : (
            <Route path={ROUTES.DASHBOARD} element={<Home />} />
          )}
        </Route>
      </Routes>
    </main>
  );
};

export default RoutesComponent;
