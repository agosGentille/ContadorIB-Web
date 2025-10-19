require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors()); // permite que React haga peticiones
app.use(bodyParser.json());

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // tu clave de Google Cloud
const PLACE_ID = process.env.PLACE_ID; // el place_id de tu negocio

const planesRoutes = require("./Routes/PlanesRoutes.js");
const pregRoutes = require("./Routes/PreguntasRoutes.js");

app.use('/api/planes', planesRoutes);
app.use('/api/PreguntasFrecuentes', pregRoutes);
app.use(express.static(path.join(__dirname, 'public')));

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
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: "ibellomoyasoc@gmail.com",       
      to: "ivan.bellomo@contadorib.com.ar",   // destinatario final
      subject: `Formulario de contacto - Estudio Contable IB`, //asunto
      text: `Se completó el Formulario de Contacto desde la página web del Estudio Contable IB.\n\nDatos de contacto recibidos:\n\nNombre: ${nombre}\nApellido: ${apellido}\nCorreo: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`,
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

//para obtener opiniones de google
app.get('/api/reviews', async (req, res) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews&key=${GOOGLE_API_KEY}`;
    const response = await axios.get(url);
    const allReviews = response.data.result.reviews || [];

    // Filtrar solo reseñas con 5 estrellas y tomar las 10 más recientes
    const topReviews = allReviews
      .filter(r => r.rating === 5)
      .slice(0, 10);

    res.json(topReviews);
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({ error: 'Error al obtener reseñas' });
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