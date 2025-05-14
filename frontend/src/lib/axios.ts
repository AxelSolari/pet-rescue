import axios from "axios";

//# wrapper de axios, cuando se realice la consulta solamente se colocaria 'api'
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL 
})

export default api