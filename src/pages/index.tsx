import type { NextPage } from 'next';
import { useSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

const Home: NextPage = () => {

  const { data } = useSession();

  return (
    <>
      <Head>
        <title>nts</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='min-h-screen bg-base-200 w-screen flex flex-col items-center'>
        <Navbar username={(data?.username as string)} signOut={signOut} />
        <Hero isAuth={Boolean(data?.user)} />
      </div>
    </>
  );
};

export default Home;
