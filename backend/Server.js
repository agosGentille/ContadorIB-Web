//require('dotenv').config();
const express = require("express");
//const sgMail = require('@sendgrid/mail');
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 5000;

//sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

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

// Ruta para enviar mail desde form contacto
app.post("/api/send-email", async (req, res) => {
  
  const { nombre, apellido, email, telefono, mensaje, tipoCliente, nombreEmpresa } = req.body;

  if (!nombre || !apellido || !email || !mensaje) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const mailOptions = {
      from: "Estudio Contable IB <admin.impuestos@contadorib.com.ar>",
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

    //await sgMail.send(mailOptions);
    await resend.emails.send(mailOptions);
    res.json({ success: true, message: "Correo enviado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al enviar el correo" });
    console.error("❌ Error enviando email:", error);
    console.error("❌ Error details:", error.response?.body || error.message);
  }
});

app.post("/api/planes/solicitud-plan", async (req, res) => {
  const { 
    nombre, 
    email, 
    telefono, 
    empresa, 
    plan, 
    tipoSociedad, 
    preferenciasContacto 
  } = req.body;

  if (!nombre || !email || !plan || !tipoSociedad) {
    return res.status(400).json({ 
      error: "Faltan campos obligatorios: nombre, email, plan y tipo de sociedad son requeridos" 
    });
  }

  try {
    const mailOptions = {
      from: "Estudio Contable IB <admin.impuestos@contadorib.com.ar>",
      to: "ivan.bellomo@contadorib.com.ar",
      subject: `Solicitud de Plan - ${plan} (${tipoSociedad})`,
      text: `Nueva solicitud de plan recibida desde el sitio web.

          ──────────────────────────────
          📋 Datos del remitente:
          ──────────────────────────────
          • Nombre: ${nombre}
          • Email: ${email}
          • Teléfono: ${telefono || "No proporcionado"}
          • Empresa: ${empresa || "No proporcionado"}
          • Tipo de Sociedad: ${tipoSociedad}
          • Plan Seleccionado: ${plan}

          ──────────────────────────────
          📞 Preferencias de contacto:
          ──────────────────────────────
          • WhatsApp: ${preferenciasContacto?.whatsapp ? "SÍ" : "No"}
          • Email: ${preferenciasContacto?.email ? "SÍ" : "No"}
          • Teléfono: ${preferenciasContacto?.telefono ? "SÍ" : "No"}

          ──────────────────────────────
          Este es un mensaje automático. 
          Por favor contactar al solicitante según sus preferencias indicadas.
          `,
      replyTo: email
    };

    //await sgMail.send(mailOptions);
    await resend.emails.send(mailOptions);
    res.json({ 
      success: true, 
      message: "Solicitud de plan enviada correctamente" 
    });
  } catch (error) {
    console.error("Error enviando email de plan:", error);
    console.error("Error details:", error.response?.body || error.message);
    res.status(500).json({ error: "Error al enviar la solicitud" });
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