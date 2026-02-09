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
  const [planDetallado, setPlanDetallado] = useState(null);
  const [errors, setErrors] = useState("");
  const [enviando, setEnviando] = useState(false);

  const planes = {
    SAS: [
      {
        nombre: "Plan Base SAS",
        desc: "Constitución de SAS + alta de impuestos con punto de venta habilitado para facturar.",
        precio: "$950.000",
      },
      {
        nombre: "Plan Completo SAS",
        desc: "Incluye todo el Plan Base + presencia digital profesional a medida de tu empresa.",
        detallesWeb: [
          "Diseño exclusivo desarrollado desde cero, sin plantillas",
          "Modo claro/oscuro incluido",
          "Optimizado para celulares, tablets y computadoras",
          "Formularios configurados según tus necesidades",
          "Sitio web publicado con tu dominio personalizado",
          "Certificado SSL de seguridad profesional",
          "Entrega en 10-15 días hábiles con seguimiento parcial",
          "1 ronda de revisiones y ajustes incluida sin costo adicional",
          "Soporte técnico post-entrega por 15 días",
          "Mantenimiento mensual disponible (consultar costos)"
        ],
        precio: "Hasta $1.260.000",
        notaPrecio: "Incluye desarrollo web personalizado - Cotización sin cargo",
        rangosPrecio: [
          "Landing page (3 secciones): $185.000",
          "SPA (5 páginas): $220.000", 
          "Sitio completo (8 páginas): $310.000"
        ],
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
        desc: "Incluye todo el Plan Base + presencia digital profesional a medida de tu empresa.",
        detallesWeb: [
          "Diseño exclusivo desarrollado desde cero, sin plantillas",
          "Modo claro/oscuro incluido",
          "Optimizado para celulares, tablets y computadoras",
          "Formularios configurados según tus necesidades",
          "Sitio web publicado con tu dominio personalizado",
          "Certificado SSL de seguridad profesional",
          "Entrega en 10-15 días hábiles con seguimiento parcial",
          "1 ronda de revisiones y ajustes incluida sin costo adicional",
          "Soporte técnico post-entrega por 15 días",
          "Mantenimiento mensual disponible (consultar costos)"
        ],
        precio: "Hasta $1.900.000",
        notaPrecio: "Incluye desarrollo web personalizado - Cotización sin cargo",
        rangosPrecio: [
          "Landing corporativa (5 secciones): $220.000",
          "SPA corporativo (8 secciones): $310.000",
          "Sitio corporativo completo (10+ secciones): $400.000"
        ],
      },
    ],
    SA: [
      {
        nombre: "Plan Base SA",
        desc: "Constitución de SA + alta de impuestos con punto de venta habilitado para facturar.",
        precio: "$3.000.000",
      },
      {
        nombre: "Plan Completo SA",
        desc: "Incluye todo el Plan Base + presencia digital profesional a medida de tu empresa.",
        detallesWeb: [
          "Diseño exclusivo desarrollado desde cero, sin plantillas",
          "Modo claro/oscuro incluido",
          "Optimizado para celulares, tablets y computadoras",
          "Formularios configurados según tus necesidades",
          "Sitio web publicado con tu dominio personalizado",
          "Certificado SSL de seguridad profesional",
          "Entrega en 10-15 días hábiles con seguimiento parcial",
          "1 ronda de revisiones y ajustes incluida sin costo adicional",
          "Soporte técnico post-entrega por 15 días",
          "Mantenimiento mensual disponible (consultar costos)"
        ],
        precio: "Hasta $3.500.000",
        notaPrecio: "Incluye desarrollo web personalizado - Cotización sin cargo",
        rangosPrecio: [
          "Landing corporativa (5 secciones): $290.000",
          "SPA corporativo (8 secciones): $360.000",
          "Sitio corporativo completo (10+ secciones): $500.000"
        ],
      },
    ],
  };

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

      {/* Selector SAS / SRL / SA */}
      <div className="selector-sociedades">
        {["SAS", "SRL", "SA"].map((t) => (
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
            >
              <div onClick={() => handlePlanSelect(p.nombre)}>
                <h4 className="nombre-plan">{p.nombre}</h4>
                <p className="descripcion-plan">{p.desc}</p>
                <div>
                  {p.detallesWeb && (
                    <button 
                      className="boton-detalles-completo"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlanDetallado(p);
                      }}
                    >
                      Conocer opciones de diseño
                    </button>
                  )}
                </div>
                <p className="precio-plan">{p.precio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="recomendacion-contextual">
    <h4 className="titulo-recomendacion">¿Aún tenés dudas sobre {tipo}?</h4>
    
    {tipo === "SAS" && (
      <div className="contenido-recomendacion">
        <p className="texto-recomendacion">
          <strong>Te recomendamos SAS si:</strong> Buscás una constitución 100% digital, rápida (7-10 días) 
          y económica. No requiere libros físicos, es ideal para emprendedores, startups y negocios 
          que quieren crecer con agilidad y menor burocracia.
        </p>
        <div className="puntos-destacados">
          <span className="punto-destacado">✅ 100% digital sin libros físicos</span>
          <span className="punto-destacado">✅ Constitución express (7-10 días)</span>
          <span className="punto-destacado">✅ Más económica de mantener</span>
          <span className="punto-destacado">✅ Ideal para emprendedores</span>
        </div>
      </div>
    )}
    
    {tipo === "SRL" && (
      <div className="contenido-recomendacion">
        <p className="texto-recomendacion">
          <strong>Te recomendamos SRL si:</strong> Tenés 2 o más socios, buscás una estructura tradicional 
          y reconocida, o es un emprendimiento familiar. Requiere libros físicos pero ofrece mayor 
          formalidad y credibilidad en el mercado.
        </p>
        <div className="puntos-destacados">
          <span className="punto-destacado">✅ Estructura para 2 o más socios</span>
          <span className="punto-destacado">✅ Tradicional y ampliamente reconocida</span>
          <span className="punto-destacado">✅ Ideal para emprendimientos familiares</span>
          <span className="punto-destacado">✅ Mayor credibilidad comercial</span>
        </div>
      </div>
    )}
    
    {tipo === "SA" && (
      <div className="contenido-recomendacion">
        <p className="texto-recomendacion">
          <strong>Te recomendamos SA si:</strong> Tenés un proyecto de gran escala con capital mínimo 
          de $30.000.000, buscás licitar con el Estado, captar inversionistas o pedir créditos importantes. 
          Es la estructura más sólida pero también la más costosa de mantener.
        </p>
        <div className="puntos-destacados">
          <span className="punto-destacado">✅ Capital mínimo $30.000.000</span>
          <span className="punto-destacado">✅ Ideal para licitaciones estatales</span>
          <span className="punto-destacado">✅ Atrae inversionistas serios</span>
          <span className="punto-destacado">✅ Mejor para créditos bancarios importantes</span>
          <span className="punto-destacado">⚠️ Más cara de mantener</span>
        </div>
      </div>
    )}

  </div>

      {/* Modal Detalle de Plan + web */}
      <AnimatePresence>
        {planDetallado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay-completo"
            onClick={() => setPlanDetallado(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="modal-completo"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="material-symbols-outlined boton-cerrar-modal"
                onClick={() => setPlanDetallado(null)}
              >
                close_small
              </button>
              
              <div className="cabecera-modal">
                <h3 className="titulo-modal">{planDetallado.nombre}</h3>
                <p className="descripcion-modal">{planDetallado.desc}</p>
                <div className="precio-destacado">
                  {planDetallado.precio}
                  {planDetallado.notaPrecio && (
                    <span className="nota-precio-modal">{planDetallado.notaPrecio}</span>
                  )}
                </div>
              </div>

              <div className="contenido-modal">
                {/* Sección de características de la web */}
                <div className="seccion-caracteristicas">
                  <h4>Qué incluye tu sitio web</h4>
                  <div className="lista-caracteristicas">
                    {planDetallado.detallesWeb.map((item, idx) => (
                      <div key={idx} className="item-caracteristica">
                        <span className="icono-caracteristica">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sección de rangos de precio */}
                <div className="seccion-rangos-precio">
                  <h4>Opciones de Precio</h4>
                  <div className="contenedor-rangos">
                    {planDetallado.rangosPrecio.map((rango, idx) => (
                      <div key={idx} className="item-rango-precio">
                        {rango}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nota final */}
                <div className="nota-final-modal">
                  <p>💡 <strong>Cotización personalizada:</strong> Te contactaremos para ajustar el precio exacto según tus necesidades específicas y requerimientos.</p>
                </div>
              </div>

              <div className="pie-modal">
                <button 
                  className="boton-seleccionar-plan"
                  onClick={() => {
                    handlePlanSelect(planDetallado.nombre);
                    setPlanDetallado(null);
                  }}
                >
                  Seleccionar este plan
                </button>
                <button 
                  className="boton-cerrar-secundario"
                  onClick={() => setPlanDetallado(null)}
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
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