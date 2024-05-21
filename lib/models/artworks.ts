import { ObjectId as typeId } from "mongodb";
import mongoose, { ObjectId, Schema } from "mongoose";
import { IGenre } from "./genres";

export interface IArtwork {
  _id: ObjectId;
  artist: {
    artistId: ObjectId;
  };
  attachment: any;
  bmsId: string;
  dateCreated: Date;
  genreFields: any;
  genres: IGenre[];
  isbn: string;
  owner: Date;
  rightHolder: string;
  summary: string;
  registeredDate: Date;
  registeredUserId: ObjectId;
  registeredUserName: string;
  name: string;
  date: Date;
  copyright: string;
  description: string;
}

const ArtSchema = new Schema<IArtwork>({
  artist: {
    artistId: { type: typeId, required: true }
  },
  attachment: { type: Object, required: true },
  bmsId: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  genreFields: { type: Object, required: true },
  genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  isbn: { type: String, required: true },
  owner: { type: Date, required: true },
  rightHolder: { type: String, required: true },
  summary: { type: String, required: true },
  registeredDate: { type: Date, required: true },
  registeredUserId: { type: typeId, required: true },
  registeredUserName: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  copyright: { type: String, required: true },
  description: { type: String, required: true },
});

const Artwork = mongoose.models.Artwork ?? mongoose.model("Art", ArtSchema);

export default Artwork;