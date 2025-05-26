import { z } from "zod";

//authUsers
const authSchema = z.object({
    userName: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})
type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'email' | 'password' | 'password_confirmation' | 'userName'>
export type ConfirmToken = Pick<Auth, 'token'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>

//#Publication Schemas
export const publicationSchema = z.object({
    _id: z.string(),
    publicationName: z.string(),
    images: z.array(z.string()),
    description: z.string(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
})

//#schema para mostrar las publicaciones
export const dashboardPublications = z.array(
    publicationSchema.pick({
        _id: true,
        publicationName: true,
        images: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true
    })
)

export type Publication = z.infer<typeof publicationSchema>
//#type para el formulario
export type PublicationFormData = Pick<Publication,'publicationName' | 'images' | 'description' | 'status'>
