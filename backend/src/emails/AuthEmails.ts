import { transporter } from "../config/nodemailer"

interface IEmail {
    email: string
    name: string
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user : IEmail) => {
         //#enviar email
            await transporter.sendMail({
                from: 'PetsRescue<admin@petsrescue.com>',
                to: user.email,
                subject: 'PetsRescue - Confirma tu cuenta',
                text: 'PetsRescue - Confirma tu cuenta',
                html: `<p>Hola: ${user.name}, has creado tu cuenta en PetsRescue, ya casi esta todo listo, solo debes confirmar tu cuenta.</p>
                    <p>Visita el siguiente enlace:</p>
                    <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar Cuenta </a>
                    <p>E ingresa el codigo: <b>${user.token}</b></p>
                    <p>Este toquen expira en: 10 minutos </p>
                `
            })
    }

    static sendPasswordResetToken = async (user : IEmail) => {
         //#enviar email
            await transporter.sendMail({
                from: 'PetsRescue<admin@petsrescue.com>',
                to: user.email,
                subject: 'PetsRescue - Reestablece tu password',
                text: 'PetsRescue - Reestablece tu password',
                html: `<p>Hola: ${user.name}, has solicitado reestablecer tu password.</p>
                    <p>Visita el siguiente enlace:</p>
                    <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer Password </a>
                    <p>E ingresa el codigo: <b>${user.token}</b></p>
                    <p>Este toquen expira en: 10 minutos </p>
                `
            })
    }
}