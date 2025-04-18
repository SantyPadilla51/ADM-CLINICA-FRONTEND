import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton'
import clienteAxios from "../config/axios";
import NavbarAdmin from "./NavbarAdmin";
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'

const ActualizarSintomas = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [cargando, setCargando] = useState(false)
    const [paciente, setPaciente] = useState({
        nombre: "",
        apellido: "",
        edad: "",
        dni: "",
        sexo: "",
        email: "",
        telefono: "",
        sintomas: "",
        medicacion: ""
    })

    const obtenerPaciente = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `/pacienteId/${id}`
            const { data } = await clienteAxios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setPaciente({
                nombre: data.paciente[0].nombre || "",
                apellido: data.paciente[0].apellido || "",
                edad: data.paciente[0].edad || "",
                dni: data.paciente[0].dni || "",
                sexo: data.paciente[0].sexo || "",
                email: data.paciente[0].email || "",
                telefono: data.paciente[0].telefono || "",
                sintomas: data.paciente[0].sintomas || "",
                medicacion: data.paciente[0].medicacion || ""
            });
        } catch (error) {
            toast.error("Error al obtener el paciente");
        }
    }

    const handleChange = (e) => {
        setPaciente({ ...paciente, [e.target.name]: e.target.value });
    }

    const actualizarPaciente = async (e) => {
        e.preventDefault();
        try {
            setCargando(true)
            toast.loading("Actualizando Sintomas...", {
                position: "top-center"
            })
            const token = localStorage.getItem('token')
            const url = `/actualizar-paciente/${id}`
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(url, JSON.stringify(paciente), config);

            if (data.ok === true) {
                setTimeout(() => {
                    navigate("/admin/pacientes");
                }, 1000);
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            setCargando(false)
            toast.error("Ha acorrido un error")
        }
    }

    const handleNavigate = () => {
        navigate(`/admin/pacientes/perfilPaciente/${id}`)
    }

    useEffect(() => {
        obtenerPaciente()
    }, [])


    return (
        <>
            <NavbarAdmin />
            <ToastContainer />
            <button className="mt-4 ms-4 bg-slate-500 p-2 rounded hover:bg-slate-400" onClick={handleNavigate}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="20 20" stroke-width="2" stroke={"#fff"} className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            </button>
            <div className="max-w-4xl mx-4 lg:mx-auto bg-white p-8 rounded-md shadow-md mt-10">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Actualizar Sintomas</h2>
                <form className="flex flex-col lg:grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <h2
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                        >{paciente.nombre || <Skeleton/>}</h2>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Apellido
                        </label>
                        <h2
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                        >{paciente.apellido || <Skeleton/>}</h2>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Edad
                        </label>
                        <h2
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                        >{paciente.edad || <Skeleton/>}</h2>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Teléfono
                        </label>
                        <h2
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                        >{paciente.telefono || <Skeleton/>}</h2>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            DNI
                        </label>
                        <h2
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                        >{paciente.dni || <Skeleton/>}</h2>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Sexo
                        </label>
                        <h2
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                        >{paciente.sexo || <Skeleton/>}</h2>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <h2
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                        >{paciente.email || <Skeleton/>}</h2>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Medicacion
                        </label>
                        <textarea
                            name="medicacion"
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={paciente.medicacion || <Skeleton/>}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Sintomas
                        </label>
                        <textarea
                            name="sintomas"
                            type="text"
                            rows={4}
                            onChange={(e) => handleChange(e)}
                            value={paciente.sintomas || <Skeleton/>}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                        />

                    </div>

                    <button
                        onClick={(e) => actualizarPaciente(e)}
                        disabled={cargando}
                        type="submit"
                        className={`col-span-2 w-full bg-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500  text-white p-2 mt-5 ${cargando ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    >
                        {cargando ? "Guardando..." : "Guardar Cambios"}
                    </button>
                </form>
            </div>
        </>
    )
}

export default ActualizarSintomas