import { useState } from "react"
import NewPasswordToken from "../../components/auth/NewPasswordToken"
import NewPasswordForm from "../../components/auth/NewPasswordForm"

export default function NewPasswordView() {

    const [isValidToken, setIsValidToken] = useState(false)

  return (
    <>
        <h1 className="text-5xl font-black text-indigo-700 text-center">Reestablecer Password</h1>
       

        {!isValidToken ? <NewPasswordToken /> : <NewPasswordForm />}
    </>
  )
}
