//# se importa mongoose, {schema,document}
import mongoose, {Schema, Document} from "mongoose";

//# se crea el primer modelo para la aplicacion

//# type para typescript posteriormente se crea el 'schema'
export type PublicationType = Document & {
    publicationName: string,
    userName: string,
    images: string[],
    description: string
}

//#schema/modelo para mongoose
const PublicationSchema: Schema = new Schema({
    publicationName: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    images: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    }
})

//#definicion y registro del modelo en mongoose/ se le pasa el type de PublicationType
const Publication = mongoose.model<PublicationType>('Publication', PublicationSchema)
export default Publication