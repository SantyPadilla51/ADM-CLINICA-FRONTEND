import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from "./Navbar";
import clienteAxios from "../config/axios";
import 'react-toastify/dist/ReactToastify.css';

const NuevoPassword = () => {
    const [password, setPassword] = useState("")
    const [repetirPassword, setRepetirPassword] = useState("")
    const [cargando, setCargando] = useState(false)
    const { token } = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setCargando(true)

        if (password === repetirPassword) {
            try {
                setCargando(true)
                const url = `/olvide-password/${token}`
                console.log(password);
                
                const { data } = await clienteAxios.post(url, {password})
                console.log(data);
                
                if (data.ok != true) {
                    toast.error("Hubo un error al cambiar la contraseña")
                    setCargando(false)
                } else {
                    toast.success(data.msg)
                    setCargando(false)

                    setTimeout(() => {
                        navigate("/")
                    }, 2000);
                }

            } catch (error) {
                toast.error("Ha ocurrido un error")
                console.log(error);
                
                setCargando(false)
            }

        } else {
            toast.error("Las contraseñas no coinciden")
            setCargando(false)
        }
    }

    const handleChange = (e) => {
        if (e.target.name === "password") {
            setPassword(e.target.value)
        } else {
            setRepetirPassword(e.target.value)
        }
    }

    return (
        <>
            <ToastContainer />
            <Navbar />
            <form
                className="mt-32 mx-4 bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-5 lg:w-1/3 lg:mx-auto"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl font-bold text-center text-gray-800 uppercase">
                    Genera un nuevo password
                </h1>

                <div className="flex flex-col">
                    <label className="text-gray-600 font-medium">Nuevo Password:</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        type="text"
                        name="password"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-600 font-medium">Repite el Password:</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        type="text"
                        name="repetirPassword"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>

                <button
                    className="bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition flex justify-center items-center gap-2 mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={cargando}
                >
                    {cargando ? <ClipLoader color="#fff" size={20} /> : "Guardar Password"}
                </button>
            </form>
        </>
    )
}

export default NuevoPassword