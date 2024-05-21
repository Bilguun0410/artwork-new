import ArtworksPage from '@/src/components/containers/Artworks'
import axios from 'axios';
import React from 'react'

const page = ({arts} : any) => {
    return <ArtworksPage data={arts} />
}

export default page
  
export const getServerSideProps = async () => {
  try {
    const res = await axios.get('http://localhost:4900/api/artworks');
    const arts = res.data;

    return {
      props: { arts },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { arts: [] },
    };
  }
};