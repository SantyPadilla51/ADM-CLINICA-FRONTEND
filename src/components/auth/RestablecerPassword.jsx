import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clienteAxios from "../../config/axios";
import BtnVolver from "../ui/BtnVolver";

const RestablecerPassword = () => {
  const [cargando, setCargando] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    if (email === "") {
      toast.error("Debes ingresar un correo electrónico");
      setCargando(false);
      return;
    }

    try {
      const url = "olvide-password";

      const { data } = await clienteAxios.post(
        url,
        { email },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (data.ok === true) {
        toast.success("Hemos enviado un email con las instrucciones");
        setCargando(false);
        setEmail(" ");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        toast.error(
          "Hubo un error al enviar el correo electrónico. Por favor, inténtelo más tarde.",
        );
        setCargando(false);
        return;
      }
    } catch (error) {
      toast.error(
        "Hubo un error al enviar el correo electrónico. Por favor, inténtelo más tarde.",
      );
      setCargando(false);
      return;
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNavigate = () => {
    navigate(`/`);
  };

  return (
    <>
      <Navbar />
      <BtnVolver onClick={handleNavigate} />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-5 -mt-20 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Encabezado e Ícono */}
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
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">
              Restablecer Contraseña
            </h1>
            <p className="text-slate-400 text-xs font-medium mt-1.5 px-4 leading-relaxed">
              Ingresá tu correo electrónico para recibir las instrucciones de
              recuperación
            </p>
          </div>

          {/* Campo: Email */}
          <div className="flex flex-col space-y-1.5">
            <label
              htmlFor="email"
              className="text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="ejemplo@correo.com"
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
              autoComplete="email"
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
                  <ClipLoader color={"#fff"} size={18} />
                  <span>Enviando...</span>
                </div>
              ) : (
                "Enviar Instrucciones"
              )}
            </button>
          </div>

          {/* Enlace de retorno opcional (mejora de flujo UX) */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => window.history.back()} // O la lógica de navegación que uses
              className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Volver al inicio de sesión
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RestablecerPassword;
