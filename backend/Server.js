require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://contador-ib-web.vercel.app",
    "https://contadorib.com.ar",
    "https://www.contadorib.com.ar"
  ],
  credentials: true
})); // permite que React haga peticiones

app.use(bodyParser.json());

const planesRoutes = require("./Routes/PlanesRoutes.js");
const pregRoutes = require("./Routes/PreguntasRoutes.js");

app.use('/api/planes', planesRoutes);
app.use('/api/PreguntasFrecuentes', pregRoutes);
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para enviar mail
app.post("/send-email", async (req, res) => {
  console.log("✅ Ruta /api/send-email alcanzada");
  const { nombre, apellido, email, telefono, mensaje, tipoCliente, nombreEmpresa } = req.body;

  if (!nombre || !apellido || !email || !mensaje) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    // Configura tu transportador SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: "ibellomoyasoc@gmail.com",       
      to: "ivan.bellomo@contadorib.com.ar",   // destinatario final
      subject: `Formulario de contacto - Estudio Contable IB`, //asunto
      text: `Estimado equipo del Estudio Contable IB,
        Se ha recibido un nuevo mensaje a través del formulario de contacto del sitio web.

        ──────────────────────────────
        📋 Datos del remitente:
        ──────────────────────────────
        Nombre: ${nombre} ${apellido}
        Correo electrónico: ${email}
        Teléfono: ${telefono || "No especificado"}
        Tipo de cliente: ${tipoCliente || "No especificado"}
        ${tipoCliente === "empresa" ? `Nombre de la empresa: ${nombreEmpresa}` : ""}

        ──────────────────────────────
        📝 Mensaje:
        ──────────────────────────────
        ${mensaje}

        ──────────────────────────────
        Este correo fue generado automáticamente. 
        Por favor, responda directamente a este mensaje para contactar al remitente.
        `,
      replyTo: email 
      // cuando se responda desde ivan.bellomo@contadorib.com.ar, le va a llegar al mail del 
      // usuario que completó el formulario
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Correo enviado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al enviar el correo" });
  }
});

// 200
app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a la Página Web del Estudio Contable IB!");
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: `Ruta: ${req.originalUrl} - no encontrada` });
});
// 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno" });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));