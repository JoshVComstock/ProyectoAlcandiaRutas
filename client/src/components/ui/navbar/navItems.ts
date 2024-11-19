import { ROUTES } from "@/types/enums/Routes";
import { IconHome, IconMessage, IconBox, IconMoney, IconShop, IconPencil,IconProduct, IconBoxProduc, IconChartReport, IconDirectional, IconGear } from "../icons";
export interface NavItem {
  path: ROUTES;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children?: NavItem[];
}

export const mainNavItems:NavItem[] = [
  
 
];
export const secondaryNavItems = [
  {
    
  },
  /* { path: ROUTES.PROFILE, label: "Inventario", icon: IconBox },
  { path: ROUTES.PROFILE, label: "Finanzas", icon: IconMoney },
  { path: ROUTES.PROFILE, label: "Ventas", icon: IconShop },
  { path: ROUTES.PROFILE, label: "Documentos", icon: IconPencil },
]; */
];
