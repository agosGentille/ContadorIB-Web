const planes = [
  {
    id: 1,
    titulo: "Plan Monotributo",
    precio: "Desde $80.000",
    caracteristicas: [
      "Control de facturación mensual",
      "Recategorizaciones automáticas",
      "Presentación de DDJJ de IIBB",
      "Recordatorio de vencimientos",
      "Control de domicilio fiscal electrónico",
      "Generación de VEPS y planes de pago"
    ],
    opcional: "Facturación electrónica"
  },
  {
    id: 2,
    titulo: "Plan Resp. Inscripto",
    precio: "Desde $200.000",
    caracteristicas: [
      "Todo lo del Plan Monotributo, más:",
      "Presentación de DDJJ de IVA e IIBB",
      "Tramitación certificado MiPyME",
      "Certificados de no retención/exenciones",
      "Asesoramiento especializado permanente"
    ]
  },
  {
    id: 3,
    titulo: "Plan Pyme Empresa",
    precio: "Desde $300.000",
    caracteristicas: [
      "Todo lo del Plan RI, más:",
      "Liquidación de sueldos (hasta 10 empleados)",
      "Gestión de colaboradores monotributistas",
      "Control de hasta 3 socios/accionistas",
      "Armado de balances completos",
      "Planificación fiscal estratégica",
      "Reportes financieros mensuales"
    ]
  }
];

module.exports = { planes };