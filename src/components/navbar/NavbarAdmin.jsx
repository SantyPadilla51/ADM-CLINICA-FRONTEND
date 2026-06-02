import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavbarAdmin = () => {
  const navigate = useNavigate();

  const cerrarSesion = (e) => {
    e.preventDefault();
    const toastID = toast.loading("Cerrando Sesion");
    const borrarToken = localStorage.removeItem("token");

    if (borrarToken === undefined) {
      toast.update(toastID, {
        render: "Sesión cerrada correctamente",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error("Hubo un error al cerrar sesión");
    }
  };

  const handleInicio = (e) => {
    e.preventDefault();
    navigate("/admin/pacientes");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3.5 flex justify-between items-center transition-all">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-white flex items-center justify-center shadow-sm shadow-blue-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-base tracking-tight leading-none">
              Doc Panel
            </h1>
            <span className="text-[10px] font-semibold text-blue-600 tracking-wider uppercase block mt-0.5">
              Panel de Pacientes
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={(e) => handleInicio(e)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 text-sm font-semibold transition-all duration-150 active:scale-[0.98]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <span className="hidden sm:inline">Inicio</span>
          </button>

          <div className="h-5 w-px bg-slate-200" />

          <button
            onClick={(e) => cerrarSesion(e)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 text-sm font-bold transition-all duration-150 active:scale-[0.98]"
          >
            <span className="hidden sm:inline">Cerrar Sesión</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavbarAdmin;
