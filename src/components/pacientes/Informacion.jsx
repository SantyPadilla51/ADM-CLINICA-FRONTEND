import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import clienteAxios from "../../config/axios";

const Informacion = ({ pacienteID }) => {
  const [paciente, setPaciente] = useState([]);

  const getPaciente = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `/pacienteId/${pacienteID}`;
      const { data } = await clienteAxios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPaciente(data.paciente[0]);
    } catch (error) {
      toast.error("Ha ocurrido un error al obtener el paciente");
    }
  };

  useEffect(() => {
    getPaciente();
  }, []);

  return (
    <>
      <section className="max-w-2xl mx-auto p-4 md:p-6 row-start-1">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              Información del Paciente
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Nombre
              </span>
              <p className="text-base font-semibold text-slate-800">
                {paciente.nombre || <Skeleton className="h-5 w-32" />}
              </p>
            </div>

            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Apellido
              </span>
              <p className="text-base font-semibold text-slate-800">
                {paciente.apellido || <Skeleton className="h-5 w-32" />}
              </p>
            </div>

            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Documento (DNI)
              </span>
              <p className="text-base font-medium text-slate-700 tracking-wide">
                {paciente.dni || <Skeleton className="h-5 w-28" />}
              </p>
            </div>

            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Edad
              </span>
              <p className="text-base font-medium text-slate-700">
                {paciente.edad ? (
                  `${paciente.edad} años`
                ) : (
                  <Skeleton className="h-5 w-16" />
                )}
              </p>
            </div>

            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Sexo
              </span>
              <div>
                {paciente.sexo ? (
                  <span
                    className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-md ${
                      paciente.sexo.toLowerCase() === "femenino" ||
                      paciente.sexo.toLowerCase() === "f"
                        ? "bg-pink-50 text-pink-700 border border-pink-100"
                        : "bg-blue-50 text-blue-700 border border-blue-100"
                    }`}
                  >
                    {paciente.sexo}
                  </span>
                ) : (
                  <Skeleton className="h-5 w-20" />
                )}
              </div>
            </div>

            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Teléfono
              </span>
              <p className="text-base font-medium text-slate-700 flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-3.5 h-3.5 text-slate-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
                {paciente.telefono || <Skeleton className="h-5 w-36" />}
              </p>
            </div>

            <div className="sm:col-span-2 space-y-0.5 pt-2 border-t border-slate-50">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Correo Electrónico
              </span>
              <p className="text-base font-medium text-slate-600 truncate">
                {paciente.email || <Skeleton className="h-5 w-full max-w-sm" />}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Informacion;
