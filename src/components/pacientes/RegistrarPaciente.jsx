import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import NavbarAdmin from "../navbar/NavbarAdmin";
import "react-toastify/dist/ReactToastify.css";
import BtnVolver from "../ui/BtnVolver";

const RegistrarPaciente = () => {
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState({
    email: "",
    edad: "",
    nombre: "",
    apellido: "",
    dni: "",
    sexo: "",
    telefono: "",
    cobertura: "",
  });

  const handleChange = (e) => {
    setPaciente({ ...paciente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    const toastID = toast.loading("Guardando Paciente");

    try {
      const token = localStorage.getItem("token");
      const url = "/crear-paciente";
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(url, paciente, config);

      if (data.ok === true) {
        setCargando(false);
        toast.update(toastID, {
          render: "Paciente registrado correctamente",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/admin/pacientes");
        }, 1500);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Hubo un error");
      return;
    }
  };

  const handleNavigate = () => {
    navigate(`/admin/pacientes`);
  };

  return (
    <>
      <NavbarAdmin />

      <BtnVolver onClick={handleNavigate} />

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Registrar Paciente
        </h2>
        <form
          className="flex flex-col lg:grid md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={paciente.nombre}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
              placeholder="Escribe el nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={paciente.apellido}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none  sm:text-sm"
              placeholder="Escribe el apellido"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Edad
            </label>
            <input
              type="text"
              id="edad"
              name="edad"
              maxLength={3}
              minLength={1}
              value={paciente.edad}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none  sm:text-sm"
              placeholder="Escribe la edad"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              maxLength={10}
              minLength={10}
              value={paciente.telefono}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300  bg-slate-100 shadow-md focus:outline-none  sm:text-sm"
              placeholder="Escribe el teléfono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              DNI
            </label>
            <input
              type="text"
              id="dni"
              name="dni"
              maxLength={8}
              value={paciente.dni}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none  sm:text-sm"
              placeholder="Escribe el DNI"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sexo
            </label>
            <select
              id="sexo"
              name="sexo"
              value={paciente.sexo}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none  sm:text-sm"
            >
              <option value="">Selecciona una opción</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="no definido">No definido</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cobertura Medica
            </label>
            <select
              id="cobertura"
              name="cobertura"
              value={paciente.cobertura}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none  sm:text-sm"
            >
              <option value="">Selecciona una opción</option>
              <option value="osde">OSDE</option>
              <option value="swiss_medical">Swiss Medical</option>
              <option value="galeno">Galeno</option>
              <option value="medicus">Medicus</option>
              <option value="omint">Omint</option>
              <option value="hospital_italiano">Hospital Italiano</option>
              <option value="hospital_britanico">Hospital Británico</option>
              <option value="osdepyme">OSDEPYME</option>
              <option value="accord_salud">Accord Salud</option>
              <option value="sancor_salud">Sancor Salud</option>
              <option value="osde_binario">OSDE Binario</option>
              <option value="premedic">Premedic</option>
              <option value="medifé">Medifé</option>
              <option value="aca_salud">ACA Salud</option>
              <option value="staff_médico">Staff Médico</option>
              <option value="docthos">Docthos</option>
              <option value="ospat">OSPAT</option>
              <option value="ospaca">OSPACA</option>
              <option value="ospjn">OSPJN</option>
              <option value="ospesgype">OSPESGYPE</option>
              <option value="ospedyc">OSPedyC</option>
              <option value="ospim">OSPIM</option>
              <option value="ospia">OSPIA</option>
              <option value="ospiv">OSPIV</option>
              <option value="ospel">OSPEL</option>
              <option value="ospf">OSPF</option>
              <option value="ospm">OSPM</option>
              <option value="osppra">OSPPRA</option>
              <option value="osppc">OSPPC</option>
              <option value="osppc">OSPPc</option>
              <option value="osppra">OSPPRA</option>
              <option value="osppce">OSPPCe</option>
              <option value="osppc">OSPPC</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={paciente.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
              placeholder="Escribe el email"
            />
          </div>

          <button
            disabled={cargando}
            type="submit"
            className={`col-span-2 w-full md:w-auto bg-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500  text-white p-2 mt-5 ${
              cargando ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            {cargando ? "Guardando..." : "Guardar Cambios"}
          </button>
        </form>
      </div>
    </>
  );
};

export default RegistrarPaciente;
