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
            // await comment.save()
            // await req.publication.save()
            //#utiliza Promise.allSettled([]) ya que va a generar los dos promises al mismo tiempo
            await Promise.allSettled([comment.save(), req.publication.save()])
            res.send("Comentario subido correctamente")
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    //#get all comments for that publication
    static getPublicationComments = async (req: Request, res: Response) => {
        try {
            const comments = await Comment.find({publication: req.publication.id}).populate('publication')//-> populate: para cruzar la informacion y traer los datos de la publicacion a la que pertenece la tarea
            res.json(comments)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    //#take comment by id
    static getCommentById = async (req: Request, res: Response) => {
        try {
            res.json(req.comment)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
    //#metodo para actualizar commentario
    static updateComment = async (req: Request, res: Response) => {
        try {
            //#actualizar el comentario
            req.comment.userName = req.body.userName
            req.comment.description = req.body.description
            //#guardar la actualizacion en la db
            await req.comment.save()
            
            res.send('Comentario actualizado correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
            // console.log(error)
        }
    }

    //#metodo eliminar comentario
    static deleteComment = async (req: Request, res: Response) => {
        try {
            req.publication.comments = req.publication.comments.filter( comment => comment.toString() !== req.comment.id.toString())//-> eliminar el comentario desde el array donde guarda 'publicacion'
            //# si las validaciones pasan se procede a eliminar el comentario
            // await comment.deleteOne()//-> elimina desde la coleccion de 'comentarios'
            // await req.publication.save()//-> guardar el nuevo array que trae todos los comentarios menos el que se quiere eliminar

            //#guardar los cambios en la db/ ya que no depende una accion de la otra
            await Promise.allSettled([req.comment.deleteOne(), req.publication.save()])

            res.send('Comentario eliminado')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
}