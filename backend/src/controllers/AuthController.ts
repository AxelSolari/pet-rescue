import type {Request, Response} from 'express'
import User from '../models/User'
import { checkPassword, hashPassword } from '../utils/auth'
import Token from '../models/Token'
import { generateToken } from '../utils/token'
import { AuthEmail } from '../emails/AuthEmails'
import { generateJWT } from '../utils/jwt'
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

                //#generar jwt
                const token = generateJWT({id: user.id})

                res.send(token)
            } catch (error) {
                res.status(500).json({error: 'Hubo un error'})
            }
        }

        //#solicitar nuevo codigo en caso de que expire
        static requestConfirmationCode = async (req: Request, res: Response) => {
        try {
            const { email } = req.body
            //#revisar que usuario existe
            const user = await User.findOne({email})
            if(!user) {
                const error = new Error('El usuario no esta registrado')
                res.status(404).json({error: error.message})
                return
            }
            //#enviar mensaje de error en caso que el usuario ya este confirmado
            if(user.confirmed) {
                const error = new Error('El usuario ya esta confirmado')
                res.status(403).json({error: error.message})
                return
            }
            
            //# si usuario existe generar token
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
            res.send('Se envio un nuevo token a tu email')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    //#reestablecer password
    static forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body
            //#revisar que usuario existe
            const user = await User.findOne({email})
            if(!user) {
                const error = new Error('El usuario no esta registrado')
                res.status(404).json({error: error.message})
                return
            }
            
            
            //# si usuario existe generar token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id
            await token.save()

            //#generar email
            AuthEmail.sendPasswordResetToken({
                email: user.email,
                name: user.userName,
                token: token.token
            })

            res.send('Revisa tu email para reestablecer tu password')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    //#validarToken para actualizar password
     static validateToken = async (req: Request, res: Response) => {
            try {
                const { token } = req.body
                //#buscar el token
                const tokenExists = await Token.findOne({token})
                if(!tokenExists){
                    const error = new Error('Token no valido')
                    res.status(404).json({error: error.message})
                    return
                }

                
                res.send('Token valido, define tu nuevo password')
            } catch (error) {
                res.status(500).json({error: 'Hubo un error'})
            }
            
        }
    //#actualizar password con token
     static updatePasswordWithToken = async (req: Request, res: Response) => {
            try {
                //#recupera token de la url
                const { token } = req.params
                //#buscar el token
                const tokenExists = await Token.findOne({token})
                if(!tokenExists){
                    const error = new Error('Token no valido')
                    res.status(404).json({error: error.message})
                    return
                }

                const user = await User.findById(tokenExists.user)
                user.password = await hashPassword(req.body.password)

                await Promise.allSettled([user.save(), tokenExists.deleteOne()])                
                res.send('El password se modifico correctamente')
            } catch (error) {
                res.status(500).json({error: 'Hubo un error'})
            }
            
        }

        static user = async (req: Request, res: Response) => {
             res.json(req.user)
             return
        }

}
