import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { RequestConfirmationCodeForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { requestConfirmationCode } from "../../api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
    const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: requestConfirmationCode,
        onError: (error)=> {
            toast.error(error.message)
        },
        onSuccess: (data)=> {
            toast.success(data)
        }
    })

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => {mutate(formData)}

    return (
        <>
            <div className="flex flex-col items-center w-[90%] mx-auto">
                <h1 className="text-3xl font-black text-slate-700">
                    Solicitar Código de Confirmación
                </h1>
                <p className="text-2xl text-slate-700 mt-5">
                    Coloca tu e-mail para recibir {""}
                    <span className=" text-indigo-700 font-bold">
                        {" "}
                        un nuevo código
                    </span>
                </p>

                <form
                    onSubmit={handleSubmit(handleRequestCode)}
                    className="p-6 mt-10 w-full max-w-xs bg-white/20 backdrop-blur-2xl  rounded-lg border border-white shadow-lg"
                    noValidate
                >
                    <div className="flex flex-col gap-5">
                        <input
                            id="email"
                            type="email"
                            placeholder="Email de Registro"
                            className="w-full p-3 rounded-lg border-white border mb-5 placeholder-slate-700 focus:outline-none focus:rin-0 focus:bg-black/10"
                            {...register("email", {
                                required: "El Email de registro es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                },
                            })}
                        />
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>

                    <input
                        type="submit"
                        value="Enviar Código"
                        className="bg-indigo-700 hover:bg-indigo-500 w-full p-2 rounded-lg text-white text-xl cursor-pointer"
                    />
                </form>

                <nav className="mt-10 flex flex-col space-y-4">
                    <Link
                        to="/auth/login"
                        className="text-center text-slate-700 font-normal"
                    >
                        ¿Ya tienes cuenta? <span className="text-indigo-700 font-bold">Iniciar Sesión</span>
                    </Link>
                    <Link
                        to="/auth/forgot-password"
                        className="text-center text-slate-700 font-normal"
                    >
                        ¿Olvidaste tu contraseña? <span className="text-indigo-700 font-bold">Reestablecer</span>
                    </Link>
                </nav>
            </div>
        </>
    );
}