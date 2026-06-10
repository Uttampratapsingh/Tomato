import mongoose, {Document,Schema} from "mongoose";


export interface IUser extends Document{ // it tells -> Every User document contains these fields.
    // why extends Document? -> because we want to use the features of mongoose document like save(), find(), etc.
    name: string;
    email: string;
    image: string;
    role: string;
}

const schema : Schema<IUser> = new Schema({ // Schema<IUser>  -->> This schema should follow the IUser interface.
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    role: {type: String, default: null},
},{
    timestamps: true
})

const User = mongoose.model<IUser>('Tomato', schema);

export default User;

