import { EmblaCarousel } from "../components/Carrousel";
import MainList from "../components/MainList";

export default function MainView() {
  return (
    <>
      <EmblaCarousel />
      
      <div className="w-full border-b border-gray-400 mt-10"></div>
      <h2 className="text-center my-4 text-3xl">Ultimos avisos publicados</h2>
      <div className="w-full border-b border-gray-400"></div>
      <MainList />
    </>

  )
}
