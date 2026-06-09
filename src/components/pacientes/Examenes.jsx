import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { toast } from "react-toastify";
import { supabase } from "../../supabase/supabaseClient.js";
import "react-toastify/dist/ReactToastify.css";

const Examenes = ({ pacienteID }) => {
  const [examenes, setExamenes] = useState([]);
  const [eliminando, setEliminando] = useState(false);
  const [examenSeleccionado, setExamenSeleccionado] = useState(null);
  const [cargandoEliminar, setCargandoEliminar] = useState(false);
  const [addExamen, setAddExamen] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [nuevoExamen, setNuevoExamen] = useState({
    pacienteId: pacienteID,
    descripcion: "",
    imagenUrl: "",
  });

  const getExamenes = async () => {
    const token = localStorage.getItem("token");

    const url = `/pacientes/examenes/${pacienteID}`;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await clienteAxios.get(url, config);

    setExamenes(data.examenes);
  };

  const handleAddExamen = () => {
    setAddExamen(true);
  };

  const handleCancelar = () => {
    setEliminando(false);
    setCargandoEliminar(false);
  };

  const handleEliminar = (examen) => {
    setExamenSeleccionado(examen);
    setEliminando(true);
  };

  const deleteExamen = async (examenId) => {
    setCargando(true);
    setCargandoEliminar(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await clienteAxios.delete(
        `/pacientes/examenes/${examenId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (data.ok === true) {
        toast.success("Examen eliminado correctamente");
        setCargando(false);
        setEliminando(false);
        setCargandoEliminar(false);
        getExamenes();
        return;
      }
    } catch (error) {
      toast.error("Error al eliminar el examen");
      setCargandoEliminar(false);
      setCargando(false);
      setEliminando(false);
    }
  };

  const createExamen = async (e) => {
    e.preventDefault();
    setCargando(true);
    if (nuevoExamen.imagenUrl === "") {
      toast.error("Por favor, sube una imagen del examen");
      setCargando(false);
      return;
    }

    try {
      const file = nuevoExamen.imagenUrl;
      const fileName = `${Date.now()}_${file.name}`;

      const { data, error } = await supabase.storage
        .from("examenes")
        .upload(`imagenes/${fileName}`, file);

      if (error) {
        console.error("-> Error en la subida de Supabase:", error.message);
        return;
      }

      const resultadoUrl = supabase.storage
        .from("examenes")
        .getPublicUrl(`imagenes/${fileName}`);

      const urlImagen = resultadoUrl.data?.publicUrl || resultadoUrl.publicUrl;

      const examenPayload = {
        descripcion: nuevoExamen.descripcion,
        pacienteId: pacienteID,
        imagenUrl: urlImagen,
      };

      const token = localStorage.getItem("token");
      const url = `/pacientes/examenes/${pacienteID}`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await clienteAxios.post(url, examenPayload, config);

      const message = res.data.msg;

      if (res.data.ok === true) {
        toast.success(message, {
          position: "top-right",
        });
      } else {
        toast.error(message, {
          position: "top-right",
        });
      }

      setNuevoExamen({
        pacienteId: pacienteID,
        descripcion: "",
        imagenUrl: "",
      });

      getExamenes();
      setAddExamen(null);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    getExamenes();
  }, []);

  return (
    <>
      {addExamen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white rounded-2xl border border-slate-100 shadow-xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                <h2 className="text-base font-bold text-slate-800">
                  Cargar Estudio Médico
                </h2>
              </div>
              <button
                onClick={() => setAddExamen(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form
              onSubmit={createExamen}
              encType="multipart/form-data"
              className="p-6 space-y-5"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Descripción del Examen
                </label>
                <textarea
                  name="descripcion"
                  placeholder="Ej. Radiografía de tórax, Resonancia Magnética de rodilla izquierda..."
                  value={nuevoExamen.descripcion}
                  onChange={(e) =>
                    setNuevoExamen({
                      ...nuevoExamen,
                      descripcion: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-800 placeholder-slate-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Documento / Imagen del Estudio
                </label>
                <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/20 rounded-xl p-4 transition-all text-center cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setNuevoExamen({
                        ...nuevoExamen,
                        imagenUrl: e.target.files[0],
                      })
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="space-y-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="w-8 h-8 text-slate-400 group-hover:text-blue-500 mx-auto transition-colors"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21+18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                      />
                    </svg>
                    <div className="text-xs text-slate-600 font-medium">
                      {nuevoExamen.imagenUrl ? (
                        <span className="text-blue-600 font-bold block truncate max-w-[280px] mx-auto">
                          ✓ {nuevoExamen.imagenUrl.name}
                        </span>
                      ) : (
                        <span>
                          Haz clic para seleccionar o arrastrar la captura
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Formatos de imagen soportados (PNG, JPG)
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={cargando}
                  className={`w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-md ${
                    cargando
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                      : "bg-blue-600 hover:bg-blue-700 shadow-blue-100"
                  }`}
                >
                  {cargando ? "Subiendo archivo..." : "Adjuntar Examen"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {eliminando && examenSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="p-6 bg-white rounded-2xl shadow-xl max-w-sm w-full border border-slate-100">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
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
              ¿Eliminar este examen?
            </h3>
            <p className="text-slate-500 text-xs text-center mt-1.5 leading-relaxed">
              Esta acción borrará permanentemente la descripción y el archivo
              multimedia de la base de datos.
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
                onClick={() =>
                  deleteExamen(
                    examenSeleccionado.id,
                    examenSeleccionado.imagenUrl,
                  )
                }
                disabled={cargandoEliminar}
                className={`w-full py-2 rounded-xl text-xs font-bold text-white transition ${
                  cargandoEliminar
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {cargandoEliminar ? "Borrando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="p-4 md:p-6 row-start-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              Historial de Exámenes
            </h1>
            <p className="text-slate-400 text-xs font-medium mt-0.5">
              Galería de estudios, análisis e imágenes médicas
            </p>
          </div>
          <button
            onClick={handleAddExamen}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-blue-100 hover:shadow-lg transition-all duration-150 active:scale-[0.98]"
          >
            <svg
              xmlns="http://www.w3.org/2000/xl"
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
            Cargar Examen
          </button>
        </div>

        <div>
          {examenes.length <= 0 ? (
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
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
              <p className="text-slate-500 font-bold text-sm">
                Sin archivos adjuntos
              </p>
              <p className="text-slate-400 text-xs mt-1">
                No se han registrado imágenes de diagnóstico para este paciente.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {examenes.map((examen, index) => (
                <div
                  key={examen.id || index}
                  className="group relative bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
                >
                  <button
                    onClick={() => handleEliminar(examen)}
                    className="absolute right-2 top-2 z-20 p-2 rounded-xl text-slate-400 hover:text-red-600 bg-white/80 hover:bg-red-50 backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-150 border border-slate-100"
                    title="Eliminar examen"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>

                  <div className="relative w-full h-44 bg-slate-900 overflow-hidden flex items-center justify-center border-b border-slate-100">
                    <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent z-10 transition-colors" />
                    <img
                      src={examen.imagenUrl}
                      alt={examen.descripcion}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4 space-y-3 bg-white">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          className="w-2.5 h-2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                          />
                        </svg>
                        {examen.fecha.split("-").reverse().join("/")}
                      </span>
                      <p
                        className="text-xs font-bold text-slate-700 leading-tight line-clamp-2"
                        title={examen.descripcion}
                      >
                        {examen.descripcion}
                      </p>
                    </div>

                    <a
                      href={examen.imagenUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors pt-1"
                    >
                      Abrir imagen completa
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-3 h-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Examenes;
