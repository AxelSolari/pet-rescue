import { isAxiosError } from "axios";
import api from "../lib/axios";
import { dashboardPublications, publicationSchema, type Publication, type PublicationFormData } from "../types";

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

//#obtener la publicacion por Id//# se pasa type de publication para el id
export async function getPublicationById(id: Publication['_id']) {
    try {
        //
        const { data } = await api(`/publications/${id}`)
        const response = publicationSchema.safeParse(data)
        // console.log(response)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        //#manejo de error con axios
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

//#type para funcion que realiza update de publicacion
type PublicationAPIType = {
    formData: PublicationFormData
    publicationId: Publication['_id'] 
}
//#actualizar publicacion
export async function updatePublication({formData, publicationId}: PublicationAPIType) {
    try {
        const { data } = await api.put<string>(`/publications/${publicationId}`, formData)
        return data
    } catch (error) {
        //#manejo de error con axios
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

//#eliminar publicacion
export async function deletePublication(id: Publication['_id']) {
    try {
        //
        const { data } = await api.delete<string>(`/publications/${id}`)
        // console.log(data)
        return data
    } catch (error) {
        //#manejo de error con axios
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}