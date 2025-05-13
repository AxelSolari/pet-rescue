import { z } from "zod";

//#Publication Schemas
export const publicationSchema = z.object({
    _id: z.string(),
    publicationName: z.string(),
    userName: z.string(),
    images: z.string(),
    description: z.string()
})
export type Publication = z.infer<typeof publicationSchema>
//#type para el formulario
export type PublicationFormData = Pick<Publication,'publicationName' | 'userName' | 'images' | 'description'>