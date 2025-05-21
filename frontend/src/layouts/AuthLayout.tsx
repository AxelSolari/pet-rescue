import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { ToastContainer, Flip } from "react-toastify";

export default function AuthLayout() {
  return (
    <>
        <div className="min-h-dvh bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200">
            <div className="py-10 mx-auto w-[90%] ">
                <div className="w-32 mx-auto mb-10">
                    <Logo />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
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
