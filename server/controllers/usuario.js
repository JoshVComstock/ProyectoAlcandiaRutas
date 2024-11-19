import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/usuario", async (req, res) => {
  try {
    const usuario = await prisma.usuario.findMany({});
    res.json({
      data: usuario,
      message: "usuarios obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener usuario",
      error: error.message,
    });
  }
});

app.post("/usuario", async (req, res) => {
  try {
    const usuario = await prisma.usuario.create({
      data: req.body,
    });
    res.json({
      data: usuario,
      message: "usuario creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar usuario",
      error: error.message,
    });
  }
});
app.put("/usuario/:id", async (req, res) => {
  try {
    const usuario = await prisma.usuario.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      data: usuario,
      message: "usuario actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al editar usuario",
      error: error.message,
    });
  }
});
app.delete("/usuario/:id", async (req, res) => {
  try {
    const usuario = await prisma.usuario.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: usuario,
      message: "usuario eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar usuario",
      error: error.message,
    });
  }
});
app.get("/usuario/:id", async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: usuario,
      message: "usuario obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener usuario",
      error: error.message,
    });
  }
});

// Controlador para obtener el filtrado de usuario
app.get("/usuario/filtrado/:username", async (req, res) => {
  const username = req.params.username; // Nombre de usuario de la URL

  try {
    console.log("Buscando datos para el usuario:", username);

    // Cambiar a findFirst para buscar por el campo 'usuario'
    const result = await prisma.usuario.findFirst({
      where: { usuario: username }, // Filtrar por el campo 'usuario' (String)
      select: {
        nombre: true,
        UsuarioRuta: {
          select: {
            ruta: {
              select: {
                tipoCaminata: { select: { nombre: true } },
              },
            },
          },
        },
      },
    });

    // Si no se encuentra el usuario, devolver error 404
    if (!result) {
      console.log("Usuario no encontrado");
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    console.log("Datos obtenidos del usuario:", result);

    // Procesar las rutas del usuario
    const cantidadRutas = result.UsuarioRuta.reduce((acc, usuarioRuta) => {
      const tipoCaminata = usuarioRuta.ruta.tipoCaminata.nombre;
      acc[tipoCaminata] = (acc[tipoCaminata] || 0) + 1;
      return acc;
    }, {});

    const formattedResult = Object.entries(cantidadRutas).map(
      ([tipo_caminata, cantidad_rutas]) => ({ tipo_caminata, cantidad_rutas })
    );

    // Responder con los datos procesados
    res.json({
      usuario: result.nombre,
      rutas: formattedResult || [], // Asegurar que siempre sea un arreglo
    });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({
      message: "Error al obtener los datos",
      error: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  const { usuario, password } = req.body;

  const login = await prisma.usuario.findFirst({
    where: {
      usuario: usuario,
      password: password,
    },
    include: {
      UsuarioRuta: {
        include: {
          ruta: true,
        },
      },
    },
  });

  if (!login) {
    res.json({
      message: "Usuario no autorizado",
      error: "Usuario no autorizado",
    });
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const rutasHoy = login.UsuarioRuta.filter((usuarioRuta) => {
    const rutaFecha = new Date(usuarioRuta.ruta.fechaCreacion);
    rutaFecha.setHours(0, 0, 0, 0);
    return rutaFecha.getTime() === today.getTime();
  });

  const response = {
    nombre: login.nombre,
    idUsuario: login.id,
    usuario: login.usuario,
    contrasena: login.password, // Puedes eliminar esta línea si no deseas mostrar la contraseña
    rutas: rutasHoy.map((usuarioRuta) => ({
      id: usuarioRuta.ruta.id,
      start: usuarioRuta.ruta.start,
      middle: usuarioRuta.ruta.middle,
      end: usuarioRuta.ruta.end,
    })),
  };

  if (rutasHoy.length === 0) {
    res.json({
      message: "Hoy no tiene rutas asignadas",
      data: response,
    });
  } else {
    res.json({
      message: "Inicio de sesión correcto",
      data: response,
    });
  }
});


export default app;
