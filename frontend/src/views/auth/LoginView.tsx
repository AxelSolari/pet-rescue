
import { useForm } from "react-hook-form";
import type { UserLoginForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { Link } from "react-router-dom";
export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const handleLogin = (formData: UserLoginForm) => { }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-5 bg-white/20 backdrop-blur-2xl  rounded-lg border border-white shadow-lg"
        noValidate
      >
        <p className="text-center text-3xl text-indigo-800 font-bold">Inicia Sesion</p>
        <div className="flex flex-col gap-5">
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-2  border-white border rounded text-black bg-transparent focus:outline-none focus:rin-0 placeholder-slate-700 focus:bg-black/10"
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
            placeholder="Password de Registro"
            className="w-full p-2  border-white border rounded focus:outline-none focus:rin-0 placeholder-slate-700 focus:bg-black/10"
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
          className="bg-indigo-700 hover:bg-indigo-500 mx-auto block w-1/2 p-2  text-white cursor-pointer rounded-lg transition-all duration-300"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
          <Link
            to={'/auth/register'}
            className="text-center text-slate-700"
          >No tienes cuenta? <span className="text-indigo-600 font-bold">Registrate</span></Link>
      </nav>
    </>
  )
}