import { useEffect, useState } from "react";
import clienteAxios from "../../../config/axios";

const Examenes = ({ pacienteID }) => {
  const [examenes, setExamenes] = useState([]);
  const [nuevoExamen, setNuevoExamen] = useState();
  const [addExamen, setAddExamen] = useState(null);

  const getExamenes = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `/pacientes/examenes/${pacienteID}`;
      const { data } = await clienteAxios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setExamenes(data.examenes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddExamen = () => {
    setAddExamen(true);
  };

  useEffect(() => {
    getExamenes();
  }, []);

  return (
    <>
      {addExamen ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ingrese nombre del examen"
            onChange={(e) => setNuevoExamen(e.target.value)}
          />
          <button type="submit">Agregar examen</button>
        </form>
      ) : null}

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

        <div className="bg-white shadow-md border border-gray-200 rounded-md p-4">
          {examenes.length <= 0 ? (
            <p className="text-gray-500 text-center">
              No hay exámenes registrados
            </p>
          ) : (
            <div className="space-y-4">
              {examenes.map((examen, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-md flex items-center justify-between"
                >
                  <p className="text-gray-800">{examen}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditExamen(index)}
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md transition duration-200"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteExamen(index)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md transition duration-200"
                    >
                      Borrar
                    </button>
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
