import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import NavbarAdmin from "../navbar/NavbarAdmin";
import clienteAxios from "../../config/axios";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import BtnVolver from "../ui/BtnVolver";

const PerfilPaciente = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [eliminando, setEliminando] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    apellido: "",
    edad: "",
    dni: "",
    sexo: "",
    email: "",
    telefono: "",
    medicacion: "",
    sintomas: "",
    cobertura: "",
  });

  const obtenerPaciente = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await clienteAxios.get(`pacienteId/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        id: data.paciente[0].id,
        nombre: data.paciente[0].nombre || "",
        apellido: data.paciente[0].apellido || "",
        edad: data.paciente[0].edad || "",
        dni: data.paciente[0].dni || "",
        sexo: data.paciente[0].sexo || "",
        email: data.paciente[0].email || "",
        telefono: data.paciente[0].telefono || "",
        cobertura: data.paciente[0].cobertura || "Sin cobertura",
      });
    } catch (error) {
      const msg = error.response.data.msg;

      toast.error(msg);
      setTimeout(() => {
        navigate("/admin/pacientes");
      }, 2500);
    }
  };

  const eliminarPaciente = async () => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      const url = `/eliminar-paciente/${id}`;

      const { data } = await clienteAxios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.ok === true) {
        toast.success("Paciente eliminado correctamente", {
          position: "top-center",
        });
        setTimeout(() => {
          navigate("/admin/pacientes");
        }, 2500);
      } else {
        setCargando(false);
        toast.error(data.msg);
      }
    } catch (error) {
      setCargando(false);
      toast.error("Ocurrió un error");
    }
  };

  const handleEliminar = (e) => {
    e.preventDefault();
    setEliminando(true);
  };

  const handleCancelar = () => {
    setEliminando(false);
  };

  const handleNavigate = () => {
    navigate(`/admin/pacientes`);
  };

  useEffect(() => {
    obtenerPaciente();
  }, []);

  return (
    <>
      <NavbarAdmin />
      <BtnVolver onClick={handleNavigate} />

      <div className="max-w-4xl mx-4 lg:mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm mt-6 mb-12 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 md:p-8 text-white relative">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

          <div className="flex flex-col md:flex-row items-center gap-5 relative z-10 text-center md:text-left">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-2xl flex items-center justify-center uppercase tracking-wider shadow-inner">
              {formData.nombre ? formData.nombre[0] : "P"}
              {formData.apellido ? formData.apellido[0] : ""}
            </div>

            <div className="space-y-1">
              <span className="bg-blue-500/40 text-blue-100 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-blue-400/30">
                Historia Clínica Digital
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
                {formData.nombre && formData.apellido ? (
                  `${formData.nombre} ${formData.apellido}`
                ) : (
                  <Skeleton className="w-48 h-8 bg-blue-400/50" />
                )}
              </h2>
              <p className="text-blue-100/80 text-sm font-medium">
                DNI:{" "}
                {formData.dni || (
                  <Skeleton className="w-24 h-4 bg-blue-400/50 inline-block" />
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Nombre
              </label>
              <div className="mt-1.5 text-base font-semibold text-slate-800 bg-slate-50/50 px-3 py-2 rounded-xl border border-slate-100">
                {formData.nombre || <Skeleton />}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Apellido
              </label>
              <div className="mt-1.5 text-base font-semibold text-slate-800 bg-slate-50/50 px-3 py-2 rounded-xl border border-slate-100">
                {formData.apellido || <Skeleton />}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Edad
              </label>
              <div className="mt-1.5 text-base font-semibold text-slate-800 bg-slate-50/50 px-3 py-2 rounded-xl border border-slate-100">
                {formData.edad ? `${formData.edad} años` : <Skeleton />}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Documento (DNI)
              </label>
              <div className="mt-1.5 text-base font-semibold text-slate-800 bg-slate-50/50 px-3 py-2 rounded-xl border border-slate-100 tracking-wide">
                {formData.dni || <Skeleton />}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Sexo Biológico
              </label>
              <div className="mt-1.5 capitalize text-base font-semibold text-slate-800 bg-slate-50/50 px-3 py-2 rounded-xl border border-slate-100">
                {formData.sexo || <Skeleton />}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Teléfono de Contacto
              </label>
              <div className="mt-1.5 text-base font-semibold text-slate-800 bg-slate-50/50 px-3 py-2 rounded-xl border border-slate-100">
                {formData.telefono || <Skeleton />}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Correo Electrónico
              </label>
              <div className="mt-1.5 text-base font-semibold text-slate-800 bg-slate-50/50 px-3 py-2 rounded-xl border border-slate-100">
                {formData.email || <Skeleton />}
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Obra Social / Cobertura
              </label>
              <div className="mt-1.5 capitalize text-base font-semibold text-blue-700 bg-blue-50/40 px-3 py-2 rounded-xl border border-blue-100/60">
                {formData.cobertura || <Skeleton />}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end items-center gap-3 mt-10 pt-6 border-t border-slate-100">
            <button
              type="button"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-red-50 text-red-600 hover:text-red-700 text-sm font-bold border border-slate-200 hover:border-red-200 transition-all active:scale-[0.98] order-3 sm:order-1 sm:mr-auto"
              onClick={(e) => handleEliminar(e)}
            >
              Eliminar Paciente
            </button>

            <button
              type="button"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all active:scale-[0.98] order-1 sm:order-2"
              onClick={() => navigate(`/admin/pacientes/editar/${formData.id}`)}
            >
              Editar Datos
            </button>

            <button
              type="button"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-100 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-[0.98] order-2 sm:order-3"
              onClick={() =>
                navigate(`/admin/pacientes/historial/${formData.id}`)
              }
            >
              Ver Historial Clínico
            </button>
          </div>
        </div>

        {eliminando && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
            <div className="p-6 bg-white rounded-2xl shadow-xl max-w-sm w-full border border-slate-100 transform scale-100 transition-transform">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              </div>

              <h3 className="text-slate-900 font-bold text-lg text-center leading-snug">
                ¿Confirmas la eliminación?
              </h3>
              <p className="text-slate-500 text-xs text-center mt-2 leading-relaxed">
                Esta acción borrará permanentemente la ficha del paciente y todo
                su historial de turnos asociados. No se puede deshacer.
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  className="w-full py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-sm font-semibold transition"
                  onClick={handleCancelar}
                  disabled={cargando}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={cargando}
                  onClick={eliminarPaciente}
                  className={`w-full py-2.5 rounded-xl text-sm font-bold text-white shadow-sm transition ${
                    cargando
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                      : "bg-red-600 hover:bg-red-700 shadow-red-100"
                  }`}
                >
                  {cargando ? "Eliminando..." : "Sí, eliminar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PerfilPaciente;
