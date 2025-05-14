import { isAxiosError } from "axios";
import api from "../lib/axios";
import { dashboardPublications, type PublicationFormData } from "../types";

//#se crea archivo ProjectAPi donde se va a menejar las consultas a la api

//# funcion de consulta para el formulario que crea la publicacion
export async function createPublication(formData: PublicationFormData) {
    // console.log(data)
    try {
        //
        const { data } = await api.post('/publications', formData)
        // console.log(data)
        return data
    } catch (error) {
        //#manejo de error con axios
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

//# obtener las publicaciones
export async function getPublications() {
    try {
        //
        const { data } = await api('/publications')
        // console.log(data)
        //#validar respuesta con el nuevo schema
        const response = dashboardPublications.safeParse(data)
        // console.log(response)
        if(response.success){
            return response.data
        }
    } catch (error) {
        //#manejo de error con axios
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}