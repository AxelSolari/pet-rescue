import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import PublicationForm from "../../components/publications/PublicationForm";
import type { PublicationFormData } from "../../types";
export default function CreatePublicationView() {
    const simulatedUser = "Invitado"
    const initualValues: PublicationFormData= {
        publicationName: "", 
        userName: simulatedUser,
        images: "",
        description: "" 
    }
    const { register, handleSubmit, formState: {errors}} = useForm({defaultValues: initualValues})

    //#tomar los datos del form
    const handleForm = (data : PublicationFormData) => {
        console.log(data)
    }
  return (
     <>
        <Link
            className="flex items-center gap-2 text-slate-400"
            to='/dashboardview'
            ><ArrowLeftIcon className="w-8 h-8 text-black" />Volver a Mis Publicaciones</Link>
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
