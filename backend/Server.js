//require('dotenv').config();
const express = require("express");
//const sgMail = require('@sendgrid/mail');
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { Resend } = require("resend");
const twilio = require("twilio");

const app = express();
const PORT = process.env.PORT || 5000;

//sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const WHATSAPP_NUMBERS = [
  "whatsapp:+5491121741245",
  "whatsapp:+5491131214776"
];

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

  let emailEnviado = false;
  let whatsappEnviado = false;
  const errores = [];

  try {
    // 1. Intentar enviar email
    const mailOptions = {
      from: "Estudio Contable IB <admin.impuestos@contadorib.com.ar>",
      to: "ivan.bellomo@contadorib.com.ar",
      subject: `Formulario de contacto - Estudio Contable IB`,
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
    };

    await resend.emails.send(mailOptions);
    emailEnviado = true;
    console.log("✅ Email enviado correctamente");
  } catch (error) {
    console.error("❌ Error enviando email:", error.message);
  }

  try {
    // 2. Intentar enviar WhatsApp (independientemente del resultado del email)
    console.log("Enviando WhatsApp a números:", WHATSAPP_NUMBERS);
    
    const mensajeWhatsApp = `📩 Nuevo contacto desde la web
            Nombre: ${nombre} ${apellido}
            Email: ${email}
            Tel: ${telefono || "No especificado"}
            Tipo: ${tipoCliente || "No especificado"}
            Empresa: ${nombreEmpresa || "-"}
            Mensaje:
            ${mensaje}`;

    for (const numero of WHATSAPP_NUMBERS) {
      try {
        console.log(`Enviando a: ${numero}`);
        const message = await client.messages.create({
          from: "whatsapp:+14155238886",
          to: numero,
          body: mensajeWhatsApp
        });
        console.log(`✅ WhatsApp enviado a ${numero}: SID ${message.sid}`);
        whatsappEnviado = true;
      } catch (error) {
        console.error(`Error enviando WhatsApp a ${numero}:`, error.message);
      }
    }
  } catch (error) {
    console.error("Error en proceso de WhatsApp:", error.message);
  }

  // 3. Responder al cliente
  if (emailEnviado || whatsappEnviado) {
    res.json({
      success: true,
      message: "Mensaje procesado",
      detalles: {
        email: emailEnviado ? "enviado" : "falló",
        whatsapp: whatsappEnviado ? "enviado" : "falló",
        errores: errores.length > 0 ? errores : undefined
      }
    });
  } else {
    res.status(500).json({
      error: "No se pudo enviar el mensaje",
      detalles: errores
    });
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
      message: "Solicitud enviada correctamente" 
    });
  } catch (error) {
    console.error("Error enviando email de plan:", error);
    console.error("Error details:", error.response?.body || error.message);
    res.status(500).json({ error: "Error al enviar la solicitud" });
  }

  try {
    // 2. Intentar enviar WhatsApp (independientemente del resultado del email)
    const mensajeWhatsApp = `📋 SOLICITUD DE NUEVO PLAN
          👤 Cliente: ${nombre}
          📧 Email: ${email}
          📞 Teléfono: ${telefono || "No proporcionado"}
          🏢 Empresa: ${empresa || "No proporcionado"}

          📊 Detalles del plan:
          • Tipo de Sociedad: ${tipoSociedad}
          • Plan Seleccionado: ${plan}

          Preferencias de contacto:
          ${preferenciasContacto?.whatsapp ? '✓ WhatsApp' : '✗ WhatsApp'}
          ${preferenciasContacto?.email ? '✓ Email' : '✗ Email'}
          ${preferenciasContacto?.telefono ? '✓ Teléfono' : '✗ Teléfono'}

          ──────────────────────────────
          Enviado desde: Solicitud de plan`;

    for (const numero of WHATSAPP_NUMBERS) {
      try {
        console.log(`Enviando WhatsApp de plan a: ${numero}`);
        const message = await client.messages.create({
          from: "whatsapp:+14155238886",
          to: numero,
          body: mensajeWhatsApp
        });
        console.log(`✅ WhatsApp de plan enviado a ${numero}: SID ${message.sid}`);
        whatsappEnviado = true;
      } catch (error) {
        console.error(`❌ Error enviando WhatsApp de plan a ${numero}:`, error.message);
      }
    }
  } catch (error) {
    console.error("❌ Error en proceso de WhatsApp para plan:", error.message);
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