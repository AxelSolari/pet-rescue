import { Link } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { getPublications } from "../api/ProjectAPI";
import { ClipLoader } from "react-spinners";
import NavCard from "../components/publications/NavCard";

export default function DashBoardView() {
    const { data, isLoading } = useQuery({
        queryKey: ["publications"],
        queryFn: getPublications,
    });
    // console.log(data)
    if (isLoading)
        return (
            <div className="mt-20 flex justify-center">
                <ClipLoader size={70} color="blue" />
            </div>
        );

    if (data)
        return (
            <>
                <h1 className="font-semibold text-2xl text-center mt-10">
                    Mis Publicaciones
                </h1>

                {data.length ? (
                    <>
                        <Link
                            className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-1 cursor-pointer transition-colors rounded-lg flex items-center justify-center gap-1 mx-auto w-48 my-5"
                            to="/publications/create"
                        >
                            Nueva Publicacion
                            <PlusCircleIcon className="w-5 h-5 text-whie" />{" "}
                        </Link>

                        <ul
                            role="list"
                            className=" mt-10"
                        >
                            {data.map((publication) => (
                                <li
                                    key={publication._id}
                                    className="bg-white py-2 mb-4 shadow-lg px-3 rounded-lg w-[90%] lg:w-1/2 mx-auto"
                                >
                                    <div className="">
                                      <NavCard
                                        publicationId ={publication._id}
                                      />
                                        <div className="gap-2 flex py-2 items-center">
                                            <h3 className="text-xl">
                                                {publication.publicationName}
                                            </h3>
                                            |
                                            <p className="text-sm"
                                            >Creado por: <span className="font-semibold">{publication.userName}</span></p>
                                        </div>
                                        <div className="bg-slate-500 py-[.5px]"></div>
                                        <div className="flex items-center gap-6">
                                            <img src='/perro.jpg' className="w-44 my-3 rounded" />
                                            <p className="font-medium text-lg text-center flex flex-col justify-center">Estado: <span className={`text-xs px-3 py-1 rounded-full ${publication.status === 'perdido' ? "bg-red-700 text-white font-bold" : "bg-amber-400 font-bold"}`}>{publication.status === 'perdido' ? 'Perdido' : 'En Adopcion'}</span> </p>
                                        </div>
                                        <div className="bg-slate-500 py-[.5px]"></div>
                                        <p className="font-medium">Descripcion de la publicacion :</p>
                                        <p className="text-sm py-1">
                                            {publication.description}
                                        </p>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <div className="mt-20">
                        <p className="text-center italic mb-5">
                            No hay publicaciones para mostrar
                        </p>
                        <div className="p-[.5px] bg-slate-500 w-1/2 mx-auto my-5"></div>
                        <Link
                            className="bg-indigo-700 hover:bg-indigo-500 px-2 text-white font-bold py-2 cursor-pointer transition-colors rounded-lg flex items-center justify-center gap-1 mx-auto w-50"
                            to="/publications/create"
                        >
                            {" "}
                            Nueva Publicacion
                            <PlusCircleIcon className="w-5 h-5 text-whie" />{" "}
                        </Link>
                    </div>
                )}
            </>
        );
}

