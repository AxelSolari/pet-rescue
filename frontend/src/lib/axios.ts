import axios from "axios";

//# wrapper de axios, cuando se realice la consulta solamente se colocaria 'api'
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL 
})

//# interceptor para obtener el token (si existe) 
api.interceptors.request.use( config => {
    const token = localStorage.getItem('AUTH_TOKEN')
    // console.log(token)
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}) 

export default api