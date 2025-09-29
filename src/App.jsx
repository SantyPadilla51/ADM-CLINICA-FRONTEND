import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import InicioSesion from "./components/auth/InicioSesion";
import EditarPaciente from "./components/pacientes/EditarPaciente";
import RegistrarUser from "./components/auth/RegistrarUser";
import RegistrarPaciente from "./components/pacientes/RegistrarPaciente";
import ConfirmarCuenta from "./components/auth/ConfirmarCuenta";
import RestablecerPassword from "./components/auth/RestablecerPassword";
import NuevoPassword from "./components/auth/NuevoPassword";
import RutasProtegidas from "./components/auth/RutasProgetidas";
import ContenedorPacientes from "./components/pacientes/ContenedorPacientes";
import ActualizarSintomas from "./components/pacientes/ActualizarSintomas";
import MiPerfil from "./components/perfil/MiPerfil";
import PerfilPaciente from "./components/pacientes/PerfilPaciente";
import EditarPerfil from "./components/perfil/EditarPerfil";
import HistorialPaciente from "./components/pacientes/HistorialPaciente";
import Turnos from "./components/auth/Turnos";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer position="top-right" autoClose={2000} />
          <Routes>
            <Route path="/" element={<InicioSesion />} />
            <Route path="crear-cuenta" element={<RegistrarUser />} />
            <Route
              path="confirmar-cuenta/:token"
              element={<ConfirmarCuenta />}
            />
            <Route path="olvide-password/" element={<RestablecerPassword />} />
            <Route path="olvide-password/:token" element={<NuevoPassword />} />
            <Route path="editar-perfil/:id" element={<EditarPerfil />} />

            <Route path="/admin" element={<RutasProtegidas />}>
              <Route path="pacientes/turnos" element={<Turnos />} />
              <Route path="pacientes" element={<ContenedorPacientes />} />
              <Route
                path="pacientes/crear-paciente"
                element={<RegistrarPaciente />}
              />
              <Route path="pacientes/editar/:id" element={<EditarPaciente />} />
              <Route
                path="pacientes/perfilPaciente/:id"
                element={<PerfilPaciente />}
              />
              <Route
                path="pacientes/actualizar-sintomas/:id"
                element={<ActualizarSintomas />}
              />
              <Route path="pacientes/perfil" element={<MiPerfil />} />
              <Route
                path="pacientes/historial/:id"
                element={<HistorialPaciente />}
              />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
