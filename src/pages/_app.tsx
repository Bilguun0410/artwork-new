import React, { useEffect, useState } from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import "@/styles/globals.css";

import { usePathname } from 'next/navigation';
import LoginLayout from '@/src/modules/layouts/components/LoginLayout';
import Layout from '@/src/modules/layouts/components/Layout';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

type Props = {
  pageProps: any;
  Component: any;
  router: any;
};

function MyApp({ Component, pageProps, router }: Props) {
  const [ theme, setTheme ] = useState('');
  const pathname = usePathname();
  const getLayout = Component.getLayout || (pathname.includes('/auth') ? ((page: any) =><LoginLayout>{page}</LoginLayout>) : ((page : any) => <Layout>{page}</Layout>));
  return getLayout(
    <>
      <ToastContainer
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          stacked
          position={'top-center'}
        />
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      <Component {...pageProps} router={router} />
    </>
  );
}

MyApp.getInitialProps = async function (appContext: any) {
  const appProps = await NextApp.getInitialProps(appContext);

  return {
    ...appProps,
  };
};

export default MyApp;
