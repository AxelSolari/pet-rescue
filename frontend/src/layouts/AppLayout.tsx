import { Outlet } from "react-router-dom"
import Logo from "../components/Logo"
import NavMenu from "../components/NavMenu"
export default function AppLayout() {
  return (
    <>
        <header
            className="bg-amber-300 py-5 px-2"
        >
            <div className="flex items-center justify-between px-4 lg:justify-around">
                <div className="w-22 flex items-center">
                    <Logo />
                </div>
                <h1>PETRESCUE</h1>
                <NavMenu />
            </div>
        </header>
        <section className="">
            <Outlet />
        </section>

        <footer className="py-2">
            <p className="text-center">Copyright • {new Date().getFullYear()}</p>
        </footer>
    </>
  )
}
