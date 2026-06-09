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
  const [eliminando, setEliminando] = useState(null);
  const [turnoDelete, setTurnoDelete] = useState();
  const [nuevoTurno, setNuevoTurno] = useState({
    paciente: "",
    hora: "",
    min: "",
    dia: "",
    mes: "",
    anio: "",
  });

  const [turnoEditado, setTurnoEditado] = useState({
    paciente: "",
    hora__hh: "",
    hora__mm: "",
    dia: "",
    mes: "",
    anio: "",
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

  const eliminarTurno = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const url = `eliminar-turno/${turnoDelete}`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(url, config);

      if (data.ok == true) {
        toast.success(data.msg, {
          position: "top-right",
        });
        setLoading(false);
        setEliminando(null);
        getTurnos();
      } else {
        toast.error(data.msg, {
          position: "top-right",
        });
        setLoading(false);
        setEliminando(null);
      }
    } catch (error) {
      toast.error("Hubo un error al eliminar el turno");
      setEliminando(null);
      setLoading(false);
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
      min: turno.min,
      dia: turno.dia,
      mes: turno.mes,
      anio: turno.anio,
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

  const handleDelete = (id) => {
    setEliminando(true);
    setTurnoDelete(id);
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
                  htmlFor="fecha-dia"
                  className="text-xs font-bold text-slate-500 uppercase tracking-wider"
                >
                  Fecha
                </label>

                <div className="flex gap-2">
                  <input
                    id="fecha-dia"
                    name="dia"
                    type="number"
                    placeholder="DD"
                    min="1"
                    max="31"
                    onChange={handleChange}
                    onInput={(e) => {
                      if (e.currentTarget.value.length > 2) {
                        e.currentTarget.value = e.currentTarget.value.slice(
                          0,
                          2,
                        );
                      }
                    }}
                    className="w-20 px-3 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    required
                  />

                  <input
                    name="mes"
                    type="number"
                    placeholder="MM"
                    min="1"
                    max="12"
                    onChange={handleChange}
                    onInput={(e) => {
                      if (e.currentTarget.value.length > 2) {
                        e.currentTarget.value = e.currentTarget.value.slice(
                          0,
                          2,
                        );
                      }
                    }}
                    className="w-20 px-3 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    required
                  />

                  <input
                    name="anio"
                    type="number"
                    placeholder="AAAA"
                    min={new Date().getFullYear()}
                    max={new Date().getFullYear() + 10}
                    onChange={handleChange}
                    onInput={(e) => {
                      if (e.currentTarget.value.length > 4) {
                        e.currentTarget.value = e.currentTarget.value.slice(
                          0,
                          4,
                        );
                      }
                    }}
                    className="w-24 px-3 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 text-center flex-grow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="hora"
                  className="text-xs font-bold text-slate-500 uppercase tracking-wider"
                >
                  Hora
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    id="hora"
                    name="hora"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={2}
                    placeholder="HH"
                    onChange={handleChange}
                    className="w-16 px-3 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 text-center"
                    required
                  />

                  <span className="text-slate-400 font-bold">:</span>

                  <input
                    id="min"
                    name="min"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={2}
                    placeholder="MM"
                    onChange={handleChange}
                    className="w-16 px-3 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 text-center"
                    required
                  />
                </div>
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

      {editTurno ? (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-200">
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
                Editar Turno
              </h2>
              <p className="text-slate-400 text-xs font-medium mt-0.5">
                Asigne una fecha y hora para la consulta
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
                  placeholder="Nombre completo del paciente"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="fecha-dia"
                  className="text-xs font-bold text-slate-500 uppercase tracking-wider"
                >
                  Fecha
                </label>

                <div className="flex gap-2">
                  <input
                    id="fecha-dia"
                    name="dia"
                    type="number"
                    placeholder="DD"
                    value={turnoEditado.dia}
                    min="1"
                    max="31"
                    onChange={handleChangeEdit}
                    onInput={(e) => {
                      if (e.currentTarget.value.length > 2) {
                        e.currentTarget.value = e.currentTarget.value.slice(
                          0,
                          2,
                        );
                      }
                    }}
                    className="w-20 px-3 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    required
                  />

                  <input
                    name="mes"
                    type="number"
                    placeholder="MM"
                    min="1"
                    max="12"
                    value={turnoEditado.mes}
                    onChange={handleChangeEdit}
                    onInput={(e) => {
                      if (e.currentTarget.value.length > 2) {
                        e.currentTarget.value = e.currentTarget.value.slice(
                          0,
                          2,
                        );
                      }
                    }}
                    className="w-20 px-3 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    required
                  />

                  <input
                    name="anio"
                    type="number"
                    placeholder="AAAA"
                    value={turnoEditado.anio}
                    min={new Date().getFullYear()}
                    max={new Date().getFullYear() + 10}
                    onChange={handleChangeEdit}
                    onInput={(e) => {
                      if (e.currentTarget.value.length > 4) {
                        e.currentTarget.value = e.currentTarget.value.slice(
                          0,
                          4,
                        );
                      }
                    }}
                    className="w-24 px-3 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 text-center flex-grow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="hora"
                  className="text-xs font-bold text-slate-500 uppercase tracking-wider"
                >
                  Hora
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    id="hora__hh"
                    name="hora__hh"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={2}
                    placeholder="HH"
                    value={turnoEditado.hora}
                    onChange={handleChangeEdit}
                    className="w-16 px-3 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 text-center"
                    required
                  />

                  <span className="text-slate-400 font-bold">:</span>

                  <input
                    name="hora_mm"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={2}
                    placeholder="MM"
                    value={turnoEditado.min}
                    onChange={handleChangeEdit}
                    className="w-16 px-3 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-semibold text-slate-700 text-center"
                    required
                  />
                </div>
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
                onClick={() => setEliminando(null)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                onClick={eliminarTurno}
                className={`w-full py-2.5 rounded-xl text-sm font-bold text-white shadow-sm transition ${
                  loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                    : "bg-red-600 hover:bg-red-700 shadow-red-100"
                }`}
              >
                {loading ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 md:p-6 max-w-7xl mx-auto">
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

        <div className="flex flex-wrap gap-2 mb-6 bg-slate-100/70 p-1.5 rounded-2xl w-auto ">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total {estadoActivo || "Turnos"}
            </h2>
            <p className="text-3xl font-black text-blue-600 mt-1">
              {Array.isArray(turnos)
                ? turnos.filter((turno) => turno.estado === estadoActivo).length
                : 0}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Próximo Turno
            </h2>
            <p className="text-base font-bold text-slate-700 mt-2 truncate">
              {turnos.filter((turno) => turno.estado === "pendiente").length > 0
                ? `${turnos.filter((turno) => turno.estado === "pendiente")[0].paciente} ${turnos.filter((turno) => turno.estado === "pendiente")[0].hora}:${turnos.filter((turno) => turno.estado === "pendiente")[0].min} hs`
                : "Sin turnos pendientes"}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm sm:col-span-2 lg:col-span-1">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Fecha Actual
            </h2>
            <p className="text-base font-bold text-slate-700 mt-2 capitalize">
              {new Date().toLocaleDateString("es-AR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

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
                          {turno.dia}/{turno.mes}/{turno.anio}
                        </td>
                        <td className="px-6 py-3.5 text-slate-600 font-semibold">
                          {turno.hora}:{turno.min} hs
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

                          <button
                            onClick={() => handleDelete(turno.id)}
                            className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                            title="Eliminar turno"
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
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
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
