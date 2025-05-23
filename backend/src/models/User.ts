import mongoose, {Schema, Document, mongo} from "mongoose";


//#modelo para usuarios

export interface IUser extends Document {
    email: string
    password: string
    userName: string
    confirmed: boolean
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userName: { 
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model<IUser>('User', userSchema)
export default User