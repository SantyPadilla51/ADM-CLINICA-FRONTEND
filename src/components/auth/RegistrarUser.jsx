import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from "../navbar/Navbar";
import clienteAxios from "../../config/axios";
import BtnVolver from "../ui/BtnVolver";

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-start pb-10">
        {/* Botón de volver posicionado correctamente */}
        <div className="p-4 w-full max-w-7xl mx-auto">
          <BtnVolver onClick={handleNavigate} />
        </div>

        <div className="flex-grow w-full flex items-center justify-center px-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300"
          >
            {/* Encabezado del Formulario */}
            <div className="text-center md:text-left border-b border-slate-100 pb-4">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                Registro de Usuario
              </h3>
              <p className="text-slate-400 text-xs font-medium mt-1">
                Cree su cuenta profesional para comenzar a gestionar sus turnos
                médicos
              </p>
            </div>

            {/* Contenedor Grid Inteligente para los Campos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  label: "Nombre",
                  name: "nombre",
                  type: "text",
                  fullWidth: false,
                },
                {
                  label: "Apellido",
                  name: "apellido",
                  type: "text",
                  fullWidth: false,
                },
                {
                  label: "DNI",
                  name: "dni",
                  type: "text",
                  minLength: 8,
                  maxLength: 8,
                  fullWidth: false,
                },
                {
                  label: "Teléfono",
                  name: "telefono",
                  type: "text",
                  minLength: 10,
                  maxLength: 10,
                  fullWidth: false,
                },
                {
                  label: "Correo electrónico",
                  name: "email",
                  type: "email",
                  fullWidth: true, // Ocupa toda la fila en desktop por legibilidad
                },
                {
                  label: "Contraseña",
                  name: "password",
                  type: "password",
                  fullWidth: true,
                },
              ].map(
                ({ label, name, type, minLength, maxLength, fullWidth }) => (
                  <div
                    className={`flex flex-col space-y-1.5 ${fullWidth ? "md:col-span-2" : ""}`}
                    key={name}
                  >
                    <label
                      htmlFor={name}
                      className="text-xs font-bold text-slate-500 uppercase tracking-wider"
                    >
                      {label}
                    </label>
                    <input
                      id={name}
                      type={type}
                      name={name}
                      minLength={minLength}
                      maxLength={maxLength}
                      required
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
                      autoComplete="off"
                    />
                  </div>
                ),
              )}

              {/* Campo: Especialidad (Último de la grilla, ancho completo) */}
              <div className="flex flex-col space-y-1.5 md:col-span-2">
                <label
                  htmlFor="especialidad"
                  className="text-xs font-bold text-slate-500 uppercase tracking-wider"
                >
                  Especialidad Médica
                </label>
                <select
                  id="especialidad"
                  name="especialidad"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 cursor-pointer"
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
            </div>

            {/* Botón de Envío */}
            <div className="pt-2">
              <button
                type="submit"
                className={`w-full inline-flex items-center justify-center h-12 rounded-xl text-sm font-bold text-white transition-all shadow-md active:scale-[0.99] ${
                  cargando
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-100"
                }`}
                disabled={cargando}
              >
                {cargando ? (
                  <div className="flex items-center gap-2">
                    <ClipLoader color="#fff" size={20} />
                    <span>Creando cuenta profesional...</span>
                  </div>
                ) : (
                  "Crear Usuario"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrarUser;
