import CreatorsPage from '@/src/components/containers/Creators'
import clientPromise from '@/lib/mongodb'
import React from 'react'

const page = ({creators}) => {
    return <CreatorsPage data={creators} />
}

export default page
  
  export const getServerSideProps = async () => {
    try {
      const client = await clientPromise;
      const db = client.db('Artwork');
      const data = await db
        .collection("creators")
        .find({})
        .sort({ metacritic: -1 })
        .limit(10)
        .toArray();
      return {
        props: { isConnected: true, creators:  JSON.parse(JSON.stringify(data)) },
      };
    } catch (e) {
      console.error(e);
      return {
        props: { isConnected: false, creators: [] },
      };
    }
  };