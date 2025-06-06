
import { useForm } from "react-hook-form";
import type { UserLoginForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authenticateGuest, authenticateUser } from "../../api/AuthAPI";
import { toast } from "react-toastify";
export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Iniciando sesion...')
      setTimeout(() => {
        navigate("/")
      },1000)
    }
  })

  const { mutate: guestMutate } = useMutation({
    mutationFn: authenticateGuest,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Iiniciando sesion como invitado...')
      setTimeout(() => {
        navigate('/')
      }, 1000);
    }
  })

  const handleLogin = (formData: UserLoginForm) => { mutate(formData) }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="p-5 bg-white/20 backdrop-blur-2xl  rounded-lg border border-white shadow-lg w-[90%] lg:w-1/2 mx-auto"
        noValidate
      >
        <h2 className="mb-5 text-center text-3xl text-indigo-800 font-bold">Inicia Sesion</h2>
        <p className="mb-5 text-center text-slate-700">Inicia sesion para poder crear <span className="font-bold text-indigo-700">publicaciones</span></p>
        <div className="flex flex-col">
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full p-2  border-white border rounded text-black bg-transparent focus:outline-none focus:rin-0 placeholder-slate-700 focus:bg-black/10 mb-5"
            {...register("email", {
              required: "El Email es obligatorio",
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

        <div className="flex flex-col gap-5">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2  border-white border rounded focus:outline-none focus:rin-0 placeholder-slate-700 focus:bg-black/10 mb-5"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-rose-400 hover:bg-rose-700 mx-auto block w-1/2 lg:w-1/3 p-2  text-white cursor-pointer rounded-lg transition-all duration-300"
        />


      </form>
        <div className="border-b my-5 w-1/2 mx-auto"></div>
        <button 
          className="block mx-auto italic"
          onClick={() => guestMutate()}
          >Iniciar sesion como <span className="text-indigo-600 font-bold cursor-pointer">Invitado</span></button>

      <nav className="mt-5 flex flex-col space-y-4">
          <Link
            to={'/auth/register'}
            className="text-center text-slate-700"
          >No tienes cuenta? <span className="text-indigo-600 font-bold">Registrate</span></Link>
          <Link
            to={'/auth/forgot-password'}
            className="text-center text-slate-700"
          >Olvidaste tu password? <span className="text-indigo-600 font-bold">Reestablecer</span></Link>
      </nav>
    </>
  )
}