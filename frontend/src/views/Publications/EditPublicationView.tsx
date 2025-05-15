import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"
import { getPublicationById } from "../../api/ProjectAPI"
import { ClipLoader } from "react-spinners"
import EditPublicationForm from "../../components/publications/EditPublicationForm"

export default function EditPublicationView() {

  //#recuperar el id de la url
  const params = useParams()
  const publicationId = params.publicationId!
  // console.log(publicationId)
  const {data, isLoading, isError } = useQuery({
    queryKey: ['editPublication', publicationId],
    queryFn: () => getPublicationById(publicationId),
    retry: false
  })
   if (isLoading)
        return (
            <div className="mt-20 flex justify-center">
                <ClipLoader size={70} color="blue" />
            </div>
        );
    
    if(isError) return <Navigate to='/notfound' />

  if(data)  return <EditPublicationForm />
}
