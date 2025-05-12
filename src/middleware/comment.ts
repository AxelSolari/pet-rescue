//#
import type { Request, Response, NextFunction } from "express";
import  Comment, { IComment } from "../models/Comentarios";
//#reescribir el request globalmente para poder obtener el valor de en este caso 'comment'
declare global {
    namespace Express {
        interface Request {
            comment: IComment
        }
    }
}

//#middleware para verificar si un comentario existe //esto previene codigo repetitivo en cada controller de 'coments' para verificar si un comentario existe
export async function commentExists(req: Request, res: Response, next: NextFunction) {
    try {
        //#traer el id del comentario desde la url
        const { commentId } = req.params
        // console.log(publicationId)

        //#verificar que el comentario exista
        const comment = await Comment.findById(commentId)
        // console.log(publication)
        //#Si no existe el comentario mostrar mensaje de error
        if(!comment){
            const error = new Error('Comentario no encontrado')
            res.status(404).json({error: error.message})
            return
        }
        //#habilita 'comentario' en el 'request' esto permite acceder a comment en el request desde el controller
        req.comment = comment
        //#si existe sigue al siguiente middleware
        next()
    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}


//#crea otro middleware para q valide que el comentario pertenece al proyecto
export function commentBelongsToPublication(req: Request, res:Response, next:NextFunction) {
    if(req.comment.publication.toString() !== req.publication.id.toString()) {
        const error = new Error('Accion no valida')
        res.status(400).json({error: error.message})
        return
    }
    next()
}