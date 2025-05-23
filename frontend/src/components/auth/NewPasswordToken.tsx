
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { Link } from 'react-router-dom';
import type { ConfirmToken } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { validateToken } from '../../api/AuthAPI';
import { toast } from 'react-toastify';

type NewPasswordTokenProps = { 
    token: ConfirmToken['token']
    setToken: React.Dispatch<React.SetStateAction<string>>
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}   

export default function NewPasswordToken({ token, setToken, setIsValidToken } : NewPasswordTokenProps) {
    
    const { mutate } = useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            setIsValidToken(true)
        }
    })
    
    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
    }
    const handleComplete = (token: ConfirmToken['token']) => {
        // console.log(token)
        mutate({token})
        
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-[90%] mx-auto">
                 <p className="text-2xl font-light text-slate-700 mt-5 text-center">Ingresa el codigo que recibiste <span className="font-bold text-indigo-700">por e-mail</span></p>
                <form className="p-4 mt-10 w-full max-w-xs bg-white/20 backdrop-blur-2xl rounded-lg border border-white shadow-lg">
                    <label className="text-2xl text-center block text-indigo-700 mb-5">
                        Código de 6 dígitos
                    </label>
                    <div className="grid grid-cols-3 place-items-center gap-4 ">
                        <PinInput
                            value={token}
                            onChange={handleChange}
                            onComplete={handleComplete}
                        >
                            <PinInputField className="w-10 h-10 rounded-lg border-slate-500 border placeholder-transparent place-items-center" />
                            <PinInputField className="w-10 h-10  rounded-lg border-slate-500 border placeholder-transparent place-items-center" />
                            <PinInputField className="w-10 h-10 rounded-lg border-slate-500 border placeholder-transparent place-items-center" />
                            <PinInputField className="w-10 h-10  rounded-lg border-slate-500 border placeholder-transparent place-items-center" />
                            <PinInputField className="w-10 h-10  rounded-lg border-slate-500 border placeholder-transparent place-items-center" />
                            <PinInputField className="w-10 h-10  rounded-lg border-slate-500 border placeholder-transparent place-items-center" />
                        </PinInput>
                    </div>
                </form>
            </div>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to="/auth/request-code"
                    className="text-center text-slate-700 text-lg"
                >
                    Solicitar un nuevo{" "}
                    <span className="text-indigo-700 font-bold">Código</span>
                </Link>
            </nav>
        </>
    );
}