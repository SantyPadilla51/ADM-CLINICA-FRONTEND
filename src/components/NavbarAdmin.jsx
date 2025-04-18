import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NavbarAdmin = () => {

    const navigate = useNavigate()
    const cerrarSesion = (e) => {
        e.preventDefault()
        const borrarToken = localStorage.removeItem('token')

        if (borrarToken === undefined) {
            toast.loading('Cerrando Sesion', {
                position: "top-center"
            });
            setTimeout(() => {
                navigate("/")
            }, 1500);
        } else {
            toast.error('Hubo un error al cerrar sesión')
        }
    }

    const handleInicio = (e) => {
        e.preventDefault()
        navigate("/admin/pacientes")
    }


    return (
        <>
            <ToastContainer />
            <nav className="bg-slate-100 p-4 uppercase text-black flex justify-between items-center shadow-md">
                <h1 className="font-bold">Administrador de Pacientes</h1>

                <section className="flex gap-5">
                    <div className="flex gap-4">
                        <button className="text-sm text-white bg-black p-2 hover:bg-gray-500" onClick={e => handleInicio(e)} >Inicio</button>
                    </div>
                    <div className="flex gap-4">
                        <button className="text-sm text-white bg-red-500 p-2  hover:bg-red-600" onClick={e => cerrarSesion(e)} >Cerrar Sesion</button>
                    </div>
                </section>
            </nav>
        </>
    )
}

export default NavbarAdmin