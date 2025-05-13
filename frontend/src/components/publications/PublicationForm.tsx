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
            <div className="mb-5 space-y-3">
                <label htmlFor="publicationName" className="text-sm uppercase font-bold">
                    Titulo de la publicacion
                </label>
                <input
                    id="publicationName"
                    className="w-full p-3  border border-gray-200"
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
                <label htmlFor="userName" className="text-sm uppercase font-bold">
                    Nombre de Usuario
                </label>
                <input
                    id="userName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre de Usuario"
                    {...register("userName", {
                        required: "El Nombre de usuario es obligatorio",
                    })}
                    readOnly
                />

                {errors.userName && (
                    <ErrorMessage>{errors.userName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="images" className="text-sm uppercase font-bold">
                    Subir imagenes
                </label>
                <input
                    id="images"
                    className="w-full p-3  border border-gray-200"
                    type="file"
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
                    className="w-full p-3  border border-gray-200"
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