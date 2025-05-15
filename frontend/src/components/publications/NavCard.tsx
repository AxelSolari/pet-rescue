import { Link } from "react-router-dom";
import { ArrowTopRightOnSquareIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";

type NavCardProps= {
    publicationId : string
}

export default function NavCard({publicationId} : NavCardProps) {
  return (
        <nav className="flex justify-around text-slate-500">
            <Link
                to={''}
                className="flex text-sm items-center gap-1 p-1 border border-white hover:border-slate-500 hover:rounded-lg"
            >
            <ArrowTopRightOnSquareIcon 
                className="w-4 h-4"
            />
                Ver
            </Link>
            
            <Link
                to={`/publications/${publicationId}/edit`}
                className="flex text-sm items-center gap-1 p-1 border border-white hover:border-slate-500 hover:rounded-lg"
            >
            <PencilSquareIcon 
                className="w-4 h-4"
            />
                Editar
            </Link>
            <Link
                to={''}
                className="flex text-sm items-center gap-1 p-1 border border-white hover:border-slate-500 hover:rounded-lg"
            >
            <TrashIcon 
                className="w-4 h-4"
            />
                Eliminar
            </Link>
        </nav>
  )
}
