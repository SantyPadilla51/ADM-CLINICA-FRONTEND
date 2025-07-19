import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import clienteAxios from "../../config/axios";

const Informacion = ({ pacienteID }) => {
  const [paciente, setPaciente] = useState([]);

  const getPaciente = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `/pacienteId/${pacienteID}`;
      const { data } = await clienteAxios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPaciente(data.paciente[0]);
    } catch (error) {
      toast.error("Ha ocurrido un error al obtener el paciente");
    }
  };

  useEffect(() => {
    getPaciente();
  }, []);

  return (
    <>
      <section className="max-w-2xl mx-auto p-6 row-start-1">
        <h1 className="text-center text-2xl font-semibold mb-6">
          Información del Paciente
        </h1>

        <div className="bg-white  p-4">
          <div className="grid grid-cols-2 gap-4">
            <p className="bg-gray-100 p-3  text-lg font-semibold">
              Nombre:{" "}
              <span className="font-light text-gray-700">
                {paciente.nombre || <Skeleton />}
              </span>
            </p>
            <p className="bg-gray-100 p-3 text-lg font-semibold">
              Apellido:{" "}
              <span className="font-light text-gray-700">
                {paciente.apellido || <Skeleton />}
              </span>
            </p>
            <p className="bg-gray-100 p-3 text-lg font-semibold">
              Edad:{" "}
              <span className="font-light text-gray-700">
                {paciente.edad || <Skeleton />}
              </span>
            </p>
            <p className="bg-gray-100 p-3 text-lg font-semibold">
              Sexo:{" "}
              <span className="font-light text-gray-700">
                {paciente.sexo || <Skeleton />}
              </span>
            </p>
            <p className="bg-gray-100 p-3  text-lg font-semibold">
              Teléfono:{" "}
              <span className="font-light text-gray-700">
                {paciente.telefono || <Skeleton />}
              </span>
            </p>
            <p className="bg-gray-100 p-3 text-lg font-semibold">
              DNI:{" "}
              <span className="font-light text-gray-700">
                {paciente.dni || <Skeleton />}
              </span>
            </p>
            <p className="bg-gray-100 p-3 text-lg font-semibold col-span-2">
              Email:{" "}
              <span className="font-light text-gray-700">
                {paciente.email || <Skeleton />}
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Informacion;
