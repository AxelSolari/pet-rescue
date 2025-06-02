import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from "../models/User";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {

    const bearer = req.headers.authorization
    const token = bearer.split(' ')[1]

    if(!token) {
        res.status(401).json({message: 'No se proporciono un token'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

        const user = await User.findById(decoded.id).select('_id userName email isGuest')
        if(user) {
            req.user = user
           return next()
        }

         res.status(401).json({message: 'Token Invalido'})
         return

    } catch (error) {
        res.status(401).json({message: 'Token Invalido'})
        return
    }
}