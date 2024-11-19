import express from "express";
import { PrismaClient } from "@prisma/client";
import ExcelJS from "exceljs";
import pdf from "pdfkit";

const router = express.Router();
const prisma = new PrismaClient();

const handleError = (error, res, message) => {
  console.error(`${message}:`, error);
  return res.status(500).json({
    message,
    error: error.message,
  });
};

router.get("/rutas", async (req, res) => {
  try {
    const { filter = "all" } = req.query;
    const whereClause = {};

    // Aplicar filtros basados en el parámetro `filter`
    if (filter === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Inicio del día
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1); // Fin del día actual

      whereClause.fechaCreacion = { gte: today, lt: tomorrow };
    } else if (filter === "lastWeek") {
      const today = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7); // Últimos 7 días

      whereClause.fechaCreacion = { gte: lastWeek, lt: today };
    } else if (filter === "lastMonth") {
      const today = new Date();
      const lastMonth = new Date();
      lastMonth.setMonth(today.getMonth() - 1); // Último mes

      whereClause.fechaCreacion = { gte: lastMonth, lt: today };
    }

    const rutas = await prisma.ruta.findMany({
      where: whereClause,
      include: {
        tipoCaminata: true,
        UsuarioRuta: {
          include: { usuario: { select: { nombre: true, usuario: true } } },
        },
      },
      orderBy: { fechaCreacion: "desc" },
    });

    if (!rutas.length) {
      return res.status(404).json({
        message: "No se encontraron rutas",
        data: [],
      });
    }

    const formattedRutas = rutas.map((ruta) => ({
      id: ruta.id,
      start: ruta.start,
      middle: ruta.middle,
      end: ruta.end,
      tipoCaminata: ruta.tipoCaminata.nombre,
      cantidadUsuarios: ruta.UsuarioRuta.length,
      fechaCreacion: ruta.fechaCreacion,
      usuarios: ruta.UsuarioRuta.map((ur) => ({
        nombre: ur.usuario.nombre,
        usuario: ur.usuario.usuario,
      })),
    }));

    return res.status(200).json({
      message: "Rutas obtenidas correctamente",
      data: formattedRutas,
    });
  } catch (error) {
    return handleError(error, res, "Error al obtener rutas");
  }
});

router.get("/report/excel", async (req, res) => {
  try {
    const { filter = "all" } = req.query;
    const whereClause = {};

    // Aplicar filtros basados en el parámetro `filter`
    if (filter === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      whereClause.fechaCreacion = { gte: today, lt: tomorrow };
    } else if (filter === "lastWeek") {
      const today = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);

      whereClause.fechaCreacion = { gte: lastWeek, lt: today };
    } else if (filter === "lastMonth") {
      const today = new Date();
      const lastMonth = new Date();
      lastMonth.setMonth(today.getMonth() - 1);

      whereClause.fechaCreacion = { gte: lastMonth, lt: today };
    }

    const rutas = await prisma.ruta.findMany({
      where: whereClause,
      include: {
        tipoCaminata: true,
        UsuarioRuta: {
          include: { usuario: true },
        },
      },
      orderBy: { fechaCreacion: "desc" },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Reporte de Rutas");

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Inicio", key: "inicio", width: 25 },
      { header: "Medio", key: "medio", width: 25 },
      { header: "Final", key: "final", width: 25 },
      { header: "Tipo Caminata", key: "tipo", width: 20 },
      { header: "Usuarios", key: "usuarios", width: 15 },
      { header: "Fecha", key: "fecha", width: 20 },
    ];

    // Estilo para encabezado
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFF" }, size: 12 };
    headerRow.alignment = { vertical: "middle", horizontal: "center" };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4F81BD" },
    };

    // Datos de rutas
    rutas.forEach((ruta, index) => {
      const row = worksheet.addRow({
        id: ruta.id,
        inicio: ruta.start.join(", "),
        medio: ruta.middle.join(", "),
        final: ruta.end.join(", "),
        tipo: ruta.tipoCaminata.nombre,
        usuarios: ruta.UsuarioRuta.length,
        fecha: new Date(ruta.fechaCreacion).toLocaleDateString("es-ES"),
      });

      // Estilo condicional para filas alternas
      if (index % 2 === 0) {
        row.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "D9E1F2" },
        };
      }
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Reporte_Rutas_${new Date()
        .toISOString()
        .split("T")[0]}.xlsx`
    );

    await workbook.xlsx.write(res);
    return res.end();
  } catch (error) {
    return handleError(error, res, "Error al generar reporte Excel");
  }
});

router.get("/report/pdf", async (req, res) => {
  try {
    const { filter = "all" } = req.query;
    const whereClause = {};

    if (filter === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      whereClause.fechaCreacion = { gte: today, lt: tomorrow };
    } else if (filter === "lastWeek") {
      const today = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);

      whereClause.fechaCreacion = { gte: lastWeek, lt: today };
    } else if (filter === "lastMonth") {
      const today = new Date();
      const lastMonth = new Date();
      lastMonth.setMonth(today.getMonth() - 1);

      whereClause.fechaCreacion = { gte: lastMonth, lt: today };
    }

    const rutas = await prisma.ruta.findMany({
      where: whereClause,
      include: {
        tipoCaminata: true,
        UsuarioRuta: {
          include: { usuario: true },
        },
      },
      orderBy: { fechaCreacion: "desc" },
    });

    const doc = new pdf();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Reporte_Rutas_${new Date()
        .toISOString()
        .split("T")[0]}.pdf`
    );

    doc.pipe(res);

    // Título del reporte
    doc.fontSize(18)
      .fillColor("white")
      .text("Reporte de Rutas", { align: "center", continued: false })
      .rect(50, 15, 500, 30)
      .fill("blue")
      .stroke();

    doc.moveDown(2);

    // Detalle de rutas
    rutas.forEach((ruta) => {
      doc.fontSize(12).fillColor("black");
      doc.text(`ID: ${ruta.id}`);
      doc.text(`Inicio: ${ruta.start.join(", ")}`);
      doc.text(`Medio: ${ruta.middle.join(", ")}`);
      doc.text(`Final: ${ruta.end.join(", ")}`);
      doc.text(`Tipo Caminata: ${ruta.tipoCaminata.nombre}`);
      doc.text(`Usuarios: ${ruta.UsuarioRuta.length}`);
      doc.text(
        `Fecha: ${new Date(ruta.fechaCreacion).toLocaleDateString("es-ES")}`
      );
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    return handleError(error, res, "Error al generar reporte PDF");
  }
});

export default router;
