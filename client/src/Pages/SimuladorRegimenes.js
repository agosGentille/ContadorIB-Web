import { useMemo, useState } from 'react';
import '../Styles/SimuladorRegimenesStyle.css';

/* ---------- tablas fiscales ---------- */
const MONO = [
  ["A", 12009410.45, 49527, 49527],
  ["B", 17595182.74, 56379, 56379],
  ["C", 24670494.31, 66020, 64531],
  ["D", 30628651.43, 84613, 82565],
  ["E", 36028231.33, 119811, 108268],
  ["F", 45151659.41, 150784, 129931],
  ["G", 53995798.87, 230313, 158815],
  ["H", 81924660.37, 522707, 317895],
  ["I", 91699761.90, 963748, 474993],
  ["J", 105012519.20, 1167300, 580794],
  ["K", 126610838.75, 1614446, 702103]
];
const ART94 = [
  [0, 0, 5], [2336953.69, 116847.68, 9], [4673907.36, 327173.52, 12], [7010861.05, 607607.96, 15],
  [10516291.59, 1133422.54, 19], [21032583.18, 3131517.94, 23], [31548874.77, 5550265.01, 27],
  [47323312.16, 9809363.10, 31], [70984968.25, 17144476.49, 35]
];
const ART73 = [[0, 0, 25], [133514185.74, 33378546.43, 30], [1335141857.38, 393866847.93, 35]];
const DED = { gni: 6019671.36, conyuge: 5669323.06, hijo: 2859060.31, especialAutonomo: 21068849.78 };
const AUTONOMOS = { I: 75402.48, II: 105561.86, III: 150803.64 };
const IVA = 0.21, RET_DIV = 0.07, TOPE_SALUD = 0.05;

/* ---------- helpers ---------- */
const fmt = n => (n < 0 ? "-$" : "$") + Math.abs(Math.round(n)).toLocaleString("es-AR");
const parseNum = s => { const c = String(s).replace(/[^\d]/g, ""); return c ? parseInt(c, 10) : 0; };
function escala(base, tabla) {
  if (base <= 0) return 0;
  let t = tabla[0];
  for (const tr of tabla) { if (base > tr[0]) t = tr; }
  return t[1] + (base - t[0]) * t[2] / 100;
}
const categoriaMono = ing => MONO.find(c => ing <= c[1]) || null;

