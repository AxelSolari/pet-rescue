import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import User, { IUser } from "../models/User"

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

//#middleware para validar jwt
export const authenticate = async (req : Request, res : Response, next : NextFunction) => {

    const bearer = req.headers.authorization

    //#corroborar que exista un jwt en el beaer
    if(!bearer) {
        const error = new Error('No Autorizado')
        res.status(401).json({error: error.message})
        return
    }


    const token = bearer.split(' ')[1]
    console.log(token)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //#verificar que el usuario exista en la db
        if(typeof decoded === 'object' && decoded.id){
            const user = await User.findById(decoded.id).select('_id userName email')
            if(user){
                req.user = user
            } else {
                res.status(500).json({error: 'Token no valido'})
            }
        }
    } catch (error) {
        res.status(500).json({error: 'Token no valido'})
    }

    next()
}