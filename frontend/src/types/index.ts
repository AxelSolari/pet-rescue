import { z } from "zod";

//#Publication Schemas
export const publicationSchema = z.object({
    _id: z.string(),
    publicationName: z.string(),
    userName: z.string(),
    images: z.array(z.string()),
    description: z.string()
})

//#schema para mostrar las publicaciones
export const dashboardPublications = z.array(
    publicationSchema.pick({
        _id: true,
        publicationName: true,
        userName: true,
        images: true,
        description: true
    })
)

export type Publication = z.infer<typeof publicationSchema>
//#type para el formulario
export type PublicationFormData = Pick<Publication,'publicationName' | 'userName' | 'images' | 'description'>
