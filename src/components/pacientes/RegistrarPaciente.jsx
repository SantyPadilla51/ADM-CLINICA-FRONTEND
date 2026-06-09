import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import NavbarAdmin from "../navbar/NavbarAdmin";
import "react-toastify/dist/ReactToastify.css";
import BtnVolver from "../ui/BtnVolver";

const RegistrarPaciente = () => {
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState({
    email: "",
    edad: "",
    nombre: "",
    apellido: "",
    dni: "",
    sexo: "",
    telefono: "",
    cobertura: "",
  });

  const handleChange = (e) => {
    setPaciente({ ...paciente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    const toastID = toast.loading("Guardando Paciente");

    try {
      const token = localStorage.getItem("token");
      const url = "/crear-paciente";
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(url, paciente, config);

      if (data.ok === true) {
        toast.update(toastID, {
          render: "Paciente registrado correctamente",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setCargando(false);
        setTimeout(() => {
          navigate("/admin/pacientes");
        }, 1500);
      } else {
        setCargando(false);
        toast.update(toastID, {
          render: data.msg,
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
      }
    } catch (error) {
      const msg = error.response.data.msg;

      setCargando(false);
      toast.update(toastID, {
        render: msg,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      return;
    }
  };

  const handleNavigate = () => {
    navigate(`/admin/pacientes`);
  };

  return (
    <>
      <NavbarAdmin />

      <BtnVolver onClick={handleNavigate} />

      <div className="max-w-4xl mx-4 md:mx-6 lg:mx-auto bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm mt-6">
        <div className="mb-6 pb-4 border-b border-slate-100 text-center md:text-left">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            Registrar Nuevo Paciente
          </h2>
          <p className="text-slate-400 text-xs font-medium mt-0.5">
            Complete la información básica para abrir la historia clínica
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
        >
          <div className="space-y-1.5">
            <label
              htmlFor="nombre"
              className="text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={paciente.nombre}
              onChange={handleChange}
              placeholder="Escribe el nombre"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="apellido"
              className="text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={paciente.apellido}
              onChange={handleChange}
              placeholder="Escribe el apellido"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="edad"
              className="text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Edad
            </label>
            <input
              type="text"
              maxLength={3}
              id="edad"
              name="edad"
              value={paciente.edad}
              onChange={handleChange}
              placeholder="Ej. 28"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="dni"
              className="text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              DNI
            </label>
            <input
              type="text"
              maxLength={8}
              id="dni"
              name="dni"
              value={paciente.dni}
              onChange={handleChange}
              placeholder="Número de documento sin puntos"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="telefono"
              className="text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Teléfono de Contacto
            </label>
            <input
              type="text"
              maxLength={10}
              id="telefono"
              name="telefono"
              value={paciente.telefono}
              onChange={handleChange}
              placeholder="Código de área + número"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="sexo"
              className="text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Sexo Biológico
            </label>
            <select
              id="sexo"
              name="sexo"
              value={paciente.sexo}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="">Selecciona una opción</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="no definido">No definido</option>
            </select>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label
              htmlFor="cobertura"
              className="text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Obra Social / Prepaga
            </label>
            <select
              id="cobertura"
              name="cobertura"
              value={paciente.cobertura}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="">Particular / Sin Cobertura</option>
              <option value="osde">OSDE</option>
              <option value="swiss medical">Swiss Medical</option>
              <option value="galeno">Galeno</option>
              <option value="medicus">Medicus</option>
              <option value="omint">Omint</option>
              <option value="hospital italiano">Hospital Italiano</option>
              <option value="hospital britanico">
                Hospital Técnico Británico
              </option>
              <option value="sancor salud">Sancor Salud</option>
              <option value="medifé">Medifé</option>
              <option value="accord salud">Accord Salud</option>
              <option value="osdepyme">OSDEPYME</option>
              <option value="premedic">Premedic</option>
              <option value="asociart">Asociart ART</option>
              <option value="ioma">IOMA</option>
              <option value="pami">PAMI</option>
              <option value="ospat">OSPAT</option>
              <option value="ospaca">OSPACA</option>
              <option value="ospjn">OSPJN (Poder Judicial)</option>
              <option value="ospedyc">OSPedyC</option>
            </select>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label
              htmlFor="email"
              className="text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={paciente.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="md:col-span-2 pt-3 flex justify-end">
            <button
              type="submit"
              disabled={cargando}
              className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-md active:scale-[0.99] w-full sm:w-auto ${
                cargando
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-100"
              }`}
            >
              {cargando ? (
                <>
                  <svg
                    className="animate-spin h-3.5 w-3.5 text-slate-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Procesando...
                </>
              ) : (
                "Registrar Paciente"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrarPaciente;
