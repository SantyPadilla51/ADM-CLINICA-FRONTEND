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

      toast.success({
        position: "top-right",
        render: data.msg,
        type: "success",
        autoClose: 2000,
      });
      setEditTurno(null);
      getTurnos();
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            {/* Botón de cerrar */}
            <button
              onClick={() => setCrearTurno(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">
              ➕ Crear Turno
            </h2>

            <form onSubmit={(e) => agendarTurno(e)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Paciente
                </label>
                <input
                  id="paciente"
                  name="paciente"
                  onChange={handleChange}
                  type="text"
                  placeholder="Nombre del paciente"
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="relative">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Fecha
                </label>
                <input
                  id="fecha"
                  name="fecha"
                  onChange={handleChange}
                  type="date"
                  className="w-full appearance-none border border-gray-300 rounded-lg p-2 
                 bg-white text-gray-700 shadow-sm 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 hover:border-blue-400 cursor-pointer"
                  min={new Date().toISOString().split("T")[0]} // evita fechas pasadas
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hora
                </label>
                <input
                  id="hora"
                  name="hora"
                  onChange={handleChange}
                  type="time"
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {cargando ? "Cargando.." : "Guardar"}
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {editTurno ? (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            {/* Botón de cerrar */}
            <button
              onClick={() => setEditTurno(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">
              ➕ Editar Turno
            </h2>

            <form
              onSubmit={(e) => editarTurno(e, turnoEditado.id)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Paciente
                </label>
                <input
                  id="paciente"
                  name="paciente"
                  value={turnoEditado.paciente}
                  onChange={handleChangeEdit}
                  type="text"
                  placeholder="Nombre del paciente"
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Fecha
                </label>
                <input
                  id="fecha"
                  name="fecha"
                  value={turnoEditado.fecha}
                  onChange={handleChangeEdit}
                  type="date"
                  className="w-full appearance-none border border-gray-300 rounded-lg p-2 pl-10 
                 bg-white text-gray-700 shadow-sm "
                  min={new Date().toISOString().split("T")[0]} // evita fechas pasadas
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hora
                </label>
                <input
                  id="hora"
                  name="hora"
                  value={turnoEditado.hora}
                  onChange={handleChangeEdit}
                  type="time"
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Estado
                </label>
                <select
                  name="estado"
                  id="estado"
                  value={turnoEditado.estado}
                  onChange={handleChangeEdit}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="Realizado">Realizado</option>
                  <option value="Cancelado">Cancelado</option>
                  <option value="Reprogramado">Reprogramado</option>
                  <option value="Ausente">Ausente</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {cargando ? "Cargando.." : "Editar"}
              </button>
            </form>
          </div>
        </div>
      ) : null}

      <div className=" p-2 lg:p-6">
        {/*Btn Crear Turno*/}
        <div className="block lg:flex justify-between mb-4">
          <h1 className="text-2xl font-bold mb-4">📋 Dashboard de Turnos</h1>
          <button
            onClick={() => setCrearTurno(true)}
            className="p-2 mt-5 mb-5 lg:mb-0 lg:mt-0 bg-indigo-700 px-4 text-white rounded-md hover:bg-indigo-600"
          >
            Agendar Turno
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          {["Pendiente", "Realizado", "Cancelado", "Reprogramado"].map(
            (estado) => (
              <button
                key={estado}
                onClick={() => setEstadoActivo(estado)}
                className={`px-4 py-2 rounded-full ${
                  estadoActivo === estado
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {estado}
              </button>
            )
          )}
        </div>

        {/* Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-lg font-semibold">
              {" "}
              Total {estadoActivo || "Turnos"}
            </h2>
            <p className="text-3xl font-bold text-blue-600">
              {turnos.filter((turno) => turno.estado === estadoActivo).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-lg font-semibold">Próximo turno</h2>
            <p className="text-gray-700">
              {turnos.length > 0
                ? `${turnos[0].paciente} - ${turnos[0].hora.slice(0, 5)}`
                : "Sin turnos"}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-lg font-semibold">Fecha</h2>
            <p className="text-gray-700">
              {new Date().toLocaleDateString("es-AR")}
            </p>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Paciente</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Hora</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    Cargando turnos...
                  </td>
                </tr>
              ) : turnos.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No hay turnos pendientes
                  </td>
                </tr>
              ) : (
                turnos
                  .filter((t) => t.estado == estadoActivo)
                  .map((turno) => (
                    <tr
                      key={turno.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-2 capitalize">{turno.paciente}</td>
                      <td className="px-4 py-2">
                        {turno.fecha.split("-").reverse().join("-")}
                      </td>
                      <td className="px-4 py-2">{turno.hora.slice(0, 5)}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            turno.estado === "Pendiente"
                              ? "bg-yellow-200 text-yellow-800"
                              : turno.estado === "Realizado"
                              ? "bg-green-200 text-green-800"
                              : turno.estado === "Cancelado"
                              ? "bg-red-200 text-red-800"
                              : turno.estado === "Reprogramado"
                              ? "bg-blue-200 text-gray-800"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {" "}
                          {turno.estado}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <svg
                          onClick={() => handleEdit(turno.id)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-minus hover:cursor-pointer hover:stroke-cyan-600"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                          <path d="M13.5 6.5l4 4" />
                          <path d="M16 19h6" />
                        </svg>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Turnos;
