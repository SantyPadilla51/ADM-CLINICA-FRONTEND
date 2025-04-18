import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RutasProgetidas = () => {
    const { auth, cargando } = useAuth()

    if (cargando) {
        return <div>Cargando...</div>
    }

    return (

        <>
            {auth?.id ? (<Outlet />) : <Navigate to="/" />}

        </>
    )
}

export default RutasProgetidas