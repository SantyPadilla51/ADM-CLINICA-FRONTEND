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

  const handleEliminar = async (e) => {
    setEliminando(true);
  };

  const handleCancelar = async (e) => {
    setEliminando(false);
  };

  useEffect(() => {
    getConsultas();
  }, []);

  return (
    <>
      {addConsulta ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl">
            <button
              onClick={() => setAddConsulta(null)}
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

            <h2 className="text-center text-xl font-semibold mb-4 text-gray-800">
              Nueva Consulta
            </h2>

            <form onSubmit={createConsulta} className=" space-y-4 ">
              <div>
                <p>Motivo</p>
                <textarea
                  name="motivo"
                  placeholder="Ingrese motivo de consulta"
                  value={nuevoHistorial.motivo}
                  onChange={(e) =>
                    setNuevoHistorial({
                      ...nuevoHistorial,
                      motivo: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <p>Diagnóstico</p>
                <textarea
                  name="diagnostico"
                  placeholder="Ingrese el diagnóstico"
                  value={nuevoHistorial.diagnostico}
                  onChange={(e) =>
                    setNuevoHistorial({
                      ...nuevoHistorial,
                      diagnostico: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <p>Tratamiento</p>
                <textarea
                  name="tratamiento"
                  placeholder="Ingrese el tratamiento"
                  value={nuevoHistorial.tratamiento}
                  onChange={(e) =>
                    setNuevoHistorial({
                      ...nuevoHistorial,
                      tratamiento: e.target.value,
                    })
                  }
                  rows={9}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {cargando ? (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed"
                >
                  Cargando...
                </button>
              ) : (
                <button
                  onClick={createConsulta}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Agregar Consulta
                </button>
              )}
            </form>
          </div>
        </div>
      ) : null}

      <div className="col-start-2 row-start-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Historial de Consultas</h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
            onClick={handleAddConsulta}
          >
            Agregar Consulta
          </button>
        </div>

        <section className="bg-white p-4">
          {consultas.length === 0 ? (
            <p className="text-gray-500 text-center">Aún no hay consultas</p>
          ) : (
            <div className="grid gap-4">
              {consultas.map((consulta) => (
                <>
                  {eliminando && (
                    <div className="z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="p-6 bg-white shadow-lg rounded-lg w-96">
                        <p className="text-gray-800 mb-4 text-center font-semibold">
                          ¿Estás seguro de que quieres eliminar esta consulta?
                        </p>
                        <div className="flex justify-center gap-4">
                          <button
                            type="submit"
                            disabled={cargandoEliminar}
                            onClick={() => {
                              deleteConsulta(consulta.id);
                            }}
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
                  <div key={consulta.id} className="relative bg-gray-100 p-4">
                    <h2 className="text-lg font-semibold">
                      Motivo: {consulta.motivo}
                    </h2>

                    <p className="text-gray-700 font-semibold">
                      Diagnostico:{" "}
                      <span className="font-light">{consulta.diagnostico}</span>
                    </p>
                    <p className="text-gray-700 font-semibold ">
                      Tratamiento:{" "}
                      <span className=" font-light">
                        {consulta.tratamiento}
                      </span>
                    </p>
                    <p className="text-gray-700 font-semibold">
                      {" "}
                      Fecha:{" "}
                      <span className="font-light">
                        {consulta.fecha.split("-").reverse().join("-")}
                      </span>
                    </p>
                    <button
                      onClick={handleEliminar}
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
                  </div>
                </>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Historial;
