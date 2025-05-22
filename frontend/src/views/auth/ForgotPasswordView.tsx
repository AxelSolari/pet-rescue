import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import type { ForgotPasswordForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../api/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data)
    }
  })

  const handleForgotPassword = (formData: ForgotPasswordForm) => {mutate(formData)}


  return (
    <>
        <h2 className="text-4xl text-indigo-700 text-center font-bold mb-6">Reestablecer contrasena</h2>
        <p className="text-xl text-center text-slate-700 mb-5">Ingresa tu email para <span className="font-bold text-indigo-700">reestablecer tu contrasena</span></p>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 w-full p-7 bg-white/20 backdrop-blur-2xl  rounded-lg border border-white shadow-lg"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-2  border-white border rounded focus:outline-none focus:rin-0 placeholder-slate-700 focus:bg-black/10"
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
          value='Enviar Instrucciones'
          className="bg-indigo-700 hover:bg-indigo-500 w-full p-2 rounded  text-white  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/login'
          className="text-center text-slate-700"
        >
          ¿Ya tienes cuenta? <span className="text-indigo-700 font-bold">Iniciar Sesión</span>
        </Link>

        <Link
          to='/auth/register'
          className="text-center text-slate-700"
        >
          ¿No tienes cuenta? <span className="text-indigo-700 font-bold">Crea Una</span>
        </Link>
      </nav>
    </>
  )
}