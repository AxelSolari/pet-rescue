import type { Request, Response } from "express";
import Comment from "../models/Comentarios";


//#controlador para comentarios
export class CommentsController {
    
    //#metodo crear comentario
    static createComment = async (req: Request, res: Response) => {
        

        try {
            const comment = new Comment(req.body)
            //#asignar la publicacion a la que pertenece la tarea
            comment.publication = req.publication.id
            //#asignar la tarea al proyecto
            req.publication.comments.push(comment.id)
            // console.log(comment)
            await comment.save()
            await req.publication.save()
            res.send("Comentario subido correctamente")
        } catch (error) {
            console.log(error)
        }
    }
}