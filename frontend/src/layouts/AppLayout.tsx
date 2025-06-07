import { Navigate, Outlet } from "react-router-dom"
import Logo from "../components/Logo"
import NavMenu from "../components/NavMenu"
import { Flip, ToastContainer } from 'react-toastify'
import { useAuth } from "../components/hooks/useAuth"

export default function AppLayout() {

    const { data, isError } = useAuth()
    console.log(data)

    if(isError) {
        return <Navigate to='/auth/login' />
    }


  if(data) return (
    <>
        <header
            className="bg-violet-100 py-5 px-2"
        >
            <div className="flex items-center justify-between px-4 lg:justify-around">
                <div className="w-22 flex items-center">
                    <Logo />
                </div>
                <h1 className="font-display font-semibold text-indigo-700 text-xl">PetRescue</h1>
                <NavMenu  
                    userName={data.userName}
                    isGuest={data._id === 'invitado'}
                />
            </div>
        </header>
        <section className="">
            <Outlet />
        </section>
         <footer className="py-2 bg-violet-100 rounded-t-lg w-full">
            <p className="text-center">Copyright • {new Date().getFullYear()}</p>
        </footer>
        <ToastContainer
            position="top-center"
            autoClose={2000}
            closeOnClick={false}
            transition={Flip}
            pauseOnHover={false}
            icon={({ type }) => {
            if (type === "success") return "✅";
            if (type === "error") return "⛔";
            else return "ℹ️";
            }}
        />
    </>
  )
}
