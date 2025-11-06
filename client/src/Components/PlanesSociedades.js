import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { validarEmail } from "../Utils/ValidarEmail";
import { API_BASE_URL } from '../Config/api';

export default function PlanesEmpresas() {
  const [tipo, setTipo] = useState("SAS");
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    plan: "",
    contactoWhatsapp: false,
    contactoEmail: false,
    contactoTelefono: false,
    tipoSociedad: "SAS"
  });

  const planes = {
    SAS: [
      {
        nombre: "Plan Base SAS",
        desc: "Constitución de SAS + alta de impuestos con punto de venta habilitado para facturar.",
        precio: "$950.000",
      },
      {
        nombre: "Plan Completo SAS",
        desc: "Incluye todo el Plan Base + desarrollo de una web estática personalizada.",
        precio: "$ - A Consultar",
      },
    ],
    SRL: [
      {
        nombre: "Plan Base SRL",
        desc: "Constitución de SRL + alta de impuestos con punto de venta habilitado para facturar.",
        precio: "$1.500.000",
      },
      {
        nombre: "Plan Completo SRL",
        desc: "Incluye todo el Plan Base + desarrollo de una web estática personalizada.",
        precio: "$ - A Consultar",
      },
    ],
  };

  const [errors, setErrors] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTipoChange = (nuevoTipo) => {
    setTipo(nuevoTipo);
    setFormData(prev => ({
      ...prev,
      tipoSociedad: nuevoTipo
    }));
  };

  const handlePlanSelect = (planNombre) => {
    setFormData(prev => ({
      ...prev,
      plan: planNombre
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setEnviando(true);

    console.log("🔍 DEBUG - Validando formulario:", {
    nombre: formData.nombre,
    email: formData.email,
    plan: formData.plan,
    empresa: formData.empresa
  });

    if (!formData.nombre || !formData.email || !formData.plan || !formData.empresa) {
      setErrors("Por favor completá todos los campos obligatorios.");
      setEnviando(false);
      return;
    }

    const { valido, error: errorEmail } = validarEmail(formData.email);
    if (!valido) {
      setErrors(errorEmail);
      setEnviando(false);
      return;
    }

    const datosEnvio = {
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono || "No proporcionado",
      empresa: formData.empresa,
      plan: formData.plan,
      tipoSociedad: formData.tipoSociedad,
      preferenciasContacto: {
        whatsapp: formData.contactoWhatsapp,
        email: formData.contactoEmail,
        telefono: formData.contactoTelefono
      },
      mensaje: `Solicitud de información para el plan: ${formData.plan} - ${formData.tipoSociedad}`,
      asunto: `Nueva solicitud - ${formData.plan}`
    };

    try {
      const url = `${API_BASE_URL}/planes/solicitud-plan`;
      console.log("Enviando datos a:", url);

      const res = await fetch(url, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(datosEnvio)
      });

      const data = await res.json();

      if (data.success) {
        alert("¡Tu solicitud fue enviada correctamente! En breve nos contactaremos.");
        // Resetear formulario
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          empresa: "",
          plan: "",
          contactoWhatsapp: false,
          contactoEmail: false,
          contactoTelefono: false,
          tipoSociedad: "SAS"
        });
        setTipo("SAS");
      } else {
        setErrors(data.error || "Error al enviar la solicitud. Por favor intentá nuevamente.");
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      setErrors("Error de conexión con el servidor. Por favor intentá nuevamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="seccion-planes-sociedades" id="Sociedades">
      <h3 className="titulo-seccion">Constitución de Sociedades</h3>
      <p className="subtitulo-seccion">
        Iniciá tu empresa con asesoramiento integral: elegí entre SAS o SRL, y sumá presencia digital con tu propia web.
      </p>

      {/* Selector SAS / SRL */}
      <div className="selector-sociedades">
        {["SAS", "SRL"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTipoChange(t)}
            className={`boton-selector ${tipo === t ? "activo" : "inactivo"}`}
          >
            {t}
          </button>
        ))}
      </div>

       <AnimatePresence mode="wait">
        <motion.div
          key={tipo}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="contenedor-planes"
        >
          {planes[tipo].map((p) => (
            <motion.div
              key={p.nombre}
              whileHover={{ scale: 1.03 }}
              className={`tarjeta-plan ${
                formData.plan === p.nombre ? "seleccionada" : ""
              }`}
              onClick={() => handlePlanSelect(p.nombre)}
            >
              <h4 className="nombre-plan">{p.nombre}</h4>
              <p className="descripcion-plan">{p.desc}</p>
              <p className="precio-plan">{p.precio}</p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="formulario-contacto">
        <h4 className="titulo-formulario">
          Completá tus datos y nos pondremos en contacto
        </h4>

        {/* Mensaje de error */}
        {errors && (
          <div className="mensaje-error">
            {errors}
          </div>
        )}

        <div className="grupo-formulario">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="campo-formulario"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            className="campo-formulario"
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono (opcional)"
            value={formData.telefono}
            onChange={handleChange}
            className="campo-formulario"
          />
          <input
            type="text"
            name="empresa"
            placeholder={`Nombre de la ${tipo}`}
            value={formData.empresa}
            onChange={handleChange}
            className="campo-formulario"
            required
          />

          <div className="grupo-checkbox">
            <label className="etiqueta-checkbox">Prefiero que me contacten por:</label>
            <div className="opciones-contacto">
              <label className="opcion-contacto">
                <input
                  type="checkbox"
                  name="contactoWhatsapp"
                  checked={formData.contactoWhatsapp}
                  onChange={handleChange}
                  className="checkbox-input"
                  disabled={enviando}
                />
                <span className="checkbox-personalizado"></span>
                WhatsApp
              </label>
              <label className="opcion-contacto">
                <input
                  type="checkbox"
                  name="contactoEmail"
                  checked={formData.contactoEmail}
                  onChange={handleChange}
                  className="checkbox-input"
                  disabled={enviando}
                />
                <span className="checkbox-personalizado"></span>
                Email
              </label>
              <label className="opcion-contacto">
                <input
                  type="checkbox"
                  name="contactoTelefono"
                  checked={formData.contactoTelefono}
                  onChange={handleChange}
                  className="checkbox-input"
                  disabled={enviando}
                />
                <span className="checkbox-personalizado"></span>
                Teléfono
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={!formData.plan || enviando}
            className={`boton-enviar ${formData.plan && !enviando ? "activo" : "inactivo"}`}
          >
            {enviando ? "Enviando..." : "Quiero suscribirme a este plan"}
          </button>

          {!formData.plan && (
            <p className="mensaje-ayuda">Seleccioná un plan para continuar</p>
          )}
        </div>
      </form>
    </section>
  );
}