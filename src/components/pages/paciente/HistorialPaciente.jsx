import Examenes from "./Examenes.jsx";
import Historial from "./Historial.jsx";
import Informacion from "./Informacion.jsx";
import NavbarAdmin from "../../NavbarAdmin.jsx";
import { useNavigate, useParams } from "react-router-dom";

const HistorialPaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/admin/pacientes/perfilPaciente/${id}`);
  };

  return (
    <>
      <NavbarAdmin />
      <button
        className="mt-4 ms-4 bg-slate-500 p-2 rounded hover:bg-slate-400"
        onClick={handleNavigate}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="20 20"
          strokeWidth="2"
          stroke={"#fff"}
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </button>
      <section className="grid grid-cols-3 ">
        <Historial pacienteID={id} />
        <Informacion pacienteID={id} />
        <Examenes pacienteID={id} />
      </section>
    </>
  );
};

export default HistorialPaciente;
