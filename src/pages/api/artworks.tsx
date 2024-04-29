import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("artworks");
        const arts = await db
            .collection("arts")
            .find({})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();
        res.json(arts);
    } catch (e) {
        console.error(e);
    }
}