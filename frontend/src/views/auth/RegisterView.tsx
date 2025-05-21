import { useForm } from "react-hook-form";
import type { UserRegistrationForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../../api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
  
  const initialValues: UserRegistrationForm = {
    userName: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess:(data) => {
        toast.success(data)
        reset()
    }
  })

  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData)
  }

  return (
      <>
          <h1 className="text-5xl font-black text-indigo-800 text-center">
              Registrar Cuenta
          </h1>
          <p className="text-center text-2xl font-light text-slate-700 mt-5">
              Llena el formulario para {""}
              <span className=" text-indigo-500 font-bold">
                  {" "}
                  crear tu cuenta
              </span>
          </p>

          <form
              onSubmit={handleSubmit(handleRegister)}
              className="space-y-8 p-5 mt-5 bg-white/20 backdrop-blur-2xl  rounded-lg border border-white shadow-lg"
              noValidate
          >
              <div className="flex flex-col gap-5">
                  <label
                      className="font-normal text-2xl text-indigo-800 "
                      htmlFor="email"
                  >
                      Email
                  </label>
                  <input
                      id="email"
                      type="email"
                      placeholder="Email de Registro"
                      className="w-full p-3  border-white border rounded focus:outline-none focus:rin-0 placeholder-slate-700 focus:bg-black/10"
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

              <div className="flex flex-col gap-5">
                  <label className="font-normal text-2xl text-indigo-800 ">
                      Nombre
                  </label>
                  <input
                      type="name"
                      placeholder="Nombre de Registro"
                      className="w-full p-3  border-white border rounded focus:outline-none focus:rin-0 placeholder-slate-700 focus:bg-black/10"
                      {...register("userName", {
                          required: "El Nombre de usuario es obligatorio",
                      })}
                  />
                  {errors.userName && (
                      <ErrorMessage>{errors.userName.message}</ErrorMessage>
                  )}
              </div>

              <div className="flex flex-col gap-5">
                  <label className="font-normal text-2xl text-indigo-800 ">
                      Password
                  </label>

                  <input
                      type="password"
                      placeholder="Password de Registro"
                      className="w-full p-3  border-white border rounded focus:outline-none focus:rin-0 placeholder-slate-700 focus:bg-black/10"
                      {...register("password", {
                          required: "El Password es obligatorio",
                          minLength: {
                              value: 8,
                              message:
                                  "El Password debe ser mínimo de 8 caracteres",
                          },
                      })}
                  />
                  {errors.password && (
                      <ErrorMessage>{errors.password.message}</ErrorMessage>
                  )}
              </div>

              <div className="flex flex-col gap-5">
                  <label className="font-normal text-2xl text-indigo-800 ">
                      Repetir Password
                  </label>

                  <input
                      id="password_confirmation"
                      type="password"
                      placeholder="Repite Password de Registro"
                      className="w-full p-3   border-white border rounded focus:outline-none focus:rin-0 placeholder-slate-700 focus:bg-black/10"
                      {...register("password_confirmation", {
                          required: "Repetir Password es obligatorio",
                          validate: (value) =>
                              value === password ||
                              "Los Passwords no son iguales",
                      })}
                  />

                  {errors.password_confirmation && (
                      <ErrorMessage>
                          {errors.password_confirmation.message}
                      </ErrorMessage>
                  )}
              </div>

              <input
                  type="submit"
                  value="Registrarme"
                  className="bg-indigo-700 hover:bg-indigo-500 mx-auto block w-full p-2  text-white cursor-pointer rounded-lg transition-all duration-300 uppercase"
              />

            <div className="flex w-full items-center rounded-full">
                <div className="flex-1 border-b border-slate-700"></div>
                <span className="text-black text-lg font-semibold px-2">O</span>
                <div className="flex-1 border-b border-slate-700"></div>
            </div>
            <button 
                className="flex items-center justify-center gap-2 bg-white w-full text-black text-lg p-2 rounded-lg"
            ><img className="w-4 h-4" src="/icons/google.svg" />Continua con Google</button>
          </form>
          <nav className="mt-10 flex flex-col space-y-4">
              <Link to={"/auth/login"} className="text-center text-slate-700">
                  Ya tienes cuenta?{" "}
                  <span className="text-indigo-600 font-bold">
                      Inicia sesion
                  </span>
              </Link>
          </nav>
      </>
  );
}