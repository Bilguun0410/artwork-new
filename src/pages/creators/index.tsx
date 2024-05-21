import CreatorsPage from '@/src/components/containers/Creators'
import React from 'react'
import axios from 'axios'

const page = ({artists}) => {
    return <CreatorsPage data={artists} />
}

export default page
  
  export const getServerSideProps = async () => {
    try {
      const res = await axios.get('http://localhost:4900/api/creators');
      const artists = res.data;
  
      return {
        props: { artists },
      };
    } catch (error) {
      console.error(error);
      return {
        props: { artists: [] },
      };
    }
  };