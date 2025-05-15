import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify"; 
import PublicationForm from "../../components/publications/PublicationForm";
import type { PublicationFormData } from "../../types";
import { createPublication } from "../../api/ProjectAPI";
import { useMutation } from "@tanstack/react-query";


export default function CreatePublicationView() {
    

    const navigate = useNavigate()
    const simulatedUser = "Invitado"
    const initualValues: PublicationFormData= {
        publicationName: "", 
        userName: simulatedUser,
        images: [],
        description: "", 
        status: ""
    }
    const { register, handleSubmit, formState: {errors}} = useForm({defaultValues: initualValues})

    //#mutation para enviar los datos
    const { mutate } = useMutation({
        mutationFn: createPublication,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate('/dashboardview')
        }
    })

    //#tomar los datos del form
    const handleForm = (formData : PublicationFormData) => {
        mutate(formData)
    }
  return (
     <>
        <Link
            className="flex items-center gap-2 text-slate-400 mt-5 px-2"
            to='/dashboardview'
            ><ArrowLeftIcon className="w-8 h-8 text-black border rounded-lg border-slate-400 p-1 hover:bg-slate-500 hover:text-white" />Volver a Mis Publicaciones</Link>
            <h1 className=" text-2xl text-center mt-5">Crear Publicacion</h1>
            <p className="text-sm text-center text-slate-400">Completa el formulario para generar una nueva Publicacion</p>

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
                value='Crear Publicacion'
            />
        </form>

    </>
  )
}
