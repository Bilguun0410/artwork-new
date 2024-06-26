import mongoose, { ObjectId, Schema } from "mongoose";
import { ObjectId as typeId } from "mongodb";

export interface IGenre {
    _id: ObjectId,
    name : string,
    fields?: any[];
}

const GenreSchema = new Schema({
    _id: {
        type: typeId,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    fields: {
        type: Array,
        required: true
    }
})

const Genre = mongoose.models.Genre ?? mongoose.model("Genre", GenreSchema);

export default Genre;