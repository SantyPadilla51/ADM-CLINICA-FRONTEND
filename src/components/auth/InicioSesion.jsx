import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
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
        toast.update(toastId, {
          render:
            error.response?.data?.msg || "Hubo un error al iniciar sesión",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        setCargando(false);
      }
    }
  };

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-50 antialiased font-sans">
        <div className="hidden lg:flex lg:col-span-7 bg-gradient-to-br from-blue-700 via-blue-600 to-teal-600 p-12 flex-col justify-between relative overflow-hidden">
          {/* Decoración geométrica abstracta de fondo */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-teal-400/20 rounded-full blur-2xl" />

          {/* Logo de la Clínica / Nombre */}
          <div className="flex items-center gap-3 text-white relative z-10">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-wider uppercase">
              Doc Panel
            </span>
          </div>

          {/* Texto Principal */}
          <div className="max-w-xl relative z-10 my-auto">
            <span className="bg-white/10 text-teal-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
              Sistema de Gestión Médica
            </span>
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white mt-4 leading-tight">
              Optimiza la atención de tus pacientes.
            </h1>
            <p className="text-blue-100/90 mt-4 text-base xl:text-lg leading-relaxed">
              Accede al panel centralizado para gestionar historias clínicas,
              agendar citas de especialistas y monitorear el flujo de la clínica
              en tiempo real.
            </p>
          </div>

          {/* Footer de la sección izquierda */}
          <div className="text-xs text-blue-200/70 relative z-10">
            © {new Date().getFullYear()} Doc Panel. Todos los derechos
            reservados.
          </div>
        </div>

        <div className="col-span-1 lg:col-span-5 flex items-center justify-center p-6 sm:p-12 bg-white">
          <div className="w-full max-w-md mx-auto space-y-7">
            <div>
              <div className="lg:hidden flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>

              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center lg:text-left">
                Inicia Sesión
              </h2>
              <p className="text-sm text-gray-500 mt-2 text-center lg:text-left">
                Ingresa tus credenciales de administrador para continuar.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={datos.email}
                  onChange={(e) => handleChange(e)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-sm"
                  placeholder="ejemplo@clinica.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={datos.password}
                  autoComplete="new-password"
                  onChange={(e) => handleChange(e)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-sm"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={cargando}
                  className={`w-full py-3.5 px-4 rounded-xl text-sm font-semibold text-white shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 transform active:scale-[0.99] ${
                    cargando
                      ? "bg-gray-300 text-gray-500 shadow-none cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 shadow-blue-200 hover:shadow-xl hover:shadow-blue-300"
                  }`}
                >
                  {cargando ? "Autenticando..." : "Ingresar al Panel"}
                </button>
              </div>
            </form>

            <div className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-4 space-y-3">
              <div className="flex gap-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-amber-600 shrink-0 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-3.75m0-1.125a.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <div>
                  <h4 className="text-sm font-bold text-amber-800">
                    ¿Quieres probar la aplicación?
                  </h4>
                  <p className="text-xs text-amber-700/90 mt-0.5">
                    Usa el entorno de pruebas rápido. Permite crear hasta{" "}
                    <strong className="font-semibold">5 pacientes</strong>{" "}
                    temporales de forma limitada.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setDatos({
                    email: "demo@docpanel.com",
                    password: "demo123",
                  });
                }}
                className="w-full py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.042 9.152c.582.448 1.148.89 1.676 1.345m-1.676-1.345c-.58-.447-1.147-.89-1.678-1.344m3.354 2.689c-.528.456-1.094.898-1.676 1.345m1.676-1.345a46.33 46.33 0 0 1 3.336 2.779c.384.347.414.945.06 1.32-.23.243-.538.38-.857.38H2.122a1.125 1.125 0 0 1-.857-1.854 48.454 48.454 0 0 0 3.336-2.779m12.11 2.455c.53-.456 1.097-.898 1.678-1.344m-1.678 1.344A46.33 46.33 0 0 0 15.04 9.152m1.678 2.637H11.25V3.375c0-.621.504-1.125 1.125-1.125h1.5a1.125 1.125 0 0 1 1.125 1.125v4.062m0 4.375a46.33 46.33 0 0 1-3.337-2.779M6.205 9.152a46.33 46.33 0 0 1 3.337-2.779m-3.337 2.779c-.58.447-1.147.89-1.678 1.344m3.337-2.779A46.33 46.33 0 0 0 6.205 9.152m0 0a46.347 46.347 0 0 0-3.336-2.779 1.125 1.125 0 0 1 .06-1.7 48.456 48.456 0 0 1 3.276-2.429 1.125 1.125 0 0 1 1.442.124l2.121 2.121m-3.563 4.663c.528.456 1.094.898 1.676 1.345M11.25 15.75v-2.637m0 2.637a1.125 1.125 0 0 1-1.125 1.125h-1.5a1.125 1.125 0 0 1-1.125-1.125v-4.062M11.25 15.75c.53-.456 1.097-.898 1.678-1.344m-7.234-.149A46.33 46.33 0 0 0 9.03 11.79"
                  />
                </svg>
                Autocompletar Acceso Demo
              </button>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
              <Link
                to={"/olvide-password"}
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
              <Link
                to={"/crear-cuenta"}
                className="text-blue-600 hover:text-blue-700 font-bold tracking-wide transition-colors"
              >
                Solicitar una cuenta
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InicioSesion;
