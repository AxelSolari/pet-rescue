import { Link } from "react-router-dom";
import { ArrowTopRightOnSquareIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
export default function NavCard() {
  return (
        <nav className="flex justify-end gap-2 px-2">
            <Link
                to={''}
                className="flex text-sm items-center gap-1"
            >
            <ArrowTopRightOnSquareIcon 
                className="w-4 h-4"
            />
                Ver
            </Link>
            
            <Link
                to={''}
                className="flex text-sm items-center gap-1"
            >
            <PencilSquareIcon 
                className="w-4 h-4"
            />
                Editar
            </Link>
            <Link
                to={''}
                className="flex text-sm items-center gap-1"
            >
            <TrashIcon 
                className="w-4 h-4"
            />
                Eliminar
            </Link>
        </nav>
  )
}
