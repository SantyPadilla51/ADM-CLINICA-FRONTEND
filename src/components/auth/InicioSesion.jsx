import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import clienteAxios from "../../config/axios";
import Navbar from "../navbar/Navbar";
import useAuth from "../../hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";

const InicioSesion = () => {
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Iniciando Sesion...");

    if (datos.email === "" || datos.password === "") {
      toast.error("Todos los campos son obligatorios");
      return;
    } else {
      try {
        setCargando(true);

        const url = "/iniciar-sesion";

        const { data } = await clienteAxios.post(url, datos, {
          withCredentials: true,
        });

        if (data.ok != true) {
          toast.update(toastId, {
            render: data.msg,
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          setCargando(false);
          return;
        } else {
          toast.update(toastId, {
            render: "Inicio de sesión exitoso",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          setCargando(false);
          setAuth(data);
          localStorage.setItem("token", data.token);
          setTimeout(() => {
            navigate("/admin/pacientes");
          }, 1000);
        }
      } catch (error) {
        setCargando(false);
        toast.error("Hubo un error al iniciar sesion");
      }
    }
  };

  const hanldeChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md mx-3">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Inicia Sesión
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={datos.email}
                onChange={(e) => hanldeChange(e)}
                required
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Ingresa tu correo"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={datos.password}
                autoComplete="new-password"
                onChange={(e) => hanldeChange(e)}
                required
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={cargando}
                className={`w-full py-2 px-4 rounded-md text-white focus:outline-none focus:ring-2 ${
                  cargando
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                }`}
              >
                {cargando ? "Cargando..." : "Iniciar Sesión"}
              </button>
            </div>
          </form>
          <div className="mt-6 flex justify-between items-center">
            <Link
              to={"/olvide-password"}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              ¿Olvidaste tu contraseña?
            </Link>

            <Link
              to={"/crear-cuenta"}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default InicioSesion;
