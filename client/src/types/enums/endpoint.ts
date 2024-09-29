export enum AUTH {
  BASE = "auth",
  LOGIN = AUTH.BASE + "/login",
  ME = AUTH.BASE + "/me",
  UPDATEUSERDATA = AUTH.BASE + "/user",
  UPDATEPASSWORD = AUTH.BASE + "/password",
}
export enum PRODUCTO {
  BASE = "producto",
  GET = PRODUCTO.BASE,
  POST = PRODUCTO.BASE,
  PUT = PRODUCTO.BASE + "/",
  DELETE = PRODUCTO.BASE + "/",
}

export const ENDPOINTS = {
  //Las rutas
};
