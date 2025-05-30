import { Router } from 'express'
import { PublicationController } from '../controllers/PublicationController'
//# se instalo express-validator para validacion en lado de servidor
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { authenticate } from '../middleware/auth'
import { requireAuth } from '../middleware/requireAuth'
import { rejectGuest } from '../middleware/rejectGuest'

//# se importo router

//# se crea router
const router = Router()


//#.post para crear publicaciones
router.post('/',
    authenticate,
    requireAuth,
    rejectGuest,
    //#validacion con express-validator
    body('publicationName')
        .notEmpty().withMessage('El nombre de la publicacion es obligatorio'),
    body('userName')
        .notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('images')
        .notEmpty().withMessage('Al menos una imagen es requerida'),
    body('description')
        .notEmpty().withMessage('La descripcion es requerida'),
    body('status')
        .notEmpty().withMessage('Un estado es requerido'),
    //#colocacion del middleware para manejar errores
    handleInputErrors,
    PublicationController.createPublication
)

//#.get obtiene todas las publicaciones
router.get('/', 
    //# se importa el controlador nuevo con el metodo
    PublicationController.getAllPublications
)

router.get('/my-publications',
    authenticate,
    PublicationController.myPublications
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

//#endpoint para actualizar publicacion
router.put('/:id', 
    authenticate,
    //#se importo 'param' de express-validator para validar ID
    param('id')
        .isMongoId().withMessage('ID no valido'),
    //# en la actualizacion aparte de validar el id tambien hay que validar el body
    body('publicationName')
        .notEmpty().withMessage('El nombre de la publicacion es obligatorio'),
    body('images')
        .notEmpty().withMessage('Al menos una imagen es requerida'),
    body('description')
        .notEmpty().withMessage('La descripcion es requerida'),
    body('status')
        .notEmpty().withMessage('Un estado es requerido'),
    handleInputErrors,
    //# se importa el controlador nuevo con el metodo
    PublicationController.updatePublication
)

//#endpoint para eliminar publicacion
router.delete('/:id', 
    authenticate,
    //#se importo 'param' de express-validator para validar ID
    param('id')
        .isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    //# se importa el controlador nuevo con el metodo
    PublicationController.deletePublication
)


// //#ROUTES FOR COMMENTS
// router.param('publicationId', publicationExists) //-> codigo para no estar colocando en cada endpoint 'validatePublicationExists' con este codigo el middleware se ejecuta siempre antes de la peticion y valida que la publicacion exista

// //#createComment
// router.post('/:publicationId/comments',
//     body('description')
//         .notEmpty().withMessage('No puedes enviar un comentario vacio'),
//     handleInputErrors,
//     CommentsController.createComment
// )

// //#get all comments for that publication
// router.get('/:publicationId/comments',
//     CommentsController.getPublicationComments
// )


// //# utiliza middleware para validar que el comentario existsa 'commentId'
// router.param('commentId', commentExists)
// router.param('commentId', commentBelongsToPublication)
// //#get comment by id
// router.get('/:publicationId/comments/:commentId',
//     //#validar el commentId
//     param('commentId').isMongoId().withMessage('ID no valido'),
//     handleInputErrors,
//     CommentsController.getCommentById
// )

// //#actualizar comentario
// router.put('/:publicationId/comments/:commentId',
//     //#validar el commentId
//     param('commentId').isMongoId().withMessage('ID no valido'),
//     body('description')
//         .notEmpty().withMessage('No puedes enviar un comentario vacio'),
//     handleInputErrors,
//     CommentsController.updateComment
// )

// //#eliminar comentario
// router.delete('/:publicationId/comments/:commentId',
//     //#validar el commentId
//     param('commentId').isMongoId().withMessage('ID no valido'),
//     handleInputErrors,
//     CommentsController.deleteComment
// )


//#se exporta el router
export default router