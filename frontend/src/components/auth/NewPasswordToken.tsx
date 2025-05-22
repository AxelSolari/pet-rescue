
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { Link } from 'react-router-dom';

export default function NewPasswordToken() {
    const handleChange = (token: string) => {}
    const handleComplete = (token: string) => {}

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
                            value={"123456"}
                            onChange={handleChange}
                            onComplete={handleChange}
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