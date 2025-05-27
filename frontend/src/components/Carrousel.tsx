import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { getPublications } from '../api/ProjectAPI';
import { formatDate } from '../utils/utils';
import type { User } from '../types';

const statusColors: Record<string, string> = {
    perdido: "bg-red-700 text-white font-bold",
    enAdopcion: "bg-amber-500 text-black font-bold",
    encontrado: "bg-green-700 text-white font-bold",
    adoptado: "bg-blue-700 text-white font-bold",
}
const statusText: Record<string, string> = {
    perdido: "Perdido",
    enAdopcion: "En Adopcion",
    encontrado: "Encontrado",
    adoptado: "Adoptado",
}

type EmblaCarouselProps = { 
  userName: User['userName']
}

export function EmblaCarousel({userName} : EmblaCarouselProps) {
  const [emblaRef] = useEmblaCarousel({loop: true}, [Autoplay()]);

  const { data: publications } = useQuery({
      queryKey: ['mainPublications'],
      queryFn: getPublications,
  })


  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {publications?.map((pub) => (
            <div 
                className="flex-[0_0_100%] min-w-0 "
                key={pub._id}    
            >
                <img 
                    src='/perro.jpg'
                    alt={pub.description}
                    className='w-full h-64 object-cover shadow relative'
                />
                <span className={`absolute top-0 text-xs px-3 py-1 ${statusColors[pub.status]}`}>{statusText[pub.status]}</span>
                <div className='flex justify-between px-2 py-1'>
                    <p className='text-sm'>Publicado por: <span className='font-bold italic'>{userName}</span></p>
                    <p className='text-sm text-slate-600'>Creado el: <span className='italic'>{formatDate(pub.createdAt)}</span></p>
                </div>
            </div>

        ))}
      </div>
    </div>
  );
}