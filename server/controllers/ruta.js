import express from "express";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

const getStreetFromCoordinates = async (lat, long) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
    );
    const address = response.data?.address?.road || "Unknown"; // Obtener el nombre de la calle
    return address;
  } catch (error) {
    console.error("Error al obtener el nombre de la calle:", error);
    return "Unknown";
  }
};

app.get("/rutaRecoridas", async (req, res) => {
  try {
    // Obtener usuarios con sus rutas
    const usuarios = await prisma.usuario.findMany({
      include: {
        UsuarioRuta: {
          include: {
            ruta: true, // Incluir la relación de ruta
          },
        },
      },
    });

    const streetCount = {};

    const usuariosConRutas = await Promise.all(
      usuarios.map(async (usuario) => {
        const rutasConCalles = await Promise.all(
          usuario.UsuarioRuta.map(async (usuarioRuta) => {
            const { start, middle, end } = usuarioRuta.ruta;

            const startStreet = await getStreetFromCoordinates(
              start[0],
              start[1]
            );
            const middleStreet = await getStreetFromCoordinates(
              middle[0],
              middle[1]
            );
            const endStreet = await getStreetFromCoordinates(end[0], end[1]);

            [startStreet, middleStreet, endStreet].forEach((street) => {
              streetCount[street] = (streetCount[street] || 0) + 1;
            });
          })
        );
      })
    );

    const mostWalkedStreets = Object.entries(streetCount)
      .map(([street, count]) => ({ street, count }))
      .sort((a, b) => b.count - a.count);

    res.json({
      data: mostWalkedStreets,
      message: "Usuarios y rutas obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener usuarios y rutas",
      error: error.message,
    });
  }
});

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
app.post("/tipoCaminata", async (req, res) => {
  try {
    const camata = await prisma.tipoCaminata.create({
      data: req.body,
    });
    res.json({
      data: camata,
      message: "Tipo caminata creada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener tipo caminata",
      error: error.message,
    });
  }
});

app.post("/usuarioRuta", async (req, res) => {
  try {
    const { idUsuario, rutas } = req.body;
    const usuario = await prisma.usuario.findUnique({
      where: { id: idUsuario },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const rutasCreadas = await Promise.all(
      rutas.map(async (ruta) => {
        const nuevaRuta = await prisma.ruta.create({
          data: {
            start: ruta.start,
            middle: ruta.middle,
            end: ruta.end,
            idTipoCaminata: ruta.IdTipoCaminata,
            fechaCreacion: new Date(),
            FechaModificacion: new Date(),
          },
        });

        await prisma.usuarioRuta.create({
          data: {
            idUsuario: idUsuario,
            IdRuta: nuevaRuta.id,
          },
        });

        return nuevaRuta;
      })
    );

    res
      .status(201)
      .json({ message: "Rutas creadas con éxito", rutas: rutasCreadas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear las rutas" });
  }
});

// Controlador para obtener rutas filtradas por tipo de caminata
app.get("/ruta/filtradas/:tipoCaminata", async (req, res) => {
  const tipoCaminata = req.params.tipoCaminata; // Obtiene el tipo de caminata desde la URL

  try {
    console.log("Buscando rutas para el tipo de caminata:", tipoCaminata);

    // Consulta las rutas filtradas por el tipo de caminata
    const result = await prisma.tipoCaminata.findFirst({
      where: { nombre: tipoCaminata },
      select: {
        nombre: true,
        Ruta: {
          select: {
            id: true,
            start: true,
            middle: true,
            end: true,
            UsuarioRuta: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: `Tipo de caminata '${tipoCaminata}' no encontrado` });
    }

    // Procesar las rutas para incluir el conteo de usuarios
    const rutas = result.Ruta.map((ruta) => ({
      RutaID: ruta.id,
      Inicio: ruta.start,
      PuntoMedio: ruta.middle,
      Fin: ruta.end,
      CantidadUsuarios: ruta.UsuarioRuta.length, // Conteo de usuarios asociados a la ruta
    }));

    res.json({
      Tipo: result.nombre,
      Rutas: rutas,
    });
  } catch (error) {
    console.error("Error al obtener las rutas:", error);
    res.status(500).json({
      message: "Error al obtener las rutas",
      error: error.message,
    });
  }
});

//controlador de filtrado por fecha 
app.get("/ruta/filtradas-fecha", async (req, res) => {
  const { fechaInicio, fechaFin } = req.query; // Fechas pasadas como parámetros

  try {
    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({ message: "Debe proporcionar fechaInicio y fechaFin" });
    }

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    const rutas = await prisma.usuarioRuta.findMany({
      where: {
        fechaTransito: {
          gte: inicio,
          lte: fin,
        },
      },
      include: {
        ruta: true, // Incluye detalles de las rutas
        usuario: true, // Incluye información del usuario
      },
    });

    // Contar la cantidad de usuarios que pasaron por cada ruta
    const conteoCalles = rutas.reduce((acc, usuarioRuta) => {
      const { start, middle, end } = usuarioRuta.ruta;

      [start, middle, end].forEach((calle) => {
        const key = calle.join(", "); // Convertir coordenadas a string
        acc[key] = (acc[key] || 0) + 1; // Incrementar el conteo
      });

      return acc;
    }, {});

    const resultado = Object.entries(conteoCalles).map(([calle, cantidad]) => ({
      calle,
      cantidad,
    }));

    res.json({
      message: "Rutas filtradas correctamente",
      data: resultado,
    });
  } catch (error) {
    console.error("Error al filtrar rutas por fecha:", error);
    res.status(500).json({
      message: "Error al obtener rutas filtradas",
      error: error.message,
    });
  }
});




export default app;
 