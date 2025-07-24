import Examenes from "./Examenes.jsx";
import Historial from "./Historial.jsx";
import Informacion from "./Informacion.jsx";
import NavbarAdmin from "../navbar/NavbarAdmin.jsx";
import { useNavigate, useParams } from "react-router-dom";
import BtnVolver from "../ui/BtnVolver.jsx";

const HistorialPaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/admin/pacientes/perfilPaciente/${id}`);
  };

  return (
    <>
      <NavbarAdmin />
      <BtnVolver onClick={handleNavigate} />

      <section className="flex flex-col lg:grid lg:grid-cols-3 ">
        <Informacion pacienteID={id} />
        <Historial pacienteID={id} />
        <Examenes pacienteID={id} />
      </section>
    </>
  );
};

export default HistorialPaciente;
