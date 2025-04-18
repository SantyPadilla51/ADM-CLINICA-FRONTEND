import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import clienteAxios from "../../../config/axios";
import "react-toastify/dist/ReactToastify.css";

const Historial = ({ pacienteID }) => {
  const [consultas, setConsultas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nuevoHistorial, setNuevoHistorail] = useState({});
  const [addConsulta, setAddConsulta] = useState(false);

  const getConsultas = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `/pacientes/historial/${pacienteID}`;
      const { data } = await clienteAxios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setConsultas(data.historial);
      setCargando(false);
    } catch (error) {
      toast.error("Hubo un error al obtener el historial");
    }
  };

  const createConsulta = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `/pacientes/historial`;
      const { data } = await clienteAxios.post(url, nuevoHistorial, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAddConsulta(false);
      setNuevoHistorial("");

      if (data.ok === true) {
        toast.success("Consulta agregada correctamente", {
          position: "top-center",
        });
      } else {
        toast.error("Hubo un error al agregar la consulta", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Hubo un error al crear la consulta");
    }
  };

  const handleAddConsulta = async (e) => {
    setAddConsulta(true);
  };

  useEffect(() => {
    getConsultas();
  }, []);

  return (
    <>
      <ToastContainer />
      {addConsulta ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
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

            <form onSubmit={createConsulta} className="space-y-4">
              <div>
                <p>Motivo</p>
                <textarea
                  name="motivo"
                  placeholder="Ingrese motivo de consulta"
                  value={nuevoHistorial}
                  onChange={(e) => setNuevoHistorial(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <p>Diagnóstico</p>
                <textarea
                  name="diagnostico"
                  placeholder="Ingrese el diagnóstico"
                  value={nuevoHistorial}
                  onChange={(e) => setNuevoHistorial(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <p>Tratamiento</p>
                <textarea
                  name="tratamiento"
                  placeholder="Ingrese el tratamiento"
                  value={nuevoHistorial}
                  onChange={(e) => setNuevoHistorial(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={createConsulta}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Agregar Consulta
              </button>
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

        <section className="bg-white shadow-md border border-gray-200 rounded-md p-4">
          {consultas.length === 0 ? (
            <p className="text-gray-500 text-center">Aún no hay consultas</p>
          ) : (
            <div className="grid gap-4">
              {consultas.map((consulta) => (
                <div key={consulta.id} className="bg-gray-100 p-4 rounded-md">
                  <h2 className="text-lg font-semibold">
                    Motivo: {consulta.motivo}
                  </h2>
                  <p className="text-gray-700">Fecha: {consulta.fecha}</p>
                  <p className="text-gray-700">
                    Descripción: {consulta.descripcion}
                  </p>
                  <button className="bg-black p-1 rounded-md hover:fill-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={"#fff"}
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke={"#e11313"}
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>
                  </button>
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
