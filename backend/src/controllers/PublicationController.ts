import type { Request, Response } from "express"
import Publication from "../models/Publication"
//# se crea controlador para publication
export class PublicationController {
    
    //#metodo para obtener las publicaciones
    static createPublication = async (req: Request, res: Response) => {
        
        //# instancia de objeto de Publication
        const publication = new Publication(req.body)
        publication.userProfile = req.user.id
        console.log(req.user)

        //#almacenar la publicacion con try catch
        try {
            await publication.save()
            res.send('Publicacion subida correctamente')
        } catch (error) {
            console.log(error)
        }
    }
    //#metodo para obtener las publicaciones
    static getAllPublications = async (req: Request, res: Response) => {
        try {
            const publications = await Publication.find({}).populate('userProfile', 'userName email')
            res.json(publications)
        } catch (error) {
            console.log(error)
        }
    }

    //#obtener las publicaciones de usuario autenticado
    static myPublications = async(req: Request, res: Response) => {
        try{ 
            const publications = await Publication.find({
                $or: [
                    {userProfile: {$in: req.user.id}}
                ]
            })
            res.json(publications)
        } catch (error) {
            console.log(error)
        }
    }

    //#metodo para obtener publicacion por id
    static getPublicationById = async (req: Request, res: Response) => {
        // console.log(req.params)
        const { id } = req.params
      
        try {
            const publication = await Publication.findById(id).populate('comments')

            //#validacion en caso que el id tenga al un dato erroneo
            if(!publication) {
                const error = new Error('Publicacion no encontrada')
                res.status(404).json({error: error.message})
                return
            }
            res.json(publication)
        } catch (error) {
            console.log(error)
        }
    }

    //#metodo para actualizar la publicacion
    static updatePublication = async (req: Request, res: Response) => {
        // console.log(req.params)
        const { id } = req.params
      
        try {
           const publication = await Publication.findById(id)

             //#validacion en caso que el id no sea correcto
            if(!publication) {
                const error = new Error('Publicacion no encontrada')
                res.status(404).json({error: error.message})
                return
            }

            //#validar que la actualizacion la haga el propietario de la publicacion
            if(publication.userProfile.toString() !== req.user.id.toString()) {
                const error = new Error('No puedes realizar esta accion')
                res.status(404).json({error: error.message})
                return
            }

            //#actualizar la publicacion
            publication.publicationName = req.body.publicationName
            publication.images = req.body.images
            publication.description = req.body.description
            publication.status = req.body.status

            //#guardar la actualizacion
            await publication.save()
            res.send('Publicacion actualizada')
        } catch (error) {
            console.log(error)
        }
    }
    //#metodo para eliminar publicacion
     static deletePublication = async (req: Request, res: Response) => {
        // console.log(req.params)
        const { id } = req.params
      
        try {
           const publication = await Publication.findById(id)

            //#validacion en caso que la publicacion no exista
            if(!publication) {
                const error = new Error('Publicacion no encontrada')
                res.status(404).json({error: error.message})
                return
            }

            //#validar que el usuario de la publicacion pueda eliminar
            if(publication.userProfile.toString() !== req.user.id.toString()) {
                const error = new Error('No puedes realizar esta accion')
                res.status(404).json({error: error.message})
                return
            }

        //    console.log(publication)
           await publication.deleteOne()
           res.send('Publicacion eliminada')
        } catch (error) {
            console.log(error)
        }
    }
}