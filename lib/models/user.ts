import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    lastName: String,
    firstName: String,
    userName: String,
    password: String,
});

const User = mongoose.models.User ?? mongoose.model("User", UserSchema);

export default User;