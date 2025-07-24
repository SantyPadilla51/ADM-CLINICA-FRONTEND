import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from "../navbar/Navbar";
import clienteAxios from "../../config/axios";
import BtnVolver from "../ui/BtnVolver";

const RegistrarUser = () => {
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    dni: "",
    telefono: "",
    especialidad: "",
  });

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const url = "crear-usuario";
      const { data } = await clienteAxios.post(url, usuario);

      if (data.ok === true) {
        toast.success(data.msg, {
          position: "top-center",
        });
        setCargando(false);
        setTimeout(() => {
          navigate("/");
        }, 4000);
      } else {
        setCargando(false);
        toast.error(data.msg);
        console.log(data.msg);
      }
    } catch (error) {
      setCargando(false);

      toast.error("Ha ocurrido un error");
    }
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-start">
        <BtnVolver onClick={handleNavigate} />

        <div className="flex-grow w-full flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8 space-y-6 mx-4"
          >
            <h3 className="text-2xl font-bold text-center text-gray-800">
              Registro de Usuario
            </h3>

            {[
              { label: "Nombre", name: "nombre", type: "text" },
              { label: "Apellido", name: "apellido", type: "text" },
              {
                label: "DNI",
                name: "dni",
                type: "text",
                minLength: 8,
                maxLength: 8,
              },
              {
                label: "Correo electrónico",
                name: "email",
                type: "email",
              },
              {
                label: "Teléfono",
                name: "telefono",
                type: "text",
                minLength: 10,
                maxLength: 10,
              },
              {
                label: "Contraseña",
                name: "password",
                type: "password",
              },
            ].map(({ label, name, type, minLength, maxLength }) => (
              <div className="flex flex-col" key={name}>
                <label className="font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  minLength={minLength}
                  maxLength={maxLength}
                  required
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                />
              </div>
            ))}

            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-1">
                Especialidad
              </label>
              <select
                name="especialidad"
                required
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
              >
                <option value="">Seleccione una especialidad</option>
                <option value="cardiología">Cardiología</option>
                <option value="traumatologia">Traumatología</option>
                <option value="neurología">Neurología</option>
                <option value="oncología">Oncología</option>
                <option value="pediatría">Pediatría</option>
                <option value="psiquiatría">Psiquiatría</option>
                <option value="urología">Urología</option>
                <option value="otros">Otros</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold flex items-center justify-center transition duration-200"
                disabled={cargando}
              >
                {cargando ? (
                  <ClipLoader color="#fff" size={20} />
                ) : (
                  "Crear Usuario"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrarUser;
