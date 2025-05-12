import type { Request, Response, NextFunction } from "express"
import { validationResult } from 'express-validator'


//#se creo carpeta middleware, dentro archivo 'validation.ts'
//#funciones que se ejecutan en peticiones http
export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    let errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})

        return //-> return abajo y no al costado de la respuesta ya que arroja error
    } 
    next()
}