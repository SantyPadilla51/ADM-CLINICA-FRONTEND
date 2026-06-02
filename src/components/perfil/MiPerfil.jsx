import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import clienteAxios from "../../config/axios";
import NavbarAdmin from "../navbar/NavbarAdmin";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import BtnVolver from "../ui/BtnVolver";

const MiPerfil = () => {
  const navigate = useNavigate();
  const [eliminando, setEliminando] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [datos, setDatos] = useState({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    dni: "",
    especialidad: "",
  });

  const obtenerPerfil = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.get("/perfil", config);

      setDatos({
        id: data.doctor.id,
        nombre: data.doctor.nombre,
        apellido: data.doctor.apellido,
        email: data.doctor.email,
        especialidad: data.doctor.especialidad,
        dni: data.doctor.dni,
      });
    } catch (error) {
      toast.error("Hubo un error");
    }
  };

  const esDemoUser = datos?.email === "demo@docpanel.com";

  const eliminarPerfil = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      const url = `/eliminar-perfil/${id}`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(url, config);

      if (data.ok === true) {
        localStorage.removeItem("token");
        toast.success(data.msg, {
          position: "top-center",
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (error) {
      toast.error("Hubo un error");
    }
  };

  const handleEliminar = () => {
    setEliminando(true);
  };

  const handleCancelar = () => {
    setEliminando(false);
  };

  const handleNavigate = () => {
    navigate(`/admin/pacientes`);
  };

  useEffect(() => {
    obtenerPerfil();
  }, []);

  return (
    <>
      <NavbarAdmin />

      <BtnVolver onClick={handleNavigate} />

      <div className="mx-4 max-w-2xl md:mx-auto bg-white border border-slate-100 shadow-sm rounded-2xl mt-10 overflow-hidden">
        <div className="p-6 pb-4 border-b border-slate-100 text-center sm:text-left flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">
              Mi Perfil
            </h1>
            <p className="text-slate-400 text-xs font-medium mt-0.5">
              Información profesional y credenciales de la cuenta
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100/80">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Nombre
              </h4>
              <p className="text-sm font-bold text-slate-800 mt-1 capitalize">
                {datos.nombre || <Skeleton />}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100/80">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Apellido
              </h4>
              <p className="text-sm font-bold text-slate-800 mt-1 capitalize">
                {datos.apellido || <Skeleton />}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100/80">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                DNI
              </h4>
              <p className="text-sm font-semibold text-slate-700 mt-1">
                {datos.dni || <Skeleton />}
              </p>
            </div>

            <div className="p-3.5 bg-blue-50/30 rounded-xl border border-blue-100/30">
              <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />{" "}
                Especialidad
              </h4>
              <p className="text-sm font-bold text-slate-800 mt-1">
                {datos.especialidad || <Skeleton />}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100/80 sm:col-span-2">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Correo Electrónico
              </h4>
              <p className="text-sm font-semibold text-slate-700 mt-1 break-all">
                {datos.email || <Skeleton />}
              </p>
            </div>
          </div>
        </div>

        {!esDemoUser && (
          <div className="flex items-center justify-between p-4 bg-slate-50/50 border-t border-slate-100 gap-3">
            <button
              onClick={handleEliminar}
              className="px-4 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all"
            >
              Eliminar Cuenta
            </button>

            <button
              onClick={() => navigate(`/editar-perfil/${datos.id}`)}
              className="inline-flex items-center justify-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-100 active:scale-[0.98] transition-all"
            >
              Editar Perfil
            </button>
          </div>
        )}

        {eliminando && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-sm p-6 relative animate-in fade-in zoom-in-95 duration-200 text-center">
              {/* Icono de advertencia */}
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
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
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>

              <h3 className="text-base font-black text-slate-800 tracking-tight">
                ¿Confirmar eliminación?
              </h3>
              <p className="text-slate-400 text-xs font-medium mt-1.5 px-2 leading-relaxed">
                Esta acción es permanente. Perderás el acceso a todo el
                historial de pacientes y turnos agendados.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-2 mt-5">
                <button
                  onClick={handleCancelar}
                  disabled={cargando}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-all disabled:opacity-50 ordered-2 sm:order-1"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={cargando}
                  onClick={() => eliminarPerfil(datos.id)}
                  className={`w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-sm order-1 sm:order-2 ${
                    cargando
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                      : "bg-rose-600 hover:bg-rose-700 shadow-rose-100"
                  }`}
                >
                  {cargando ? "Eliminando..." : "Sí, eliminar cuenta"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MiPerfil;
