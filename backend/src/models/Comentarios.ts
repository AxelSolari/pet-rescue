// import mongoose, {Schema, Document, Types} from "mongoose";

// //#interface de comentarios para type
// export interface IComment  extends Document {
//     userName: string,
//     description: string
//     publication: Types.ObjectId
// }

// //#modelo para los comentarios
// export const CommentSchema : Schema = new Schema({
//     userName: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     description: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     publication: {
//         type: Types.ObjectId,
//         ref: 'Publication'
//     }
// }, {timestamps: true})

// //#conectar schema con la interface
// const Comment = mongoose.model<IComment>('Comment', CommentSchema)
// //#exportar el modelo
// export default Comment