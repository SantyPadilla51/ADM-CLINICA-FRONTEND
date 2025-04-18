import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import clienteAxios from "../config/axios";
import NavbarAdmin from "./NavbarAdmin";
import 'react-toastify/dist/ReactToastify.css';


const EditarPaciente = () => {

    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams()
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        edad: "",
        dni: "",
        sexo: "",
        email: "",
        telefono: "",
        cobertura: ""
    });

    const obtenerPaciente = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `/pacienteId/${id}`
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.get(url, config)

            setFormData({
                nombre: data.paciente[0].nombre || "",
                apellido: data.paciente[0].apellido || "",
                edad: data.paciente[0].edad || "",
                dni: data.paciente[0].dni || "",
                sexo: data.paciente[0].sexo || "",
                email: data.paciente[0].email || "",
                telefono: data.paciente[0].telefono || "",
                cobertura: data.paciente[0].cobertura || ""
            });
        } catch (error) {
            toast.error("Ha ocurrido un error");
        }
    }

    const actualizarPaciente = async (e) => {
        e.preventDefault()
        setCargando(true)
        toast.loading('Actualizando Paciente..', {
            position: "top-center"
        })
        try {
            const token = localStorage.getItem('token')
            const url = `/actualizar-paciente/${id}`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(url, JSON.stringify(formData), config)

            if (data.ok === true) {
                setTimeout(() => {
                    navigate("/admin/pacientes")
                }, 1000);
            } else {
                setCargando(false)
                toast.error(data.msg);
            }

        } catch (error) {
            setCargando(false)
            toast.error('Ocurrio un error')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleNavigate = () => {
        navigate(`/admin/pacientes/perfilPaciente/${id}`)
    }

    useEffect(() => {
        obtenerPaciente();
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
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Editar Paciente</h2>
                <form className="flex flex-col lg:grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                            placeholder="Escribe el nombre"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Apellido
                        </label>
                        <input
                            type="text"
                            id="apellido"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                            placeholder="Escribe el apellido"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Edad
                        </label>
                        <input
                            type="text"
                            maxLength={3}
                            id="edad"
                            name="edad"
                            value={formData.edad}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                            placeholder="Escribe la edad"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            id="telefono"
                            name="telefono"
                            maxLength={10}
                            value={formData.telefono}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                            placeholder="Escribe el teléfono"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            DNI
                        </label>
                        <input
                            type="text"
                            id="dni"
                            name="dni"
                            maxLength={8}
                            value={formData.dni}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                            placeholder="Escribe el DNI"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Cobertura Medica
                        </label>
                        <select
                            id="cobertura"
                            name="cobertura"
                            value={formData.cobertura}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none  sm:text-sm"
                        >
                            <option value="">{formData.cobertura}</option>
                            <option value="osde">OSDE</option>
                            <option value="swiss medical">Swiss Medical</option>
                            <option value="galeno">Galeno</option>
                            <option value="medicus">Medicus</option>
                            <option value="omint">Omint</option>
                            <option value="hospital italiano">Hospital Italiano</option>
                            <option value="hospital britanico">Hospital Británico</option>
                            <option value="osdepyme">OSDEPYME</option>
                            <option value="accord salud">Accord Salud</option>
                            <option value="sancor salud">Sancor Salud</option>
                            <option value="osde binario">OSDE Binario</option>
                            <option value="premedic">Premedic</option>
                            <option value="medifé">Medifé</option>
                            <option value="aca salud">ACA Salud</option>
                            <option value="staff médico">Staff Médico</option>
                            <option value="docthos">Docthos</option>
                            <option value="ospat">OSPAT</option>
                            <option value="ospaca">OSPACA</option>
                            <option value="ospjn">OSPJN</option>
                            <option value="ospesgype">OSPESGYPE</option>
                            <option value="ospedyc">OSPedyC</option>
                            <option value="ospim">OSPIM</option>
                            <option value="ospia">OSPIA</option>
                            <option value="ospiv">OSPIV</option>
                            <option value="ospel">OSPEL</option>
                            <option value="ospf">OSPF</option>
                            <option value="ospm">OSPM</option>
                            <option value="osppra">OSPPRA</option>
                            <option value="osppc">OSPPC</option>
                            <option value="osppc">OSPPc</option>
                            <option value="osppra">OSPPRA</option>
                            <option value="osppce">OSPPCe</option>
                            <option value="osppc">OSPPC</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Sexo
                        </label>
                        <select
                            id="sexo"
                            name="sexo"
                            value={formData.sexo}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                            placeholder="Escribe el email"
                        />
                    </div>

                    <button
                        onClick={(e) => actualizarPaciente(e)}
                        disabled={cargando}
                        type="submit"
                        className={`col-span-2 w-full md:w-auto bg-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500  text-white p-2 mt-5 ${cargando ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    >
                        {cargando ? "Guardando..." : "Guardar Cambios"}
                    </button>
                </form>
            </div>
        </>
    )
}

export default EditarPaciente