import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import clienteAxios from "../../config/axios";
import NavbarAdmin from "../navbar/NavbarAdmin";
import "react-toastify/dist/ReactToastify.css";
import BtnVolver from "../ui/BtnVolver";

const EditarPaciente = () => {
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    dni: "",
    sexo: "",
    email: "",
    telefono: "",
    cobertura: "",
  });

  const obtenerPaciente = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `/pacienteId/${id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.get(url, config);

      setFormData({
        nombre: data.paciente[0].nombre || "",
        apellido: data.paciente[0].apellido || "",
        edad: data.paciente[0].edad || "",
        dni: data.paciente[0].dni || "",
        sexo: data.paciente[0].sexo || "",
        email: data.paciente[0].email || "",
        telefono: data.paciente[0].telefono || "",
        cobertura: data.paciente[0].cobertura || "",
      });
    } catch (error) {
      toast.error("Ha ocurrido un error");
    }
  };

  const actualizarPaciente = async (e) => {
    e.preventDefault();
    setCargando(true);
    const toastId = toast.loading("Actualizando Paciente..");
    try {
      const token = localStorage.getItem("token");
      const url = `/actualizar-paciente/${id}`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(
        url,
        JSON.stringify(formData),
        config,
      );

      if (data.ok === true) {
        toast.update(toastId, {
          render: "Paciente actualizado correctamente",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/admin/pacientes");
        }, 1000);
      } else {
        setCargando(false);
        toast.error(data.msg);
      }
    } catch (error) {
      setCargando(false);
      toast.error("Ocurrio un error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNavigate = () => {
    navigate(`/admin/pacientes/perfilPaciente/${id}`);
  };

  useEffect(() => {
    obtenerPaciente();
  }, []);

  return (
    <>
      <NavbarAdmin />

      <BtnVolver onClick={handleNavigate} />

      <div className="max-w-4xl mx-4 md:mx-6 lg:mx-auto bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm mt-6">
        <div className="mb-6 pb-4 border-b border-slate-100 text-center md:text-left">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            Editar Perfil del Paciente
          </h2>
          <p className="text-slate-400 text-xs font-medium mt-0.5">
            Modifique los datos filiatorios y de contacto del paciente
          </p>
        </div>

        <form
          onSubmit={actualizarPaciente}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
        >
          {/* Campo: Nombre */}
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
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Escribe el nombre"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Campo: Apellido */}
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
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Escribe el apellido"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Campo: Edad */}
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
              value={formData.edad}
              onChange={handleChange}
              placeholder="Ej. 35"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Campo: DNI */}
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
              value={formData.dni}
              onChange={handleChange}
              placeholder="Número de documento sin puntos"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Campo: Teléfono */}
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
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Código de área + número"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Campo: Sexo */}
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
              value={formData.sexo}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 cursor-pointer"
            >
              <option value="">Selecciona una opción</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
          </div>

          {/* Campo: Cobertura Médica */}
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
              value={formData.cobertura}
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
              <option value="hospital britanico">Hospital Británico</option>
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

          {/* Campo: Email */}
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
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Fila de Botones / Acciones */}
          <div className="md:col-span-2 pt-3 flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button
              type="submit"
              disabled={cargando}
              className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-md active:scale-[0.99] ${
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
                  Actualizando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditarPaciente;
