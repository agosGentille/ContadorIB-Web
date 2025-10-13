const nodemailer = require("nodemailer");
async function testMail() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ibellomoyasoc@gmail.com",
      pass: "bmms kpef ptwi eura"
    }
  });

  let info = await transporter.sendMail({
    from: "ibellomoyasoc@gmail.com",
    to: "ivan.bellomo@contadorib.com.ar",
    subject: "Prueba Nodemailer",
    text: "Hola, este es un test, si ves esto no te preocupes, es Agos Gentille"
  });

  console.log("Mensaje enviado:", info.messageId);
}

testMail().catch(console.error);