import { NextApiRequest, NextApiResponse } from 'next';
import Art from "@/lib/models/artworks";
import clientPromise from '@/lib/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await clientPromise;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const arts = await Art.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    res.status(200).json(arts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching arts' });
  }
}