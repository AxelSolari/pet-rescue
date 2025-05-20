import type {Request, Response} from 'express'
import User from '../models/User'
import { hashPassword } from '../utils/auth'
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
                name: user.name,
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
                    res.status(401).json({error: error.message})
                    return
                }
                //#buscar el usuario si esta confirmado
                const user = await User.findById(tokenExists.user)
                user.confirmed = true

                //#guardar cambios pasando confirmed a true y eliminar token
                await Promise.allSettled([user.save(),tokenExists.deleteOne()])
                res.send('Cuenta confirmada correctamente')
            } catch (error) {
                res.status(500).json({error: 'Hubo un error'})
            }
            
        }
}