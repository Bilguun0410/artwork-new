import { ObjectId as typeId } from "mongodb";
import mongoose, { ObjectId, Schema } from "mongoose";

export interface IArtwork {
    _id: ObjectId, 
    name: string,
    date: Date,
    copyright: string,
    description: string
}

const ArtSchema = new Schema({
    _id: {
        type: typeId,
        required: true
    },
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    copyright: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
});

const Art = mongoose.models.Art ?? mongoose.model("Art", ArtSchema);

export default Art;