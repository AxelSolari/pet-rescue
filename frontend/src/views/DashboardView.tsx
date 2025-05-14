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

                {/* {isLoading && <ClipLoader className="mt-10" size={70} color="blue"/>} */}
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
                            className=" mt-10 bg-amber-200 shadow-lg"
                        >
                            {data.map((publication) => (
                                <li
                                    key={publication._id}
                                    className="bg-blue-400 py-2"
                                >
                                    <div className="">
                                      <NavCard />
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
