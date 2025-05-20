import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, replace, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPublicationById } from '../api/ProjectAPI';
import { toast } from 'react-toastify';
import { formatDate } from '../utils/utils';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/20/solid';
import ShareButton from './ShareButton';

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

export default function ModalView() {

    //#logica para mostrar modal en base a parametro de url
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalView = queryParams.get('viewDetails')
    const show = modalView ? true : false
    // console.log(modalView)
    //#recupera id de la publicacion a mostrar
    const publicationId = queryParams.get('publicationId')!
    // console.log(publicationId)

    const { data, isError, error } = useQuery({
        queryKey: ['publication', publicationId ],
        queryFn: () => getPublicationById(publicationId),
        enabled: !!publicationId,
        retry: false
    })
    // console.log(data)

    useEffect(()=> {

        if(isError){
            toast.error(error.message, { toastId: 'error'})

            setTimeout(() => {
                navigate('/', {replace: true})
            }, 100);
        }

    }, [isError, error?.message, navigate])


    if(data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() =>
                        navigate(location.pathname, { replace: true })
                    }
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-5">
                                    <p className=" text-slate-500">
                                        Creado:{" "}
                                        <span className="font-semibold">
                                            {formatDate(data.createdAt)}
                                        </span>
                                    </p>
                                    <p className=" text-slate-500">
                                        Publicado por:{" "}
                                        <span className="font-bold text-lg">
                                            {data.userName}
                                        </span>
                                    </p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-2xl my-2"
                                    >
                                        {data.publicationName}
                                    </Dialog.Title>

                                    <img
                                        className="w-full"
                                        src="/perro.jpg"
                                        alt="Imagen del animal"
                                    />
                                    <div className="flex items-center my-1">
                                        <p className="text-lg">
                                            Estado:{" "}
                                            <span
                                                className={`text-xs px-3 py-1 rounded-full ${
                                                    statusColors[data.status]
                                                }`}
                                            >
                                                {statusText[data.status]}
                                            </span>
                                        </p>
                                    </div>
                                    <p className="text-xl font-bold underline mb-2">
                                        Descripcion:
                                    </p>
                                    <p className="font-semibold">
                                        {data.description}
                                    </p>
                                    <div className="flex justify-between lg:justify-between p-2 mt-2 items-center">
                                        <button className="flex items-center gap-2 cursor-pointer text-sm p-2">
                                            <ChatBubbleBottomCenterIcon className="w-4 h-4 text-yellow-700" />
                                            Comentar
                                        </button>
                                        <div>
                                            <ShareButton
                                                publicationId={publicationId}
                                            />
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}