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
            const publication = await Publication.findById(id)

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
}