import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto mt-10">
        <h1 className="text-4xl text-center">Error 404 / Pagina no encontrada</h1>
        <p className="text-center mt-10">Volver a {""} 
            <Link to='/dashboardview' className="italic font-bold text-indigo-700">Mis Publicaciones</Link>
        </p>
    </div>
  )
}
