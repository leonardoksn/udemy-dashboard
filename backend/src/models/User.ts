import { Schema, model, connect } from 'mongoose';
import { IUser } from '../interface';
// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmpassword: { type: String }
});

const User = model<IUser>('User', userSchema);


export { userSchema, User }
