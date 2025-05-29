import { z } from "zod";

//authUsers
const authSchema = z.object({
    userName: z.string(),
    email: z.string().email(),
    current_password: z.string(),
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
export type UpdateCurrentUserPasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>

//User 
export const userSchema = authSchema.pick({
    userName: true,
    email: true
}).extend({
    _id: z.string()
})
export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, 'userName' | 'email'>


//#Publication Schemas
export const publicationSchema = z.object({
    _id: z.string(),
    publicationName: z.string(),
    images: z.array(z.string()),
    description: z.string(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    userProfile: userSchema
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
        updatedAt: true,
        userProfile: true
    })
)

export const myPublications = z.array(
    publicationSchema.pick({
        _id: true,
        publicationName: true,
        images: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
    })
)
export const myPublicationById = 
    publicationSchema.pick({
        _id: true,
        publicationName: true,
        images: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        userProfile: true
    })



export type Publication = z.infer<typeof publicationSchema>
//#type para el formulario
export type PublicationFormData = Pick<Publication,'publicationName' | 'images' | 'description' | 'status'>
export type MyPublications = z.infer<typeof myPublications>
export type ModalId = Pick<Publication, 'userProfile'>