function SimuladorRegimenes() {
  const [fact, setFact] = useState(2000000);
  const [act, setAct] = useState('serv');
  const [cli, setCli] = useState('ri');
  const [compras, setCompras] = useState(20);
  const [gastos, setGastos] = useState(20);
  const [iibbPct, setIibbPct] = useState(3);
  const [hijos, setHijos] = useState(0);
  const [conyuge, setConyuge] = useState('no');
  const [honMono, setHonMono] = useState(120000);
  const [honRI, setHonRI] = useState(400000);
  const [honSoc, setHonSoc] = useState(700000);
  const [salud, setSalud] = useState(250000);

  const { res, facturacion, cf, mejor, maxImp } = useMemo(() => {
    const facturacion = fact * 12;
    const pComp = (compras || 0) / 100;
    const pGast = (gastos || 0) / 100;
    const alicIIBB = (iibbPct || 0) / 100;
    const honMonoAnual = honMono * 12;
    const honRIAnual = honRI * 12;
    const honSocAnual = honSoc * 12;
    const saludAnual = salud * 12;

    const bienes = act === 'bien';
    const cf = cli === 'cf';

    const comprasNetas = facturacion * pComp;
    const gastosNetos = facturacion * pGast;
    const ingresoRG = cf ? facturacion / (1 + IVA) : facturacion;

    const res = {};

    /* MONOTRIBUTO */
    const cat = categoriaMono(facturacion);
    if (cat) {
      const cuotaMes = bienes ? cat[3] : cat[2];
      const cuota = cuotaMes * 12, iibb = facturacion * alicIIBB;
      const comprasConIVA = comprasNetas * (1 + IVA);
      const impuestos = cuota + iibb;
      const costos = comprasConIVA + gastosNetos + honMonoAnual;
      res.mono = {
        ok: true, titulo: "Monotributo",
        sub: `Categoría ${cat[0]} · cuota ${fmt(cuotaMes)}/mes, obra social incluida`,
        neto: facturacion - impuestos - costos,
        impuestos,
        costos: [["Compras (IVA incluido)", comprasConIVA], ["Otros gastos", gastosNetos], ["Honorarios contables", honMonoAnual]],
        micro: `Las compras van con IVA porque no lo computás: ${fmt(comprasNetas * IVA)} al año de mayor costo.`,
        fiscales: [["Cuota anual", cuota], ["Ingresos Brutos", iibb]],
        margen: (cat[1] - facturacion) / cat[1]
      };
    } else {
      res.mono = { ok: false, titulo: "Monotributo", sub: "Facturás por encima del tope de la categoría K" };
    }

    /* RESPONSABLE INSCRIPTO */
    {
      const iibb = ingresoRG * alicIIBB, autonomos = AUTONOMOS.II * 12;
      const netaPrevia = ingresoRG - comprasNetas - gastosNetos - honRIAnual - iibb - autonomos;
      const dedSalud = Math.min(saludAnual, Math.max(0, netaPrevia) * TOPE_SALUD);
      let personales = DED.gni + DED.especialAutonomo + hijos * DED.hijo + (conyuge === 'si' ? DED.conyuge : 0);
      const baseAntes = netaPrevia - dedSalud;
      personales = Math.min(personales, Math.max(0, baseAntes));
      const ganancias = escala(baseAntes - personales, ART94);
      res.ri = {
        ok: true, titulo: "Responsable inscripto", sub: "Persona humana, autónomo categoría II",
        neto: netaPrevia - ganancias - saludAnual,
        impuestos: iibb + autonomos + ganancias + (cf ? facturacion - ingresoRG : 0),
        costos: [["Compras", comprasNetas], ["Otros gastos", gastosNetos], ["Honorarios contables", honRIAnual], ["Cobertura de salud", saludAnual]],
        micro: `IVA a ingresar en el año: ${fmt(Math.max(0, (ingresoRG - comprasNetas) * IVA))}. No sale de tu bolsillo, lo cobrás y lo depositás.`,
        fiscales: [["Ganancias", ganancias], ["Ingresos Brutos", iibb], ["Autónomos", autonomos]]
      };
      if (cf) res.ri.fiscales.unshift(["IVA que absorbe tu precio", facturacion - ingresoRG]);
    }

    /* SOCIEDAD */
    {
      const iibb = ingresoRG * alicIIBB, autonomos = AUTONOMOS.III * 12;
      const resultado = ingresoRG - comprasNetas - gastosNetos - honSocAnual - iibb;
      const ganancias = escala(Math.max(0, resultado), ART73);
      const utilidad = resultado - ganancias;
      const dividendos = utilidad > 0 ? utilidad * RET_DIV : 0;
      res.soc = {
        ok: true, titulo: "Sociedad", sub: "SAS o SRL de un socio que distribuye toda la utilidad",
        neto: utilidad - dividendos - autonomos - saludAnual,
        impuestos: iibb + autonomos + ganancias + dividendos + (cf ? facturacion - ingresoRG : 0),
        costos: [["Compras", comprasNetas], ["Otros gastos", gastosNetos], ["Honorarios y costos societarios", honSocAnual], ["Cobertura de salud", saludAnual]],
        micro: "El director aporta autónomos categoría III y la cobertura de salud la paga por fuera.",
        fiscales: [["Ganancias sociedad", ganancias], ["Retención 7% dividendos", dividendos], ["Ingresos Brutos", iibb], ["Autónomos director", autonomos]]
      };
      if (cf) res.soc.fiscales.unshift(["IVA que absorbe tu precio", facturacion - ingresoRG]);
    }

    const orden = ["mono", "ri", "soc"];
    const validos = orden.filter(k => res[k].ok);
    const mejor = validos.reduce((a, b) => res[a].neto >= res[b].neto ? a : b, validos[0]);
    const maxImp = Math.max(...validos.map(k => res[k].impuestos), 1);

    return { res, facturacion, cf, mejor, maxImp };
  }, [fact, act, cli, compras, gastos, iibbPct, hijos, conyuge, honMono, honRI, honSoc, salud]);

  const handleMoney = setter => e => setter(parseNum(e.target.value));
  const displayMoney = v => v ? v.toLocaleString('es-AR') : '';

  const alerts = [];
  if (res.mono.ok && res.mono.margen < 0.15)
    alerts.push(["", "Estás a menos del 15% del tope de tu categoría. Si crecés, en la próxima recategorización pasás a la de arriba o directamente al régimen general."]);
  if (!res.mono.ok)
    alerts.push(["", "Superaste el tope del monotributo. La comparación real es entre responsable inscripto y sociedad."]);
  if (cf)
    alerts.push(["info", `Como vendés a consumidor final, el IVA sale de tu precio: al pasar al régimen general resignás ${fmt(facturacion * IVA / (1 + IVA))} de ingreso por año, salvo que puedas subir precios.`]);
  if (res.mono.ok && res.ri.neto > res.mono.neto)
    alerts.push(["info", "El régimen general gana acá por el crédito fiscal de tus compras y porque las deducciones personales absorben buena parte de la ganancia. Verificá que los honorarios cargados reflejen el trabajo real de una liquidación mensual de IVA."]);
  if (res.soc.neto > res.ri.neto)
    alerts.push(["info", "La sociedad da mejor número, pero sumá lo que no se ve: constitución, actas, inscripciones y menos flexibilidad para retirar plata. Conviene cuando hay socios, patrimonio para proteger o proyección de crecimiento."]);

  const orden = ["mono", "ri", "soc"];

  return (
    <div className="simulador-page">
      <div className="wrap simulador-intro">
        <p className="eyebrow-intro">Simulador · Bellomo Estudio Contable</p>
        <h1>¿Te conviene monotributo, responsable inscripto o <em>armar una sociedad</em>?</h1>
        <p className="lede-intro">Cargá lo que facturás y lo que gastás. El simulador aplica las escalas vigentes de ARCA y te muestra cuánto te queda en el bolsillo con cada régimen, incluyendo lo que cuesta cumplir con cada uno.</p>
      </div>

      <main className="wrap">
        <div className="grid-simulador">

          <section className="panel sticky">
            <p className="eyebrow">Tu actividad</p>

            <div className="field">
              <label className="lbl">Facturación mensual promedio</label>
              <div className="moneywrap"><span className="pfx">$</span>
                <input type="text" inputMode="numeric" value={displayMoney(fact)} onChange={handleMoney(setFact)} />
              </div>
              <span className="hint">Sin IVA. Si hoy sos monotributista, es lo que cobrás.</span>
            </div>

            <div className="field">
              <label className="lbl">Actividad</label>
              <div className="pills">
                <button type="button" aria-pressed={act === 'serv'} onClick={() => setAct('serv')}>Servicios</button>
                <button type="button" aria-pressed={act === 'bien'} onClick={() => setAct('bien')}>Venta de bienes</button>
              </div>
            </div>

            <div className="field">
              <label className="lbl">¿A quién le facturás?</label>
              <div className="pills">
                <button type="button" aria-pressed={cli === 'ri'} onClick={() => setCli('ri')}>Empresas</button>
                <button type="button" aria-pressed={cli === 'cf'} onClick={() => setCli('cf')}>Consumidor final</button>
              </div>
              <span className="hint">Si vendés a consumidor final el IVA sale de tu precio. Si vendés a empresas lo agregás encima.</span>
            </div>

            <div className="field duo">
              <div>
                <label className="lbl">Compras con factura A</label>
                <div className="pctwrap"><span className="sfx">%</span>
                  <input type="number" value={compras} min="0" max="95" step="1" onChange={e => setCompras(parseFloat(e.target.value) || 0)} />
                </div>
                <span className="hint">Sobre tu facturación.</span>
              </div>
              <div>
                <label className="lbl">Gastos sin IVA</label>
                <div className="pctwrap"><span className="sfx">%</span>
                  <input type="number" value={gastos} min="0" max="95" step="1" onChange={e => setGastos(parseFloat(e.target.value) || 0)} />
                </div>
                <span className="hint">Sueldos, tasas, alquiler.</span>
              </div>
            </div>

            <div className="field duo">
              <div>
                <label className="lbl">Ingresos Brutos</label>
                <div className="pctwrap"><span className="sfx">%</span>
                  <input type="number" value={iibbPct} step="0.1" min="0" max="10" onChange={e => setIibbPct(parseFloat(e.target.value) || 0)} />
                </div>
              </div>
              <div>
                <label className="lbl">Hijos a cargo</label>
                <input type="number" value={hijos} min="0" max="10" step="1" onChange={e => setHijos(parseInt(e.target.value) || 0)} />
              </div>
            </div>

            <div className="field">
              <label className="lbl">Cónyuge a cargo</label>
              <div className="pills">
                <button type="button" aria-pressed={conyuge === 'no'} onClick={() => setConyuge('no')}>No</button>
                <button type="button" aria-pressed={conyuge === 'si'} onClick={() => setConyuge('si')}>Sí</button>
              </div>
            </div>

            <p className="eyebrow mt">Lo que cuesta cumplir</p>

            <div className="field duo">
              <div>
                <label className="lbl">Honorarios monotributo</label>
                <div className="moneywrap"><span className="pfx">$</span>
                  <input type="text" inputMode="numeric" value={displayMoney(honMono)} onChange={handleMoney(setHonMono)} />
                </div>
              </div>
              <div>
                <label className="lbl">Honorarios como RI</label>
                <div className="moneywrap"><span className="pfx">$</span>
                  <input type="text" inputMode="numeric" value={displayMoney(honRI)} onChange={handleMoney(setHonRI)} />
                </div>
              </div>
            </div>

            <div className="field duo">
              <div>
                <label className="lbl">Honorarios sociedad</label>
                <div className="moneywrap"><span className="pfx">$</span>
                  <input type="text" inputMode="numeric" value={displayMoney(honSoc)} onChange={handleMoney(setHonSoc)} />
                </div>
                <span className="hint">Incluye balance, IGJ y libros.</span>
              </div>
              <div>
                <label className="lbl">Cobertura de salud</label>
                <div className="moneywrap"><span className="pfx">$</span>
                  <input type="text" inputMode="numeric" value={displayMoney(salud)} onChange={handleMoney(setSalud)} />
                </div>
                <span className="hint">En monotributo va en la cuota.</span>
              </div>
            </div>
          </section>

          <section>
            <p className="eyebrow">Qué te queda con cada régimen</p>

            <div className="ledger">
              {orden.map(k => {
                const r = res[k];
                if (!r.ok) return (
                  <article key={k} className="col out">
                    <h3>{r.titulo}</h3><p className="sub">{r.sub}</p>
                    <div className="biglbl">No disponible</div><div className="big dim">—</div>
                    <div className="permes">Con esta facturación quedás excluido del régimen simplificado.</div>
                  </article>
                );
                const pct = facturacion > 0 ? r.impuestos / facturacion * 100 : 0;
                return (
                  <article key={k} className={`col ${k === mejor ? 'win' : ''}`}>
                    {k === mejor && <span className="stamp">Te queda más</span>}
                    <h3>{r.titulo}</h3><p className="sub">{r.sub}</p>
                    <div className="biglbl">Te queda por año</div>
                    <div className={`big ${r.neto < 0 ? 'neg' : ''}`}>{fmt(r.neto)}</div>
                    <div className="permes">{fmt(r.neto / 12)} por mes</div>
                    <div className="block">
                      <div className="blocklbl">Impuestos y aportes</div>
                      {r.fiscales.map((f, i) => (
                        <div className="row" key={i}><span>{f[0]}</span><span className="num">{fmt(f[1])}</span></div>
                      ))}
                      <div className="row tot"><span>Total</span><span className="num">{fmt(r.impuestos)}</span></div>
                    </div>
                    <div className="block">
                      <div className="blocklbl">Costos de la actividad</div>
                      {r.costos.map((c, i) => (
                        <div className="row" key={i}><span>{c[0]}</span><span className="num">{fmt(c[1])}</span></div>
                      ))}
                      <div className="micro">{r.micro}</div>
                    </div>
                    <div className="bar"><i style={{ width: `${r.impuestos / maxImp * 100}%` }}></i></div>
                    <div className="barlbl">Carga fiscal: {pct.toFixed(1)}% de tu facturación</div>
                  </article>
                );
              })}
            </div>

            <div id="alerts">
              {alerts.map((a, i) => (
                <div className={`note ${a[0]}`} key={i}>{a[1]}</div>
              ))}
            </div>

            <details className="detail">
              <summary>Cómo se calcula y qué no está contemplado</summary>
              <div className="detailbody">
                <ul>
                  <li><b>Monotributo:</b> la categoría surge de los ingresos brutos de los últimos doce meses y la cuota es la vigente desde el 1/8/2026, con obra social incluida. El IVA de las compras no se computa, así que las compras se cargan con el IVA adentro: es mayor costo, no un impuesto adicional.</li>
                  <li><b>Responsable inscripto:</b> IVA por diferencia entre débito y crédito fiscal, Ingresos Brutos sobre la facturación neta, aportes de autónomos y Ganancias por la escala del art. 94 con las deducciones personales anuales 2026. La cobertura médica se deduce hasta el 5% de la ganancia neta.</li>
                  <li><b>Sociedad:</b> Ganancias por la escala del art. 73 para ejercicios iniciados desde el 1/1/2026, retención del 7% al distribuir dividendos y aportes de autónomos del director. Se asume un socio que distribuye toda la utilidad.</li>
                  <li><b>El IVA a ingresar no reduce lo que te queda:</b> lo cobrás en la factura y lo depositás. Figura como referencia de flujo de fondos.</li>
                  <li><b>No contempla:</b> empleados en relación de dependencia, Convenio Multilateral, exenciones o regímenes simplificados de Ingresos Brutos, Bienes Personales, saldos técnicos y a favor por retenciones, quebrantos anteriores ni el impuesto al cheque.</li>
                  <li>La deducción especial de autónomos exige tener los aportes al día al vencimiento de la declaración jurada.</li>
                </ul>
              </div>
            </details>

            <div className="cta">
              <p>
                <strong>Los números son el principio, no la decisión.</strong>
                El régimen que conviene también depende de tus clientes, del crecimiento que proyectás y de la responsabilidad patrimonial que estés dispuesto a asumir. Lo vemos en una reunión.
              </p>
              <a href="https://wa.me/5491131214776?text=Hola,%20us%C3%A9%20el%20simulador%20de%20reg%C3%ADmenes%20y%20quisiera%20hacer%20una%20consulta" target="_blank" rel="noopener noreferrer">Pedir una consulta</a>
            </div>
          </section>
        </div>

        <p className="vig">Valores vigentes al 24/08/2026</p>
        <p className="disclaimer">Escala del monotributo publicada por ARCA con aplicación desde el 1/8/2026. Escala del art. 94 y deducciones personales del art. 30 correspondientes a la liquidación anual del período fiscal 2026. Escala del art. 73 para ejercicios iniciados a partir del 1/1/2026. Aportes de trabajadores autónomos vigentes desde el 15/8/2026. Esta herramienta es orientativa y no constituye asesoramiento profesional. Cdor. Iván Bellomo · CPCECABA T° 449 F° 167.</p>
      </main>
    </div>
  );
}

export default SimuladorRegimenes;