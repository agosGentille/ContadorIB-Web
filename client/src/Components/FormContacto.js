import { useState } from "react";
import { validarEmail } from "../Utils/ValidarEmail";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../Config/api.js';

function FormContacto(){
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        nombre: "",
        apellido: "",
        telefono: "",
        mensaje: "",
        tipoCliente: "", 
        nombreEmpresa: ""
    });

    const [CantCaracteres, setCantCaracteres] = useState(0);
    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(false);

    // Handler genérico para todos los inputs
    const handleChangeValues = (e) => {
        const { name, value } = e.target;

        // Actualiza el contador solo para mensaje
        if(name === "mensaje") {
        setCantCaracteres(value.length);
        }

        setForm((prev) => ({
        ...prev,
        [name]: value
        }));
    };

    // Manejo del submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors("");
        setLoading(true);

        if (!form.nombre || !form.apellido || !form.email || !form.mensaje) {
            setErrors("Por favor completa todos los campos obligatorios.");
            return;
        }

        if (form.tipoCliente === "empresa" && !form.nombreEmpresa.trim()) {
            setErrors("Por favor ingresa el nombre de la empresa.");
            return;
        }
        
        const { valido, error: errorEmail } = validarEmail(form.email);
        if (!valido) {
            setErrors(errorEmail);
            return;
        }

        const url = `${API_BASE_URL}/send-email`;

        console.log("URL de la petición:", url);
        console.log("API_BASE_URL:", API_BASE_URL);

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

        const data = await res.json();

        if (data.success) {
            navigate('/gracias', { 
                    state: { 
                        fromForm: true,
                        nombre: form.nombre 
                    } 
                });
            setForm({ email: "", nombre: "", apellido: "", telefono: "", mensaje: "", tipoCliente: "", nombreEmpresa: "" });
            setCantCaracteres(0);
            setErrors("");
        } else {
            setErrors(data.error || "Error al enviar correo");
            setLoading(false);
        }
    } catch (err) {
        setErrors("Error de conexión con el servidor");
        setLoading(false);
    }
    };



    return(
        <>
        <form className="Form" onSubmit={handleSubmit} autoComplete="off">
            {errors && <div className="error-mensaje">{errors}</div>}
            <div className="nombre-completo">
                <input disabled={loading} type="text" name="nombre" placeholder="Nombre(s)" className="inputForm" required value={form.nombre} onChange={handleChangeValues}/>
                <input disabled={loading} type="text" name="apellido" placeholder="Apellido(s)" className="inputForm" required value={form.apellido} onChange={handleChangeValues}/>
            </div>
            <input disabled={loading} type="email" name="email" placeholder="Correo Electrónico" className="inputForm" required value={form.email} onChange={handleChangeValues}/>
            <input disabled={loading} type="text" name="telefono" placeholder="Teléfono (opcional)" className="inputForm" value={form.telefono} onChange={handleChangeValues}/>
            <div className="fila-tipo">
                <select
                    name="tipoCliente"
                    className="inputForm selectTipo"
                    value={form.tipoCliente}
                    onChange={handleChangeValues}
                    required
                    disabled={loading}
                >
                    <option value="">Seleccioná tipo de contribuyente</option>
                    <option value="monotributista">Monotributista</option>
                    <option value="ri">Responsable Inscripto</option>
                    <option value="empresa">Empresa</option>
                </select>

                <div
                    className={`campo-empresa ${
                    form.tipoCliente === "empresa" ? "visible" : ""
                    }`}
                >
                    <input
                    type="text"
                    name="nombreEmpresa"
                    placeholder="Nombre de la empresa"
                    className="inputForm"
                    value={form.nombreEmpresa}
                    onChange={handleChangeValues}
                    required={form.tipoCliente === "empresa"}
                    disabled={loading}
                    />
                </div>
            </div>
            <div className='mensaje'>
                <textarea  id='inputMensaje'
                    name="mensaje" 
                    placeholder="Escribe un mensaje aquí..." 
                    className="inputForm"
                    value={form.mensaje}
                    onChange={handleChangeValues}
                    maxLength={500}
                    disabled={loading}
                    required
                />
                <p> {CantCaracteres}/500 caracteres máx. </p>
            </div>
            <div className='button'>
                <button type="submit" className={`btnEnviarMensaje ${loading ? 'btn-loading' : ''}`}
                disabled={loading}> 
                    {loading ? 'ENVIANDO...' : 'ENVIAR MENSAJE'} 
                </button>
            </div>
                
        </form>
        </>
    );
}

export default FormContacto;