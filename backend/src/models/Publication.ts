//# se importa mongoose, {schema,document}
import mongoose, {Schema, Document, PopulatedDoc, Types} from "mongoose";
import { IComment } from "./Comentarios";
import { IUser } from "./User";
//#estados para las publicaciones
const publcationStatus = {
    "PERDIDO": 'perdido',
    "ENCONTRADO": 'encontrado',
    "EN_ADOPCION": 'enAdopcion',
    "ADOPTADO": 'adoptado'
} as const

//#type para los estados
export type PublicationStatus = typeof publcationStatus[keyof typeof publcationStatus]

//# se crea el primer modelo para la aplicacion

//# interface para typescript posteriormente se crea el 'schema'
export interface IPublication  extends Document {
    publicationName: string,
    images: string[],
    description: string
    comments: PopulatedDoc<IComment & Document>[],
    status: PublicationStatus
    userProfile: PopulatedDoc<IUser & Document>
}

//#schema/modelo para mongoose
const PublicationSchema: Schema = new Schema({
    publicationName: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    comments: [
        {
            type: Types.ObjectId,
            ref: 'Comment'
        }
    ],
    status: {
        type: String,
        enum: Object.values(publcationStatus),
        required: true
    },
    userProfile: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

//#definicion y registro del modelo en mongoose/ se le pasa el type de PublicationType
const Publication = mongoose.model<IPublication>('Publication', PublicationSchema)
export default Publication