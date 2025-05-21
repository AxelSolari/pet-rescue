import type {Request, Response} from 'express'
import User from '../models/User'
import { checkPassword, hashPassword } from '../utils/auth'
import Token from '../models/Token'
import { generateToken } from '../utils/token'
import { AuthEmail } from '../emails/AuthEmails'
export class AuthController {
    //#metodo crea cuenta
    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body
            //#prevenir usuario duplicado
            const userExists = await User.findOne({email})
            if(userExists) {
                const error = new Error('El usuario ya esta registrado')
                res.status(409).json({error: error.message})
                return
            }
            const user = new User(req.body)
            //#hashPassword
            user.password = await hashPassword( password )
            //#generar token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id
            //#generar email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.userName,
                token: token.token
            })
            await Promise.allSettled([user.save(), token.save()])
            res.send('Cuenta creada, revisa tu email para confirmarla')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    //#confirmar cuenta
        static confirmAccount = async (req: Request, res: Response) => {
            try {
                const { token } = req.body
                //#buscar el token
                const tokenExists = await Token.findOne({token})
                if(!tokenExists){
                    const error = new Error('Token no valido')
                    res.status(404).json({error: error.message})
                    return
                }
                //#buscar el usuario si esta confirmado y cambiar el estado de confirmed
                const user = await User.findById(tokenExists.user)
                user.confirmed = true

                //#guardar cambios pasando confirmed a true y eliminar token
                await Promise.allSettled([user.save(),tokenExists.deleteOne()])
                res.send('Cuenta confirmada correctamente')
            } catch (error) {
                res.status(500).json({error: 'Hubo un error'})
            }
            
        }

        static login = async (req: Request, res: Response) => {
            try {
                const { email, password} = req.body
                const user = await User.findOne({email})
                if(!user) {
                    const error = new Error('Usuario no encontrado')
                    res.status(404).json({error: error.message})
                }
                if(!user.confirmed){
                    //# si la cuenta no fue confirmada generar token nuevo
                    const token = new Token()
                    token.user = user.id
                    token.token = generateToken()
                    await token.save()

                    //#enviar email
                    AuthEmail.sendConfirmationEmail({
                        email: user.email,
                        name: user.userName,
                        token: token.token
                    })

                    const error = new Error('La cuenta no ha sido confirmada, hemos enviado un e-mail de confirmacion')
                    res.status(401).json({error: error.message})
                }

                //#revisar password
                const isPasswordCorrect = await checkPassword(password, user.password)
                if(!isPasswordCorrect){
                    const error = new Error('Password incorrecto')
                    res.status(401).json({error: error.message})
                }

                res.send('Autenticado...')
            } catch (error) {
                res.status(500).json({error: 'Hubo un error'})
            }
        }
}