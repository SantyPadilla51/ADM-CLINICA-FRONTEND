import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import clienteAxios from "../../config/axios";
import NavbarAdmin from "../navbar/NavbarAdmin";
import "react-toastify/dist/ReactToastify.css";

const Pacientes = () => {
  const navigate = useNavigate();
  const [buscador, setBuscador] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [pacienteParticular, setPacienteParticular] = useState(null);

  const buscarPaciente = async (e) => {
    e.preventDefault();
    const dni = Number(buscador);
    try {
      const token = localStorage.getItem("token");
      const url = `/pacientes/${dni}`;
      const { data } = await clienteAxios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPacienteParticular(data.paciente[0]);
    } catch (error) {
      toast.error("No se encontro al paciente");
    }
  };

  const obtenerPacientes = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = "/pacientes";
      const { data } = await clienteAxios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPacientes(data);
    } catch (error) {
      toast.error("Hubo un error");
    }
  };

  const verPacientes = () => {
    setPacienteParticular(null);
    setBuscador("");
  };

  useEffect(() => {
    obtenerPacientes();
  }, []);

  return (
    <>
      <NavbarAdmin />
      <div className="mx-4 my-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <form className="w-full lg:col-span-5" onSubmit={buscarPaciente}>
          <div className="relative flex items-center group">
            {/* Icono de Lupa Decorativo */}
            <div className="absolute left-4 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.603Z"
                />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Buscar paciente por DNI..."
              className="w-full pl-12 pr-28 py-3 rounded-xl border border-slate-200 text-gray-800 placeholder-slate-400 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-sm font-medium tracking-wide"
              value={buscador}
              onChange={(e) => setBuscador(e.target.value)}
              minLength={8}
              maxLength={8}
            />

            <button
              type="submit"
              className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all duration-150 active:scale-[0.97]"
            >
              Buscar
            </button>
          </div>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:col-span-7">
          <button
            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-semibold text-xs border border-slate-200/60 hover:border-blue-200 transition-all duration-150 shadow-sm active:scale-[0.98]"
            onClick={() => navigate("turnos")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            Turnos
          </button>

          <button
            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-100 hover:shadow-lg hover:shadow-blue-200 transition-all duration-150 active:scale-[0.98]"
            onClick={() => navigate("crear-paciente")}
          >
            <svg
              xmlns="http://www.w3.org/2000/xl"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Nuevo Paciente
          </button>

          <button
            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-semibold text-xs border border-slate-200/60 hover:border-blue-200 transition-all duration-150 shadow-sm active:scale-[0.98]"
            onClick={verPacientes}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-2.533-4.656c-.83-.22-1.691-.343-2.583-.343s-1.754.124-2.583.343A4.125 4.125 0 0 0 14 18.59c0 .185.015.368.043.548ZM6 10.5a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Zm1.75 8.25a8.91 8.91 0 0 0 5.484-1.39A4.124 4.124 0 0 0 10.5 13H1.5a4.125 4.125 0 0 0-2.533 4.656 8.9 8.9 0 0 0 5.483 1.39h1.3ZM19.5 10.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
              />
            </svg>
            Ver Todos
          </button>

          <button
            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold text-xs border border-teal-200/50 transition-all duration-150 shadow-sm active:scale-[0.98]"
            onClick={() => navigate("perfil")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            Mi Perfil
          </button>
        </div>
      </div>

      <div className=" md:grid md:grid-cols-3 lg:grid lg:grid-cols-5 gap-4 m-8">
        {pacienteParticular ? (
          <div
            className="bg-white flex flex-col gap-10 p-2 rounded-md"
            key={pacienteParticular.id}
          >
            <div className="flex flex-col gap-2">
              <p className="font-semibold">
                Nombre:{" "}
                <span className="text-black font-normal">
                  {pacienteParticular.nombre}
                </span>
              </p>
              <p className="font-semibold">
                Apellido:{" "}
                <span className="font-normal">
                  {pacienteParticular.apellido}
                </span>
              </p>
              <p className="font-semibold">
                Edad:{" "}
                <span className="text-black font-normal">
                  {pacienteParticular.edad}
                </span>
              </p>
              <p className="font-semibold">
                Sexo:{" "}
                <span className="text-black font-normal">
                  {pacienteParticular.sexo}
                </span>
              </p>
              <p className="font-semibold">
                Telefono:{" "}
                <span className="text-black font-normal">
                  {pacienteParticular.telefono}
                </span>
              </p>
              <p className="font-semibold">
                DNI:{" "}
                <span className="text-black font-normal">
                  {pacienteParticular.dni}
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                className="rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                onClick={() =>
                  navigate(`perfilPaciente/${pacienteParticular.id}`)
                }
              >
                Ver Paciente
              </button>
            </div>
          </div>
        ) : pacientes.length === 0 ? (
          <div className="col-start-2 col-end-5 flex flex-col items-center justify-center p-8 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200/80 text-center animate-in fade-in duration-200">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mb-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="17" y1="11" x2="23" y2="11" />
              </svg>
            </div>

            <p className="text-sm font-semibold text-slate-500 tracking-tight">
              No hay pacientes registrados
            </p>
            <p className="text-xs font-medium text-slate-400 mt-0.5">
              Los pacientes que dejen consultas aparecerán en esta sección.
            </p>
          </div>
        ) : (
          pacientes.map((paciente) => (
            <div
              key={paciente.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200 p-5 flex flex-col justify-between gap-6 relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center uppercase tracking-wider shrink-0">
                    {paciente.nombre[0]}
                    {paciente.apellido[0]}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-gray-900 text-lg leading-snug truncate">
                      {paciente.nombre} {paciente.apellido}
                    </h3>

                    <span
                      className={`inline-flex items-center px-2 py-0.5 mt-1 rounded-md text-xs font-medium ${
                        paciente.sexo?.toLowerCase() === "femenino" ||
                        paciente.sexo?.toLowerCase() === "f"
                          ? "bg-pink-50 text-pink-700 border border-pink-100"
                          : "bg-blue-50 text-blue-700 border border-blue-100"
                      }`}
                    >
                      {paciente.sexo}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-2 border-t border-slate-50 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Edad
                    </p>
                    <p className="font-medium text-slate-800 mt-0.5">
                      {paciente.edad} años
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      DNI
                    </p>
                    <p className="font-medium text-slate-800 mt-0.5 tracking-wide">
                      {paciente.dni}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Teléfono
                    </p>
                    <p className="font-medium text-slate-700 mt-0.5 flex items-center gap-1.5">
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
                      {paciente.telefono || "No registrado"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  className="w-full bg-slate-50 hover:bg-blue-600 text-slate-700 hover:text-white text-xs font-bold py-2.5 px-4 rounded-xl border border-slate-200/60 hover:border-blue-600 shadow-sm transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                  onClick={() => navigate(`perfilPaciente/${paciente.id}`)}
                >
                  Ver Ficha Médica
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Pacientes;
