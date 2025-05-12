import type { Request, Response } from "express"
import Publication from "../models/Publication"

//# se crea controlador para publication
export class PublicationController {
    
    //#metodo para obtener las publicaciones
    static createPublication = async (req: Request, res: Response) => {
        // console.log(req.body)
        // res.send('creando publicacion')
        //# instancia de objeto de Publication
        const publication = new Publication(req.body)

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
            const publications = await Publication.find({})
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
            //#actualizar la publicacion
            publication.publicationName = req.body.publicationName
            publication.userName = req.body.userName
            publication.images = req.body.images
            publication.description = req.body.description

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

        //    console.log(publication)
           await publication.deleteOne()
           res.send('Publicacion eliminada')
        } catch (error) {
            console.log(error)
        }
    }
}