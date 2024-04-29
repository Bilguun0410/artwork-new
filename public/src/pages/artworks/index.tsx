import ArtworksPage from '@/src/components/containers/Artworks'
import clientPromise from '@/lib/mongodb'
import { GetServerSideProps } from 'next'
import React from 'react'

const page = ({arts}) => {
    return <ArtworksPage data={arts} />
}

export default page

type ConnectionStatus = {
    isConnected: boolean;
    arts?: any[];
  };
  
  export const getServerSideProps: GetServerSideProps<
    ConnectionStatus
  > = async () => {
    try {
      const client = await clientPromise;
      const db = client.db('Artwork');
      const data = await db
        .collection("arts")
        .find({})
        .sort({ metacritic: -1 })
        .limit(10)
        .toArray();
        console.log(data, "hahahaha")
      return {
        props: { isConnected: true, arts:  JSON.parse(JSON.stringify(data)) },
      };
    } catch (e) {
      console.error(e);
      return {
        props: { isConnected: false, arts: [] },
      };
    }
  };