import { Route, Routes } from "react-router-dom";
import Login from "./view/public";
import { ROUTES } from "./types/enums/Routes";
import Layout from "./view/private/_layout";
import Home from "./view/private/home/home";
import Message from "./view/private/message";
import Productos from "./view/private/productos";
import Operationes from "./view/private/inventory/operationes";
import Report from "./view/private/inventory/report";
import Config from "./view/private/inventory/config";

const RoutesComponent = () => {
  return (
    <main className="w-full h-screen bg-bg">
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.DASHBOARD} element={<Layout />}>
          <Route path={ROUTES.DASHBOARD} element={<Home />} />
          <Route path={ROUTES.MESSAGE} element={<Message />} />
          <Route path={ROUTES.PRODUCTO} element={<Productos />} />
          <Route path={ROUTES.INVENTORY_PRODUCT} element={<Productos />} />
          <Route
            path={ROUTES.INVENTORY_OPERATIONES}
            element={<Operationes />}
          />
          <Route path={ROUTES.INVENTORY_REPORT} element={<Report />} />
          <Route path={ROUTES.INVENTORY_CONFIG} element={<Config />} />
        </Route>
      </Routes>
    </main>
  );
};

export default RoutesComponent;
