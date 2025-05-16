import { Link } from "react-router-dom";
import { ArrowTopRightOnSquareIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";

type NavCardProps= {
    publicationId : string
    mutate: (id: string) => void
}

export default function NavCard({publicationId, mutate} : NavCardProps) {
  return (
        <nav className="flex justify-around text-slate-500">
            <Link
                to={''}
                className="flex text-sm items-center gap-1 p-1 border border-white hover:border-slate-500 hover:rounded-lg hover:text-blue-700"
            >
            <ArrowTopRightOnSquareIcon 
                className="w-4 h-4"
            />
                Ver
            </Link>
            
            <Link
                to={`/publications/${publicationId}/edit`}
                className="flex text-sm items-center gap-1 p-1 border border-white hover:border-slate-500 hover:rounded-lg hover:text-yellow-700"
            >
            <PencilSquareIcon 
                className="w-4 h-4"
            />
                Editar
            </Link>
            <Link
                to={''}
                className="flex text-sm items-center gap-1 p-1 border border-white hover:border-slate-500 hover:rounded-lg hover:text-red-600"
                onClick={() => mutate(publicationId)}
            >
            <TrashIcon 
                className="w-4 h-4"
            />
                Eliminar
            </Link>
        </nav>
  )
}
