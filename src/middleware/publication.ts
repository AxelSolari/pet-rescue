//#
import type { Request, Response, NextFunction } from "express";
import Publication, { IPublication } from "../models/Publication";

//#reescribir el request globalmente para poder obtener el valor de en este caso 'publication'
declare global {
    namespace Express {
        interface Request {
            publication: IPublication
        }
    }
}

//#middleware para verificar si una publicacion existe //esto previene codigo repetitivo en cada controller de 'coments' para verificar si una publicacion existe
export async function publicationExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { publicationId } = req.params
        // console.log(publicationId)

        //#verificar que la publicacion exista
        const publication = await Publication.findById(publicationId)
        // console.log(publication)
        //#Si no existe la publicacion mostrar mensaje de error
        if(!publication){
            const error = new Error('Publicacion no encontrada')
            res.status(404).json({error: error.message})
            return
        }
        //#habilita 'publication' en el 'request' esto permite acceder a publication en el request desde el controller
        req.publication = publication
        //#si existe sigue al siguiente middleware
        next()
    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}