import mongoose, {Schema, Document, mongo} from "mongoose";


//#modelo para usuarios

export interface IUser extends Document {
    email?: string
    password?: string
    userName?: string
    confirmed?: boolean
    isGuest?: boolean
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: function() {
            return !this.isGuest
        },
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: function() {
            return !this.isGuest
        }
    },
    userName: { 
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    isGuest: {
        type: Boolean, 
        default: false        
    }
})


const User = mongoose.model<IUser>('User', userSchema)
export default User
