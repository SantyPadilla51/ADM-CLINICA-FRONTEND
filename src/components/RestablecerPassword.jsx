import { useState } from "react"
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clienteAxios from "../config/axios";


const RestablecerPassword = () => {

  const [cargando, setCargando] = useState(false)
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCargando(true)

    if (email === "") {
      toast.error("Debes ingresar un correo electrónico")
      setCargando(false)
      return
    }

    try {

      const url = "olvide-password"

      const { data } = await clienteAxios.post(url, { email }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (data.ok === true) {
        toast.success("Hemos enviado un email con las instrucciones")
        setCargando(false)
        setEmail(" ")
        setTimeout(() => {
          navigate("/")
        }, 3000);


      } else {
        toast.error("Hubo un error al enviar el correo electrónico. Por favor, inténtelo más tarde.")
        setCargando(false)
        return
      }

    } catch (error) {
      toast.error("Hubo un error al enviar el correo electrónico. Por favor, inténtelo más tarde.")
      setCargando(false)
      return
    }
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleNavigate = () => {
    navigate(`/`)
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="bg-gray-100">
        <button className="mt-4 ms-4 bg-slate-500 p-2 rounded hover:bg-slate-400" onClick={handleNavigate}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="20 20" stroke-width="2" stroke={"#fff"} className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
      </div>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          className="-mt-36 mx-4 drop-shadow-lg bg-white flex flex-col p-6 gap-4 rounded-lg lg:w-1/3 lg:mx-auto border border-gray-200"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-semibold text-gray-800 text-center">Restablece tu Contraseña</h1>
          <p className="text-gray-600 text-center">
            Ingresa tu correo para recibir instrucciones de restablecimiento
          </p>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Correo electrónico</label>
            <input
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              type="email"
              name="email"
              placeholder="ejemplo@correo.com"
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 transition-all flex items-center justify-center mt-4"
            type="submit"
            disabled={cargando}
          >
            {cargando ? <ClipLoader color={'#fff'} size={20} /> : "Enviar Instrucciones"}
          </button>
        </form>
      </div>
    </>
  )
}

export default RestablecerPassword