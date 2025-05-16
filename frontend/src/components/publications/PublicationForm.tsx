import type { PublicationFormData } from '../../types';
import ErrorMessage from '../ErrorMessage';
import type { UseFormRegister, FieldErrors  } from 'react-hook-form'

type PublicationFormProps = {
    register: UseFormRegister<PublicationFormData>
    errors: FieldErrors<PublicationFormData>
}

export default function PublicationForm({errors, register}: PublicationFormProps) {
    return (
        <>
            <div className='mb-5 space-y-3 flex flex-col'>
                <label htmlFor='status' className='text-sm uppercase font-bold'>
                    Selecciona un estado para la publicacion
                </label>
                <select
                    className='rounded border border-slate-400 p-1'
                    id='status'
                    {...register('status', {
                        required: 'Almenos un estado es requerido'
                    })}
                >   
                    <option value=''>Selecciona un estado</option>
                    <option value='perdido'>Perdido</option>
                    <option value='enAdopcion'>En Adopcion</option>
                    <option value='encontrado'>Encontrado</option>
                    <option value='adoptado'>Adoptado</option>
                </select>
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="publicationName" className="text-sm uppercase font-bold">
                    Titulo de la publicacion
                </label>
                <input
                    id="publicationName"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    type="text"
                    placeholder="Titulo de la Publicacion"
                    {...register("publicationName", {
                        required: "El Titulo de la publicacion es obligatorio",
                    })}
                />

                {errors.publicationName && (
                    <ErrorMessage>{errors.publicationName.message}</ErrorMessage>
                )}
            </div>


              

            <div className="mb-5 space-y-3">
                <label htmlFor="images" className="text-sm uppercase font-bold">
                    Subir imagenes
                </label>
                <input
                    id="images"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    type="text"
                    placeholder="Imagenes"
                    {...register("images", {
                        required: "Al menos una imagen es obligatoria",
                    })}
                />

                {errors.images && (
                    <ErrorMessage>{errors.images.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-sm uppercase font-bold">
                    Descripción
                </label>
                <textarea
                    id="description"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    placeholder="Ingresa una descripcion"
                    {...register("description", {
                        required: "La descripción es obligatoria"
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}