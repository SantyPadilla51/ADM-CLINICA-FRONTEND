import { useState } from "react";
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import clienteAxios from "../config/axios";
import 'react-toastify/dist/ReactToastify.css';

const ConfirmarCuenta = () => {

    const [cargando, setCargando] = useState(false)
    const params = useParams()
    const { token } = params

    const handleSubmit = (e) => {
        e.preventDefault()
        confirmarCuenta(token)
    }

    const confirmarCuenta = async () => {
        console.log("Iniciando sesion..");
        
        try {
            setCargando(true)

            const url = 'confirmar-cuenta'
            const { data } = await clienteAxios.get(`${url}/${token}`)

            if (data.ok != true) {
                toast.error(data.msg)
                setCargando(false)
            } else {
                toast.success(data.msg);
                setCargando(false);
                return;
            }

        } catch (error) {
            toast.error("Hubo un error al confirmar la cuenta. Por favor, inténtelo más tarde.")
            return
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center bg-black h-screen text-center">
                <ToastContainer />
                <h1 className="text-xl text-white">Confirma tu cuenta dando click en el botón</h1>
                {cargando ? (
                    <button className="text-white p-3 font-semibold hover:bg-green-500 mt-5">
                        <ClipLoader color={'#fff'} />
                    </button>
                ) : (
                    <button
                        className="rounded-md bg-green-600 font-semibold text-white p-3 hover:bg-green-500 mt-5"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Confirmar Cuenta
                    </button>
                )}
            </div>

        </>
    )
}

export default ConfirmarCuenta