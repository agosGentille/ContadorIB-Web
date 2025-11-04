import { useState } from "react";
import { validarEmail } from "../Utils/ValidarEmail";

import { API_BASE_URL } from '../Config/api.js';

function FormContacto(){
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

        try {
            const res = await fetch("https://api.contadorib.com.ar/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

        const data = await res.json();

        if (data.success) {
            alert("Correo enviado correctamente!");
            setForm({ email: "", nombre: "", apellido: "", telefono: "", mensaje: "", tipoCliente: "", nombreEmpresa: "" });
            setCantCaracteres(0);
            setErrors("");
        } else {
            setErrors(data.error || "Error al enviar correo");
        }
    } catch (err) {
        setErrors("Error de conexión con el servidor");
    }
    };



    return(
        <>
        <form className="Form" onSubmit={handleSubmit} autoComplete="off">
            {errors}
            <div className="nombre-completo">
                <input type="text" name="nombre" placeholder="Nombre(s)" className="inputForm" required value={form.nombre} onChange={handleChangeValues}/>
                <input type="text" name="apellido" placeholder="Apellido(s)" className="inputForm" required value={form.apellido} onChange={handleChangeValues}/>
            </div>
            <input type="email" name="email" placeholder="Correo Electrónico" className="inputForm" required value={form.email} onChange={handleChangeValues}/>
            <input type="text" name="telefono" placeholder="Teléfono (opcional)" className="inputForm" value={form.telefono} onChange={handleChangeValues}/>
            <div className="fila-tipo">
                <select
                    name="tipoCliente"
                    className="inputForm selectTipo"
                    value={form.tipoCliente}
                    onChange={handleChangeValues}
                    required
                >
                    <option value="">Seleccioná una opción</option>
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
                    required
                />
                <p> {CantCaracteres}/500 caracteres máx. </p>
            </div>
            <div className='button'>
                <button type="submit" className='btnEnviarMensaje'> ENVIAR MENSAJE </button>
            </div>
                
        </form>
        </>
    );
}

export default FormContacto;