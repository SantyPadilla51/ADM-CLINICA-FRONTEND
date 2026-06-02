import { useEffect, useState } from "react";
import NavbarAdmin from "../navbar/NavbarAdmin";
import BtnVolver from "../ui/BtnVolver";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import { toast } from "react-toastify";

const Turnos = () => {
  const navigate = useNavigate();
  const [estadoActivo, setEstadoActivo] = useState("Pendiente");
  const [turnos, setTurnos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editTurno, setEditTurno] = useState(null);
  const [crearTurno, setCrearTurno] = useState(null);
  const [nuevoTurno, setNuevoTurno] = useState({
    paciente: "",
    hora: "",
    fecha: "",
  });
  const [turnoEditado, setTurnoEditado] = useState({
    paciente: "",
    hora: "",
    fecha: "",
  });

  const agendarTurno = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const token = localStorage.getItem("token");

      const url = "crear-turno";
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(url, nuevoTurno, config);

      setCrearTurno(null);
      setNuevoTurno("");

      if (data.ok == true) {
        toast.success("Turno creado", {
          position: "top-right",
        });
        setCargando(false);
        getTurnos();
      } else {
        toast.error("Hubo un error al crear el turno", {
          position: "top-right",
        });
        setCargando(false);
      }
    } catch (error) {
      toast.error("Hubo un error al crear el turno");
      setCargando(false);
    }
  };

  const getTurnos = async () => {
    try {
      const url = "turnos";
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios(url, config);

      setTurnos(data);
    } catch (error) {
      console.log("Hubo un error");
    }
  };

  const handleChange = (e) => {
    setNuevoTurno({ ...nuevoTurno, [e.target.name]: e.target.value });
  };

  const handleChangeEdit = (e) => {
    setTurnoEditado({ ...turnoEditado, [e.target.name]: e.target.value });
  };

  const handleNavigate = () => {
    navigate(`/admin/pacientes`);
  };

  const handleEdit = (id) => {
    const turno = turnos.find((t) => t.id === id);

    setTurnoEditado({
      id: turno.id,
      paciente: turno.paciente,
      hora: turno.hora,
      fecha: turno.fecha,
      estado: turno.estado,
      doctorId: turno.doctorId,
    });
    setEditTurno(true);
  };

  const editarTurno = async (e, id) => {
    e.preventDefault();
    setCargando(true);
    try {
      const url = `turnos/${id}`;
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(url, turnoEditado, config);

      if (data.ok == true) {
        toast.success("Turno Editado", {
          position: "top-right",
        });
        setEditTurno(null);
        setCargando(false);
        getTurnos();
      }
    } catch (error) {
      toast.error({
        position: "top-right",
        render: data.msg,
        type: "success",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    getTurnos();
  }, []);

  return (
    <>
      <NavbarAdmin />
      <BtnVolver onClick={handleNavigate} />
      {crearTurno ? (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Botón de cerrar */}
            <button
              onClick={() => setCrearTurno(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="mb-5 border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-slate-800 tracking-tight">
                Agendar Nuevo Turno
              </h2>
              <p className="text-slate-400 text-xs font-medium mt-0.5">
                Asigne una fecha y hora para la consulta
              </p>
            </div>

            <form onSubmit={(e) => agendarTurno(e)} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="paciente"
                  className="text-xs font-bold text-slate-500 uppercase tracking-wider"
                >
                  Paciente
                </label>
                <input
                  id="paciente"
                  name="paciente"
                  onChange={handleChange}
                  type="text"
                  placeholder="Nombre completo del paciente"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="fecha"
                  className="text-xs font-bold text-slate-500 uppercase tracking-wider"
                >
                  Fecha
                </label>
                <input
                  id="fecha"
                  name="fecha"
                  onChange={handleChange}
                  type="date"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 cursor-pointer"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="hora"
                  className="text-xs font-bold text-slate-500 uppercase tracking-wider"
                >
                  Hora
                </label>
                <input
                  id="hora"
                  name="hora"
                  onChange={handleChange}
                  type="time"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 cursor-pointer"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={cargando}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-md active:scale-[0.99] ${
                  cargando
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-100"
                }`}
              >
                {cargando ? "Agendando..." : "Confirmar Turno"}
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {/* --- MODAL: EDITAR TURNO --- */}
      {editTurno ? (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Botón de cerrar */}
            <button
              onClick={() => setEditTurno(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="mb-5 border-b border-slate-100 pb-3">
              <h2 className="text-lg font-black text-slate-800 tracking-tight">
                Modificar Turno
              </h2>
              <p className="text-slate-400 text-xs font-medium mt-0.5">
                Actualice los datos o cambie el estado del turno
              </p>
            </div>

            <form
              onSubmit={(e) => editarTurno(e, turnoEditado.id)}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label
                  htmlFor="paciente"
                  className="text-xs font-bold text-slate-500 uppercase tracking-wider"
                >
                  Paciente
                </label>
                <input
                  id="paciente"
                  name="paciente"
                  value={turnoEditado.paciente}
                  onChange={handleChangeEdit}
                  type="text"
                  placeholder="Nombre del paciente"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="fecha"
                  className="text-xs font-bold text-slate-500 uppercase tracking-wider"
                >
                  Fecha
                </label>
                <input
                  id="fecha"
                  name="fecha"
                  value={turnoEditado.fecha}
                  onChange={handleChangeEdit}
                  type="date"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 cursor-pointer"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="hora"
                  className="text-xs font-bold text-slate-500 uppercase tracking-wider"
                >
                  Hora
                </label>
                <input
                  id="hora"
                  name="hora"
                  value={turnoEditado.hora}
                  onChange={handleChangeEdit}
                  type="time"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 cursor-pointer"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="estado"
                  className="text-xs font-bold text-slate-500 uppercase tracking-wider"
                >
                  Estado del Turno
                </label>
                <select
                  name="estado"
                  id="estado"
                  value={turnoEditado.estado}
                  onChange={handleChangeEdit}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 cursor-pointer"
                  required
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Realizado">Realizado</option>
                  <option value="Cancelado">Cancelado</option>
                  <option value="Reprogramado">Reprogramado</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={cargando}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-md active:scale-[0.99] ${
                  cargando
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-100"
                }`}
              >
                {cargando ? "Guardando..." : "Confirmar Cambios"}
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {/* --- MAIN CONTENT: DASHBOARD DE TURNOS --- */}
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Header del Dashboard */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              Dashboard de Turnos
            </h1>
            <p className="text-slate-400 text-xs font-medium mt-0.5">
              Gestione las citas y estados de atención médica diaria
            </p>
          </div>
          <button
            onClick={() => setCrearTurno(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-100 active:scale-[0.98] transition-all self-start sm:self-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Agendar Turno
          </button>
        </div>

        {/* Filtros por Estado (Pills estilo Apple/Clean) */}
        <div className="flex flex-wrap gap-2 mb-6 bg-slate-100/70 p-1.5 rounded-2xl w-auto inline-flex">
          {["Pendiente", "Realizado", "Cancelado", "Reprogramado"].map(
            (estado) => (
              <button
                key={estado}
                onClick={() => setEstadoActivo(estado)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  estadoActivo === estado
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {estado}
              </button>
            ),
          )}
        </div>

        {/* Tarjetas de Resumen Numérico */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total {estadoActivo || "Turnos"}
            </h2>
            <p className="text-3xl font-black text-blue-600 mt-1">
              {turnos.filter((turno) => turno.estado === estadoActivo).length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Próximo Turno
            </h2>
            <p className="text-base font-bold text-slate-700 mt-2 truncate">
              {turnos.length > 0
                ? `${turnos[0].paciente} (${turnos[0].hora.slice(0, 5)} hs)`
                : "Sin turnos registrados"}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm sm:col-span-2 lg:col-span-1">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Fecha Actual
            </h2>
            <p className="text-base font-bold text-slate-700 mt-2">
              {new Date().toLocaleDateString("es-AR", {
                weekday: "long",
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>
        </div>

        {/* Tabla de Gestión */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Paciente</th>
                  <th className="px-6 py-3.5">Fecha</th>
                  <th className="px-6 py-3.5">Hora</th>
                  <th className="px-6 py-3.5">Estado</th>
                  <th className="px-6 py-3.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {loading ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-slate-400 text-xs font-bold"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 text-blue-500"
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
                        Cargando hoja de turnos...
                      </div>
                    </td>
                  </tr>
                ) : turnos.filter((t) => t.estado === estadoActivo).length ===
                  0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-slate-400 text-xs font-semibold"
                    >
                      No hay turnos registrados en estado{" "}
                      <span className="font-bold">"{estadoActivo}"</span>
                    </td>
                  </tr>
                ) : (
                  turnos
                    .filter((t) => t.estado === estadoActivo)
                    .map((turno) => (
                      <tr
                        key={turno.id}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="px-6 py-3.5 font-bold text-slate-800 capitalize">
                          {turno.paciente}
                        </td>
                        <td className="px-6 py-3.5 text-slate-500">
                          {turno.fecha.split("-").reverse().join("/")}
                        </td>
                        <td className="px-6 py-3.5 text-slate-600 font-semibold">
                          {turno.hora.slice(0, 5)} hs
                        </td>
                        <td className="px-6 py-3.5">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                              turno.estado === "Pendiente"
                                ? "bg-amber-50 text-amber-700 border border-amber-100"
                                : turno.estado === "Realizado"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                  : turno.estado === "Cancelado"
                                    ? "bg-rose-50 text-rose-700 border border-rose-100"
                                    : "bg-slate-100 text-slate-600 border border-slate-200"
                            }`}
                          >
                            {turno.estado}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-right">
                          <button
                            onClick={() => handleEdit(turno.id)}
                            className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                            title="Editar turno"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Turnos;
