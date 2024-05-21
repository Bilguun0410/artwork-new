'use-client'
import HomePage from '@/src/components/containers/home'
import React from 'react'
import axios from 'axios'

const page = ({arts}) => {

    return <HomePage data={arts} />
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