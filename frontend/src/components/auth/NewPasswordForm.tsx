import type { ConfirmToken, NewPasswordForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordWithToken } from "../../api/AuthAPI";
import { toast } from "react-toastify";


type NewPasswordFormProps = { 
    token: ConfirmToken['token']
}   

export default function NewPasswordForm({token} : NewPasswordFormProps) {
    const navigate = useNavigate()
    const initialValues: NewPasswordForm = {
        password: '',
        password_confirmation: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: updatePasswordWithToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate('/auth/login')
        }
    })

    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = { 
            formData,
            token
        }
        mutate(data)
    }

    const password = watch('password');

    return (
        <>
            <p className="text-center mt-5 text-2xl text-slate-700">Coloca tu nuevo <span className="font-bold text-indigo-700">password</span></p>
            
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="bg-white/20 backdrop-blur-2xl rounded-lg border border-white shadow-lg p-5 mt-10 space-y-5"
                noValidate
            >

                <div className="flex flex-col gap-5">
                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-white border rounded focus:outline-none focus:rin-0 focus:bg-black/10 placeholder-slate-700"
                        {...register("password", {
                            required: "El Password es obligatorio",
                            minLength: {
                                value: 8,
                                message: 'El Password debe ser mínimo de 8 caracteres'
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite Password de Registro"
                        className="w-full p-3   border-white border rounded focus:outline-none focus:rin-0 focus:bg-black/10 placeholder-slate-700"
                        {...register("password_confirmation", {
                            required: "Repetir Password es obligatorio",
                            validate: value => value === password || 'Los Passwords no son iguales'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Establecer Password'
                    className="bg-indigo-700 hover:bg-indigo-500 w-full p-2 rounded  text-white text-lg cursor-pointer"
                />
            </form>
        </>
    )
}