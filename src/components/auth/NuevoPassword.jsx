import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from "../navbar/Navbar";
import clienteAxios from "../../config/axios";
import "react-toastify/dist/ReactToastify.css";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    if (password === repetirPassword) {
      try {
        setCargando(true);
        const url = `/olvide-password/${token}`;
        console.log(password);

        const { data } = await clienteAxios.post(url, { password });
        console.log(data);

        if (data.ok != true) {
          toast.error("Hubo un error al cambiar la contraseña");
          setCargando(false);
        } else {
          toast.success(data.msg);
          setCargando(false);

          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (error) {
        toast.error("Ha ocurrido un error");
        console.log(error);

        setCargando(false);
      }
    } else {
      toast.error("Las contraseñas no coinciden");
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    } else {
      setRepetirPassword(e.target.value);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-5 -mt-20 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Encabezado e Ícono de Llave */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
              </svg>
            </div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">
              Nueva Contraseña
            </h1>
            <p className="text-slate-400 text-xs font-medium mt-1.5 px-2 leading-relaxed">
              Por seguridad, elegí una clave fuerte que no hayas usado
              recientemente
            </p>
          </div>

          {/* Campo: Nuevo Password */}
          <div className="flex flex-col space-y-1.5">
            <label
              htmlFor="password"
              className="text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Nuevo Password
            </label>
            <input
              id="password"
              type="password" /* Corregido a password por seguridad */
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-300"
            />
          </div>

          {/* Campo: Repetir Password */}
          <div className="flex flex-col space-y-1.5">
            <label
              htmlFor="repetirPassword"
              className="text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Repite el Password
            </label>
            <input
              id="repetirPassword"
              type="password" /* Corregido a password por seguridad */
              name="repetirPassword"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-300"
            />
          </div>

          {/* Botón de Envío */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={cargando}
              className={`w-full inline-flex items-center justify-center h-11 rounded-xl text-xs font-bold text-white transition-all shadow-md active:scale-[0.99] ${
                cargando
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-100"
              }`}
            >
              {cargando ? (
                <div className="flex items-center gap-2">
                  <ClipLoader color="#fff" size={18} />
                  <span>Actualizando...</span>
                </div>
              ) : (
                "Guardar Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NuevoPassword;
