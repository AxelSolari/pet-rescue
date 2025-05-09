import { Router } from 'express'
import { PublicationController } from '../controllers/PublicationController'
//# se instalo express-validator para validacion en lado de servidor
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'

//# se importo router

//# se crea router
const router = Router()


//#.post para crear publicaciones
router.post('/',
    //#validacion con express-validator
    body('publicationName')
        .notEmpty().withMessage('El nombre de la publicacion es obligatorio'),
    body('userName')
        .notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('images')
        .notEmpty().withMessage('Al menos una imagen es requerida'),
    body('description')
        .notEmpty().withMessage('La descripcion es requerida'),
    //#colocacion del middleware para manejar errores
    handleInputErrors,
    PublicationController.createPublication
)

//#.get -> se crea en otro archivo un controller
router.get('/', 
    //# se importa el controlador nuevo con el metodo
    PublicationController.getAllPublications
)

//#ruta para obtener publicacion por id
router.get('/:id', 
    //#se importo 'param' de express-validator para validar ID
    param('id')
        .isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    //# se importa el controlador nuevo con el metodo
    PublicationController.getPublicationById
)

//#se exporta el router
export default router