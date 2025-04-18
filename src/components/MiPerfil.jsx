import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import clienteAxios from "../config/axios"
import NavbarAdmin from "./NavbarAdmin"
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'


const MiPerfil = () => {

    const navigate = useNavigate()
    const [eliminando, setEliminando] = useState(false)
    const [cargando, setCargando] = useState(false);
    const [datos, setDatos] = useState({
        id: "",
        nombre: "",
        apellido: "",
        email: "",
        dni: "",
        especialidad: "",
    })

    const obtenerPerfil = async () => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.get('/perfil', config)

            setDatos({
                id: data.doctor.id,
                nombre: data.doctor.nombre,
                apellido: data.doctor.apellido,
                email: data.doctor.email,
                especialidad: data.doctor.especialidad,
                dni: data.doctor.dni,
            })

        } catch (error) {
            toast.error('Hubo un error');
        }
    }

    const eliminarPerfil = async (id) => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            const url = `/eliminar-perfil/${id}`
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(url, config)

            if (data.ok === true) {
                localStorage.removeItem('token')
                toast.success(data.msg, {
                    position: "top-center"
                })
                setTimeout(() => {
                    window.location.href = '/'
                }, 2000);
            }
        }
        catch (error) {
            toast.error('Hubo un error');
        }
    }

    const handleEliminar = () => {
        setEliminando(true)
    }

    const handleCancelar = () => {
        setEliminando(false)
    }

    const handleNavigate = () => {
        navigate(`/admin/pacientes`)
    }

    useEffect(() => {
        obtenerPerfil()
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
            <div className="mx-4 lg:w-1/2 lg:mx-auto bg-white shadow-lg rounded-2xl mt-10 p-2">
                <h1 className="text-xl font-bold text-center bg-black text-white p-3 rounded-t-2xl">
                    Mi Perfil
                </h1>

                <div className="p-4">
                    <ul className="space-y-3 text-gray-700">
                        <li className="font-semibold">
                            Nombre: <span className="font-light">{datos.nombre || <Skeleton />}</span>
                        </li>
                        <li className="font-semibold">
                            Apellido: <span className="font-light">{datos.apellido || <Skeleton />}</span>
                        </li>
                        <li className="font-semibold">
                            DNI: <span className="font-light">{datos.dni || <Skeleton />}</span>
                        </li>
                        <li className="font-semibold">
                            Especialidad: <span className="font-light">{datos.especialidad || <Skeleton />}</span>
                        </li>
                        <li className="font-semibold">
                            Correo electrónico: <span className="font-light">{datos.email || <Skeleton />}</span>
                        </li>
                    </ul>
                </div>

                <div className="flex mt-6 justify-between p-4 border-t">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition font-medium shadow-md"
                        onClick={handleEliminar}
                    >Eliminar Cuenta</button>
                    <button
                        onClick={() => navigate(`/editar-perfil/${datos.id}`)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition font-medium shadow-md">
                        Editar Perfil
                    </button>
                </div>
                {eliminando && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="p-6 bg-white shadow-lg rounded-lg w-96">
                            <p className="text-gray-800 mb-4 text-center font-semibold">
                                ¿Estás seguro de que quieres eliminar tu perfil?
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    type="submit"
                                    disabled={cargando}
                                    onClick={() => eliminarPerfil(datos.id)}
                                    className={`px-4 py-2 rounded-lg transition text-white 
                    ${cargando ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}
                                >
                                    {cargando ? "Eliminando..." : "Eliminar"}
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                                    onClick={handleCancelar}
                                    disabled={cargando}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default MiPerfil