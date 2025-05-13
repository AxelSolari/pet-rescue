import { Link } from "react-router-dom"
import { PlusCircleIcon } from '@heroicons/react/20/solid'
export default function DashBoardView() {
  return (
    <>
        <h1 className="font-semibold text-2xl text-center mt-2">Mis Publicaciones</h1>

        <nav className="my-5 text-center">
           
            <Link
                className="bg-indigo-700 hover:bg-indigo-500 px-2 text-white font-bold py-2 cursor-pointer transition-colors rounded-lg flex items-center justify-center gap-1 mx-auto w-50"
                to='/publications/create'
                > Nueva Publicacion<PlusCircleIcon className="w-5 h-5 text-whie"/> </Link>
            
        </nav>
    </>
  )
}
