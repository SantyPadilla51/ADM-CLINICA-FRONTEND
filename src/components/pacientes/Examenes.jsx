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
    const { data } = await clienteAxios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

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
        }
      );

      if (data.ok == true) {
        toast.success("Examen eliminado correctamente");
        getExamenes();
        setCargando(false);
        setEliminando(false);
        return;
      }
    } catch (error) {
      toast.error("Error al eliminar el examen");
    }
    setCargandoEliminar(false);
    setEliminando(false);
    setCargando(false);
  };

  const createExamen = async (e) => {
    e.preventDefault();
    setCargando(true);
    if (nuevoExamen.imagen === "") {
      toast.error("Por favor, sube una imagen del examen");
      setCargando(false);
      return;
    }

    try {
      const file = nuevoExamen.imagen;
      const fileName = `${Date.now()}_${file.name}`;

      const { data, error } = await supabase.storage
        .from("examenes")
        .upload(`imagenes/${fileName}`, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("examenes")
        .getPublicUrl(`imagenes/${fileName}`);

      const urlImagen = publicUrlData.publicUrl;

      const examenPayload = {
        descripcion: nuevoExamen.descripcion,
        pacienteId: pacienteID,
        imagenUrl: urlImagen,
      };

      const token = localStorage.getItem("token");
      await clienteAxios.post(
        `/pacientes/examenes/${pacienteID}`,
        examenPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Examen creado correctamente");
      setNuevoExamen("");
      setAddExamen(false);
      setCargando(false);
      getExamenes();
    } catch (error) {
      toast.error("Error al subir el examen");
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <button
              onClick={() => setAddExamen(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icon-tabler-x"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            <form onSubmit={createExamen} encType="multipart/form-data">
              <h2 className="text-xl font-semibold mb-4">Agregar Examen</h2>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                name="descripcion"
                placeholder="Ingrese la descripción del examen"
                value={nuevoExamen.descripcion}
                onChange={(e) =>
                  setNuevoExamen({
                    ...nuevoExamen,
                    descripcion: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNuevoExamen({
                    ...nuevoExamen,
                    imagen: e.target.files[0],
                  })
                }
                className="mb-4"
              />

              {cargando ? (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed"
                >
                  Cargando...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Agregar Examen
                </button>
              )}
            </form>
          </div>
        </div>
      )}
      {eliminando && examenSeleccionado && (
        <div className="z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white shadow-lg rounded-lg w-96">
            <p className="text-gray-800 mb-4 text-center font-semibold">
              ¿Estás seguro de que quieres eliminar esta consulta?
            </p>
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                disabled={cargandoEliminar}
                onClick={() =>
                  deleteExamen(
                    examenSeleccionado.id,
                    examenSeleccionado.imagenUrl
                  )
                }
                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg transition text-white"
              >
                {cargandoEliminar ? "Eliminando..." : "Eliminar"}
              </button>

              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                onClick={handleCancelar}
                disabled={cargandoEliminar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="p-6 row-start-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Historial de Exámenes</h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
            onClick={handleAddExamen}
          >
            Agregar Examen
          </button>
        </div>

        <div>
          {examenes.length <= 0 ? (
            <p className="bg-white p-4 text-gray-500 text-center">
              No hay exámenes registrados
            </p>
          ) : (
            <div className="space-y-4">
              {examenes.map((examen, index) => (
                <>
                  <div
                    key={index}
                    className="relative bg-white border border-gray-300 p-4"
                  >
                    <p className="font-semibold">
                      Descripción:{" "}
                      <span className="font-light">{examen.descripcion}</span>{" "}
                    </p>
                    <button
                      onClick={() => handleEliminar(examen)}
                      className="absolute right-2 top-2 p-1 rounded-lg hover:bg-red-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={"#fff"}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke={"#e11313"}
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                        />
                      </svg>
                    </button>
                    <p className="font-semibold">
                      Fecha:{" "}
                      <span className="font-light">
                        {examen.fecha.split("-").reverse().join("-")}
                      </span>
                    </p>

                    <img src={examen.imagenUrl} />
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Examenes;
