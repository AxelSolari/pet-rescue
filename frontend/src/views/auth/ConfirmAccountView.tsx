import { Link } from "react-router-dom";
import {PinInput, PinInputField} from '@chakra-ui/pin-input'
import { useState } from "react";
import type { ConfirmToken } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "../../api/AuthAPI";
import { toast } from "react-toastify";


export default function ConfirmAccountView() {
    const [token, setToken] = useState<ConfirmToken['token']>('')
    
    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
        }   
    })

    const handleChange = (token : ConfirmToken['token']) => {
        setToken(token)
    }
    const handleComplete = (token : ConfirmToken['token']) => {
        // console.log(token)
        mutate({token})
    }
  return (
    <>
    <div className="flex flex-col items-center justify-center w-[90%] mx-auto">

      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-slate-700 mt-5">
        Ingresa el código que recibiste {''}
        <span className=" text-indigo-600 font-bold"> por e-mail</span>
      </p>
      <form
        className="p-5 mt-10 w-full max-w-xs bg-amber-100/40 rounded-lg space-y-5"
      >
        <label
          className="text-2xl text-center block text-indigo-700"
        >Código de 6 dígitos</label>
        <div className="grid grid-cols-3 justify-center place-items-center gap-2 ">
            <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-slate-500 border placeholder-transparent place-items-center" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-slate-500 border placeholder-transparent place-items-center" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-slate-500 border placeholder-transparent place-items-center" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-slate-500 border placeholder-transparent place-items-center" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-slate-500 border placeholder-transparent place-items-center" />
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-slate-500 border placeholder-transparent place-items-center" />
                
                
               
            </PinInput>
        </div>

      </form>
    </div>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/new-code'
          className="text-center text-slate-600 text-lg"
        >
          Solicitar un nuevo <span className="text-indigo-600 font-bold">Código</span>
        </Link>
      </nav>

    </>
  )
}