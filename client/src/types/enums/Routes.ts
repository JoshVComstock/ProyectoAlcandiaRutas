export enum ROUTES {
  LOGIN = "/",
  DASHBOARD = "/dashboard",
  INVENTORY ="/inventory",

  INICIO = ROUTES.DASHBOARD + "/inicio",
  PROFILE = ROUTES.DASHBOARD + "/profile",
  //  Message
  MESSAGE = ROUTES.DASHBOARD + "/message",

  //Product
  PRODUCTO = ROUTES.DASHBOARD + "/producto",
  PRODUCTO_MOVIMIENTO = ROUTES.DASHBOARD + "/producto" + "/movimiento",
  PRODUCTO_CATEGORIA = ROUTES.PRODUCTO + "/categoria",
  //inventari
  INVENTORY_PRODUCT = ROUTES.DASHBOARD + INVENTORY + "/product",
  INVENTORY_OPERATIONES = ROUTES.DASHBOARD + INVENTORY + "/operationes",
  INVENTORY_REPORT = ROUTES.DASHBOARD + INVENTORY + "/report",
  INVENTORY_CONFIG = ROUTES.DASHBOARD + INVENTORY + "/config",
}
