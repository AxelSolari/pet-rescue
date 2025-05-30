import { Request, Response, NextFunction } from "express";

export const rejectGuest = (req: Request, res: Response, next: NextFunction) => {
    if(req.user?.isGuest) {
        res.status(403).json({error: 'Los usuarios Invitados no puede realizar esta accion'})
        return
    }
    next()
}