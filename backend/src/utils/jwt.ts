import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
type UserPayload = {
    id: Types.ObjectId
}

export const generateJWT = (payload: UserPayload) => {
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '20m'
    })
    
    return token
}


type GuestPayload = {
    id: string,
    isGuest: boolean
}
export const guestJWT = (payload: GuestPayload) => {

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '20m'
    })

    return token
}