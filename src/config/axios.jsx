import axios from "axios"

const backendUrl = import.meta.env.VITE_BACKEND_URL

const clienteAxios = axios.create({
    baseURL: backendUrl,
    withCredentials: true
})

export default clienteAxios
