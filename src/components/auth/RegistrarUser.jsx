import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from "../navbar/Navbar";
import clienteAxios from "../../config/axios";

const RegistrarUser = () => {
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    dni: "",
    telefono: "",
    especialidad: "",
  });

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const url = "crear-usuario";
      const { data } = await clienteAxios.post(url, usuario);

      if (data.ok === true) {
        toast.success(data.msg, {
          position: "top-center",
        });
        setCargando(false);
        setTimeout(() => {
          navigate("/");
        }, 4000);
      } else {
        setCargando(false);
        toast.error(data.msg);
        console.log(data.msg);
      }
    } catch (error) {
      setCargando(false);

      toast.error("Ha ocurrido un error");
    }
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        <button
          className="mt-4 ms-4 mb-4 md:mb-0 lg:mb-0 bg-slate-500 p-2 rounded hover:bg-slate-400"
          onClick={handleNavigate}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="20 20"
            stroke-width="2"
            stroke={"#fff"}
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          className="mt-10 mx-4 drop-shadow-lg bg-gray-100 flex flex-col p-6 gap-4 rounded-lg lg:w-1/3 lg:mx-auto border border-gray-200"
          onSubmit={handleSubmit}
        >
          <h3 className="text-xl font-bold bg-white p-3 rounded-md text-center uppercase">
            Completa todos los campos
          </h3>

          <div className="flex flex-col">
            <label className="font-semibold">Nombre:</label>
            <input
              className="p-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="nombre"
              required
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Apellido:</label>
            <input
              className="p-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="apellido"
              required
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">DNI:</label>
            <input
              className="p-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              minLength={8}
              maxLength={8}
              name="dni"
              required
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Especialidad:</label>
            <select
              className="p-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="especialidad"
              required
              onChange={handleChange}
            >
              <option value="">Seleccione una especialidad</option>
              <option value="cardiología">Cardiología</option>
              <option value="traumatologia">Traumatología</option>
              <option value="neurología">Neurología</option>
              <option value="oncología">Oncología</option>
              <option value="pediatría">Pediatría</option>
              <option value="psiquiatría">Psiquiatría</option>
              <option value="urología">Urología</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Correo electrónico:</label>
            <input
              className="p-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              required
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Teléfono:</label>
            <input
              className="p-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="telefono"
              minLength={10}
              maxLength={10}
              required
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Contraseña:</label>
            <input
              className="p-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              required
              onChange={handleChange}
            />
          </div>

          {cargando ? (
            <button
              className="rounded-md bg-blue-800 text-white p-3 hover:bg-blue-600 mt-5 flex items-center justify-center"
              type="submit"
            >
              <ClipLoader color={"#fff"} size={20} />
            </button>
          ) : (
            <button
              className="rounded-md bg-blue-800 text-white p-3 hover:bg-blue-600 mt-5 transition-all duration-200"
              type="submit"
            >
              Crear Usuario
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default RegistrarUser;
