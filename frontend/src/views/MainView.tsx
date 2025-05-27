import { EmblaCarousel } from "../components/Carrousel";
import { useAuth } from "../components/hooks/useAuth";
import MainList from "../components/MainList";

export default function MainView() {

  const { data } = useAuth()

  if(data) return (
    <>
      <EmblaCarousel 
        userName={data?.userName}
      />
      
      <div className="w-full border-b border-gray-400 mt-10"></div>
      <h2 className="text-center my-4 text-3xl">Ultimos avisos publicados</h2>
      <div className="w-full border-b border-gray-400"></div>
      <MainList 
 
      />
    </>

  )
}
