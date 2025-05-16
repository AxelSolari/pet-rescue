import { Link, useNavigate } from "react-router-dom"
import PublicationForm from "./PublicationForm"
import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import type { Publication, PublicationFormData } from "../../types"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePublication } from "../../api/ProjectAPI"
import { toast } from "react-toastify"

//#type para edicion de form
type EditPublicationFormProps = {
    data: PublicationFormData
    publicationId: Publication['_id']
}

export default function EditPublicationForm({data, publicationId} : EditPublicationFormProps) {
    
        const navigate = useNavigate()
    // console.log(data)
        const { register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
             publicationName: data.publicationName, 
            userName: data.userName,
            images: data.images,
            description: data.description, 
            status: data.status
        }})

        //#instancia de queryClient
        const queryClient = useQueryClient()
        //#mutation config
        const { mutate } = useMutation({
            mutationFn: updatePublication,
            onError: (error) => {
                toast.error(error.message)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({queryKey: ['publications']})
                queryClient.invalidateQueries({queryKey: ['editPublication', publicationId]})//# para que haga refetch en la edicion
                toast.success(data)
                navigate('/dashboardview')
            }
        })

        const handleForm = (formData: PublicationFormData) => {
                // console.log(formData)
                const data = {
                    formData,
                    publicationId
                }
                mutate(data)
        }
  return (
   <>
        <Link
            className="flex items-center gap-2 text-slate-400 mt-5 px-2"
            to='/dashboardview'
            ><ArrowLeftIcon className="w-8 h-8 text-black border rounded-lg border-slate-400 p-1 hover:bg-slate-500 hover:text-white" />Volver a Mis Publicaciones</Link>
            <h1 className=" text-2xl text-center mt-5">Editar Publicacion</h1>
            <p className="text-sm text-center text-slate-400">Puedes editar los campos de la Publicacion</p>

        <form
            className="mt-10 mb-32 bg-slate-50 shadow-lg p-10 rounded-lg lg:w-1/2 lg:mx-auto"
            onSubmit={handleSubmit(handleForm)}
            noValidate
        >

            <PublicationForm 
                register={register}
                errors={errors}
            />

            <input
                className="bg-indigo-600 w-52 block text-sm mx-auto py-2 text-white uppercase hover:bg-indigo-400 font-bold cursor-pointer transition-colors lg:w-60 lg:mx-auto rounded-lg"
                type="submit"
                value='Guardar cambios'
            />
        </form>

    </>
  )
}
