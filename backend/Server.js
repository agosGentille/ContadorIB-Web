require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors()); // permite que React haga peticiones
app.use(bodyParser.json());

// Ruta para enviar mail
app.post("/send-email", async (req, res) => {
  const { nombre, apellido, email, telefono, mensaje } = req.body;

  if (!nombre || !apellido || !email || !mensaje) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    // Configura tu transportador SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ibellomoyasoc@gmail.com", // el correo que envia el msj
        pass: "bmms kpef ptwi eura"      // contraseña que genera google para la app
      }
    });

    const mailOptions = {
      from: "ibellomoyasoc@gmail.com",        // remitente real
      to: "ivan.bellomo@contadorib.com.ar",   // destinatario final
      subject: `Formulario de contacto - Estudio Contable IB`,
      text: `Se acaba de completar el formulario de contacto desde la página web del Estudio Contable IB.\n\nDatos de contacto recibidos:\n\nNombre: ${nombre}\nApellido: ${apellido}\nCorreo: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`,
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

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));