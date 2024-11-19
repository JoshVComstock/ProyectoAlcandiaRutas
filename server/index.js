import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import reportController from "./controllers/reportController.js";
import usuario from "./controllers/usuario.js";
import ruta from "./controllers/ruta.js";
import tipoCaminata from "./controllers/tipocaminata.js";

// Inicializar app
const app = express();
const port = 3000;

// Middleware para habilitar CORS
app.use(cors({ origin: "*" }));

// Middleware para procesar datos en formato JSON y URL encoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de rutas
app.use("/api", reportController);
app.use(tipoCaminata);
app.use(usuario);
app.use(ruta);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
