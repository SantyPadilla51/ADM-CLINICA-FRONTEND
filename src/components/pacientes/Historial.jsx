import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import clienteAxios from "../../config/axios";
import "react-toastify/dist/ReactToastify.css";

const Historial = ({ pacienteID }) => {
  const [consultas, setConsultas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cargandoEliminar, setCargandoEliminar] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [addConsulta, setAddConsulta] = useState(false);
  const [idEliminar, setIdEliminar] = useState();
  const [nuevoHistorial, setNuevoHistorial] = useState({
    motivo: "",
    diagnostico: "",
    tratamiento: "",
    pacienteId: pacienteID,
    fecha: new Date().toISOString().split("T")[0],
  });

  const getConsultas = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `/pacientes/historial/${pacienteID}`;
      const { data } = await clienteAxios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const historialOrdenado = data.historial.sort((a, b) => b.id - a.id);

      setConsultas(historialOrdenado);
      setCargando(false);
    } catch (error) {
      toast.error("Hubo un error al obtener el historial");
    }
  };

  const createConsulta = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const token = localStorage.getItem("token");

      const url = `/pacientes/historial/${pacienteID}`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(url, nuevoHistorial, config);

      setAddConsulta(false);
      setNuevoHistorial("");

      if (data.ok == true) {
        toast.success("Consulta agregada correctamente", {
          position: "top-right",
        });
        setCargando(false);
        getConsultas();
      } else {
        toast.error("Hubo un error al agregar la consulta", {
          position: "top-right",
        });
        setCargando(false);
      }
    } catch (error) {
      toast.error("Hubo un error al crear la consulta");
      setCargando(false);
    }
  };

  const deleteConsulta = async (id) => {
    setCargandoEliminar(true);
    try {
      const token = localStorage.getItem("token");
      const url = `/pacientes/historial/${id}`;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.delete(url, config);

      if (data.ok == true) {
        toast.success("Consulta eliminada correctamente", {
          position: "top-right",
        });
        setIdEliminar();
        getConsultas();
      } else {
        toast.error("Hubo un error al eliminar la consulta", {
          position: "top-right",
        });
        setCargando(false);
      }
    } catch (error) {
      toast.error("Hubo un error al eliminar la consulta");
      setCargando(false);
    }
    setCargandoEliminar(false);
    setEliminando(false);
  };

  const handleAddConsulta = async (e) => {
    setAddConsulta(true);
  };

  const handleEliminar = async (id) => {
    setEliminando(true);
    setIdEliminar(id);
  };

  const handleCancelar = async (e) => {
    setEliminando(false);
  };

  useEffect(() => {
    getConsultas();
  }, []);

  return (
    <>
      {addConsulta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white rounded-2xl border border-slate-100 shadow-xl w-full max-w-2xl overflow-hidden transform transition-all">
            {/* Cabecera del Modal */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <h2 className="text-lg font-bold text-slate-800">
                  Nueva Consulta Médica
                </h2>
              </div>
              <button
                onClick={() => setAddConsulta(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Formulario */}
            <form
              onSubmit={createConsulta}
              className="p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar"
            >
              {/* Campo: Motivo */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Motivo de la Consulta
                </label>
                <textarea
                  name="motivo"
                  placeholder="Ej. Control post-operatorio, jaquecas recurrentes..."
                  value={nuevoHistorial.motivo}
                  onChange={(e) =>
                    setNuevoHistorial({
                      ...nuevoHistorial,
                      motivo: e.target.value,
                    })
                  }
                  rows={2}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none font-medium text-slate-800 placeholder-slate-400"
                />
              </div>

              {/* Campo: Diagnóstico */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Diagnóstico Presuntivo / Certero
                </label>
                <textarea
                  name="diagnostico"
                  placeholder="Ingrese las conclusiones clínicas..."
                  value={nuevoHistorial.diagnostico}
                  onChange={(e) =>
                    setNuevoHistorial({
                      ...nuevoHistorial,
                      diagnostico: e.target.value,
                    })
                  }
                  rows={2}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none font-medium text-slate-800 placeholder-slate-400"
                />
              </div>

              {/* Campo: Tratamiento */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Tratamiento e Indicaciones
                </label>
                <textarea
                  name="tratamiento"
                  placeholder="Fármacos, dosis, reposo o estudios complementarios solicitados..."
                  value={nuevoHistorial.tratamiento}
                  onChange={(e) =>
                    setNuevoHistorial({
                      ...nuevoHistorial,
                      tratamiento: e.target.value,
                    })
                  }
                  rows={5}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
                />
              </div>

              {/* Botón de Envío */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={cargando}
                  className={`w-full py-3 rounded-xl text-sm font-bold text-white transition-all shadow-md active:scale-[0.99] ${
                    cargando
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                      : "bg-blue-600 hover:bg-blue-700 shadow-blue-100"
                  }`}
                >
                  {cargando ? "Guardando Registro..." : "Registrar Consulta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {eliminando && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="p-6 bg-white rounded-2xl shadow-xl max-w-sm w-full border border-slate-100 transform scale-100 transition-transform">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
            <h3 className="text-slate-900 font-bold text-base text-center">
              ¿Eliminar esta consulta?
            </h3>
            <p className="text-slate-500 text-xs text-center mt-1.5 leading-relaxed">
              Esta acción purgará de forma permanente esta entrada médica. No se
              puede deshacer.
            </p>
            <div className="flex gap-3 mt-5">
              <button
                className="w-full py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-semibold transition"
                onClick={handleCancelar}
                disabled={cargandoEliminar}
              >
                Cancelar
              </button>
              <button
                onClick={() => deleteConsulta(idEliminar)}
                disabled={cargandoEliminar}
                className={`w-full py-2 rounded-xl text-xs font-bold text-white transition ${
                  cargandoEliminar
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {cargandoEliminar ? "Borrando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="col-start-2 row-start-1 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              Historial de Consultas
            </h1>
            <p className="text-slate-400 text-xs font-medium mt-0.5">
              Evolución clínica cronológica del paciente
            </p>
          </div>
          <button
            onClick={handleAddConsulta}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-blue-100 hover:shadow-lg transition-all duration-150 active:scale-[0.98]"
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Registrar
          </button>
        </div>

        <section className="bg-transparent">
          {consultas.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.884 2.223v6.194a2.25 2.25 0 0 0 2.25 2.25h16.5a2.25 2.25 0 0 0 2.25-2.25v-6.194a2.25 2.25 0 0 0-1.884-2.223m-16.5 0c1.101-1.626 3.051-2.73 5.257-2.73h7.486c2.206 0 4.156 1.104 5.257 2.73m-18 0V4.5A2.25 2.25 0 0 1 4.5 2.25h15A2.25 2.25 0 0 1 21 4.5v5.276"
                  />
                </svg>
              </div>
              <p className="text-slate-500 font-bold text-sm">
                Sin registros médicos
              </p>
              <p className="text-slate-400 text-xs mt-1">
                Este paciente aún no posee consultas asentadas en el sistema.
              </p>
            </div>
          ) : (
            <div className="relative border-l-2 border-slate-100 pl-6 ml-3 space-y-6">
              {consultas.map((consulta) => (
                <div
                  key={consulta.id}
                  className="relative group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200/80 transition-all duration-200"
                >
                  <div className="absolute -left-[33px] top-6 w-3.5 h-3.5 rounded-full bg-slate-200 border-4 border-white group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-150" />

                  <button
                    onClick={() => handleEliminar(consulta.id)}
                    className="absolute right-3 top-3 p-2 rounded-xl text-slate-300 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-150"
                    title="Eliminar registro"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>

                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 text-slate-500 font-bold text-[10px] uppercase tracking-wider border border-slate-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-3 h-3 text-slate-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>
                      {consulta.fecha.split("-").reverse().join("/")}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Motivo
                      </h4>
                      <p className="text-base font-bold text-slate-800 mt-0.5">
                        {consulta.motivo}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100">
                        <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />{" "}
                          Diagnóstico
                        </h5>
                        <p className="text-sm font-medium text-slate-700 mt-1 leading-relaxed">
                          {consulta.diagnostico}
                        </p>
                      </div>

                      <div className="p-3 bg-blue-50/30 rounded-xl border border-blue-100/30">
                        <h5 className="text-[11px] font-bold text-blue-500 uppercase tracking-wider flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />{" "}
                          Tratamiento e Indicaciones
                        </h5>
                        <p className="text-sm font-semibold text-slate-700 mt-1 leading-relaxed whitespace-pre-line">
                          {consulta.tratamiento}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Historial;
