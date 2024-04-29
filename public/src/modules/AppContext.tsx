// import { gql, useQuery } from '@apollo/client';
import React, { createContext, useContext, useState } from 'react';
// import { getErxesApolloClient } from '../lib/initApollo';
// import { currentUserQuery } from './users/graphql/queries';
// import useAuth from '@/lib/hooks/useAuth';
import { useRouter } from 'next/router';
// import CustomSkeleton from '@/components/common/CustomSkeleton';
import Image from 'next/image';
// import { ToastContainer } from 'react-toastify';

type ContextProps = {
  currentUser?: any;
}

const AppContext = createContext({} as ContextProps);

export const AppConsumer = AppContext.Consumer;

type Props = {
  children: any;
};


const AppProvider = ({ children }: Props) => {
  const {push} = useRouter();
  // const { data, loading } = useQuery(gql(currentUserQuery), {
  //   fetchPolicy: 'network-only',
  //   client: getErxesApolloClient()
  // });

//   if (loading) {
//     return (
//         <div className='w-full h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900'>
//           <div className='relative w-[20vw] h-[20vh] animate-pulse'>
//             <LogoLoader />
//           </div>
//         </div>
//     )
//   }
  // const contextValues = {
  //   currentUser
  // };

  return (
      <AppContext.Provider value={{}}>{children}</AppContext.Provider>
  )
};

export function useAppContext() {
  return useContext(AppContext);
}

export default AppProvider;