import React, { useState } from "react";

const NUMERO_WSP = "5491131214776"; 

export default function PlanesEmpresas() {
  const [tipo, setTipo] = useState("SAS");
  const [planDetallado, setPlanDetallado] = useState(null);

  const planes = {
    SAS: [
      {
        nombre: "Plan Base SAS",
        desc: "Constitución de SAS + alta de impuestos con punto de venta habilitado para facturar.",
        precio: "Desde $1.500.000",
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
        precio: "Desde $1.720.000",
        notaPrecio: "Precios web aproximados. El valor final depende de funcionalidades, diseño y alcance del proyecto.",
        rangosPrecio: [
          "Landing page (3 secciones): desde $220.000",
          "SPA (5 páginas): desde $280.000",
          "Sitio completo (8 páginas): desde $380.000",
          "Tienda online / E-commerce: desde $550.000"
        ],
      },
    ],
    SRL: [
      {
        nombre: "Plan Base SRL",
        desc: "Constitución de SRL + alta de impuestos con punto de venta habilitado para facturar.",
        precio: "Desde $1.700.000",
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
        precio: "Desde $1.980.000",
        notaPrecio: "Precios web aproximados. El valor final depende de funcionalidades, diseño y alcance del proyecto.",
        rangosPrecio: [
          "Landing corporativa (5 secciones): desde $280.000",
          "SPA corporativo (8 secciones): desde $360.000",
          "Sitio corporativo completo (10+ secciones): desde $480.000",
          "Tienda online / E-commerce: desde $650.000"
        ],
      },
    ],
    SA: [
      {
        nombre: "Plan Base SA",
        desc: "Constitución de SA + alta de impuestos con punto de venta habilitado para facturar.",
        precio: "Desde $3.000.000",
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
        precio: "Desde $3.350.000",
        notaPrecio: "Precios web aproximados. El valor final depende de funcionalidades, diseño y alcance del proyecto.",
        rangosPrecio: [
          "Landing corporativa (5 secciones): desde $350.000",
          "SPA corporativo (8 secciones): desde $450.000",
          "Sitio corporativo completo (10+ secciones): desde $600.000",
          "Tienda online / E-commerce: desde $800.000"
        ],
      },
    ],
  };

  function irAWhatsapp(nombrePlan, tipoSociedad) {
    var mensaje = "Hola! Quiero info sobre el " + nombrePlan + ". Me pasan los detalles?";
    var url = "https://wa.me/" + NUMERO_WSP + "?text=" + encodeURIComponent(mensaje);
    window.open(url, "_blank");
  }

  return (
    <section className="seccion-planes-sociedades" id="Sociedades">
      <h3 className="titulo-seccion">Constitución de Sociedades</h3>
      Iniciá tu empresa con asesoramiento integral: elegí entre SAS, SRL o SA, y sumá presencia digital con tu web o tienda online.

      <div className="selector-sociedades">
        {["SAS", "SRL", "SA"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTipo(t)}
            className={"boton-selector " + (tipo === t ? "activo" : "inactivo")}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="contenedor-planes">
        {planes[tipo].map((p) => (
          <div key={p.nombre} className="tarjeta-plan">
            <h4 className="nombre-plan">{p.nombre}</h4>
            <p className="descripcion-plan">{p.desc}</p>

            {p.detallesWeb && (
              <button
                type="button"
                className="boton-detalles-completo"
                onClick={() => setPlanDetallado(p)}
              >
                Conocer opciones de diseño
              </button>
            )}

            <p className="precio-plan">{p.precio}</p>

            <button
              type="button"
              className="boton-enviar activo"
              onClick={() => irAWhatsapp(p.nombre, tipo)}
            >
              Consultar por WhatsApp
            </button>
          </div>
        ))}
      </div>

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

      {planDetallado && (
        <div className="modal-overlay-completo" onClick={() => setPlanDetallado(null)}>
          <div className="modal-completo" onClick={(e) => e.stopPropagation()}>
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

              <div className="nota-final-modal">
                <p>💡 <strong>Cotización personalizada:</strong> Los precios indicados son estimativos. El valor final puede variar según funcionalidades, integraciones (como e-commerce), diseño y requerimientos específicos del proyecto.</p>
              </div>
            </div>

            <div className="pie-modal">
              <button
                className="boton-seleccionar-plan"
                onClick={() => irAWhatsapp(planDetallado.nombre, tipo)}
              >
                Consultar este plan por WhatsApp
              </button>
              <button
                className="boton-cerrar-secundario"
                onClick={() => setPlanDetallado(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}