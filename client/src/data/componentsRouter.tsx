import { ROUTES } from "../types/enums/Routes";

export const ComponentsRouter: Record<
  ROUTES,
  {
    name: string;
    component: JSX.Element;
  }
> = {
  [ROUTES.LOGIN]: {
    name: "Login",
    component: <div>login</div>,
  },
  [ROUTES.DASHBOARD]: {
    name: "Dashboard",
    component: <div>Dashboard</div>,
  },
  [ROUTES.INICIO]: {
    name: "Dashboard Inicio",
    component: <div>Dashboard Inicio</div>,
  },
  [ROUTES.PROFILE]: {
    name: "Dashboard Profile",
    component: <div>Dashboard Profile</div>,
  },
};
