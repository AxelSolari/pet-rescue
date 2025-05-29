import { useQuery} from "@tanstack/react-query";
import { getPublications } from "../api/ProjectAPI";
import { ClipLoader } from "react-spinners";
import ModalView from "./ModalView";
import { useNavigate } from "react-router-dom";

const statusColors: Record<string, string> = {
    perdido: "bg-red-700 text-white font-bold",
    enAdopcion: "bg-amber-500 text-black font-bold",
    encontrado: "bg-green-700 text-white font-bold",
    adoptado: "bg-blue-700 text-white font-bold",
};
const statusText: Record<string, string> = {
    perdido: "Perdido",
    enAdopcion: "En Adopcion",
    encontrado: "Encontrado",
    adoptado: "Adoptado",
};

export default function MainList() {
    

    const { data, isLoading } = useQuery({
        queryKey: ["publications"],
        queryFn: getPublications,
  
    });



    const navigate = useNavigate()

    if (isLoading)
        return (
            <div className="mt-20 flex justify-center">
                <ClipLoader size={70} color="blue" />
            </div>
        );
    if (data)
        return (
            <>
                <ul role="list" className=" mt-10">
                    {data.map((publication) => (
                        <li
                            key={publication._id}
                            className="bg-white py-2 mb-4 shadow-lg px-3 rounded-lg w-[95%] border border-white lg:hover:border lg:hover:border-rose-300 lg:w-1/2 mx-auto cursor-pointer transition-all"
                            onClick={() => navigate(`/?viewDetails=true&publicationId=${publication._id}`)}
                        >
                            <div>
                                <div className="gap-2 flex py-2 items-center lg:justify-between">
                                    <h3 className="text-xl">
                                        {publication.publicationName}
                                    </h3>
                                    |
                                    <p className="text-sm">
                                        Creado por:{" "}
                                        <span className="font-semibold">
                                            {publication.userProfile.userName}
                                        </span>
                                    </p>
                                </div>
                                <div className="w-full border-b border-gray-400"></div>
                                <div className="flex items-center gap-6 lg:justify-around">
                                    <img
                                        src="/perro.jpg"
                                        className="w-44 my-3 rounded"
                                    />
                                    <p className="font-medium text-lg text-center flex flex-col justify-center">
                                        Estado:{" "}
                                        <span
                                            className={`text-xs px-3 py-1 rounded-full ${
                                                statusColors[publication.status]
                                            }`}
                                        >
                                            {statusText[publication.status]}
                                        </span>
                                    </p>
                                </div>
                                <div className="w-full border-b border-gray-400"></div>
                                <p className="font-medium">
                                    Descripcion de la publicacion :
                                </p>
                                <p className="text-sm py-1 break-all overflow-hidden">
                                    {publication.description}
                                </p>
                            </div>
                          
                        </li>
                    ))}
                </ul>
                <ModalView />
            </>
        );
}