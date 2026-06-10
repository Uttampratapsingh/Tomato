import mongoose, {Document,Schema} from "mongoose";


export interface IUser extends Document{
    name: string;
    email: string;
    image: string;
    role: string;
}

const schema : Schema<IUser> = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    role: {type: String, required: true, default: null},
},{
    timestamps: true
})

const User = mongoose.model<IUser>('Tomato', schema);

export default User;

