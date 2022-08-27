import type { NextPage } from 'next';
import Navbar from '../components/Navbar';

const ErrorPage: NextPage = () => {
  return (
    <div className='min-h-screen bg-base-200 w-screen flex flex-col items-center'>
      <Navbar />
      <div className='flex items-center pt-20'>
        <img src="/lost.svg" className="max-w-sm" />
      </div>
      <h1 style={{ fontFamily: 'sacramento' }} className='pt-10 text-5xl font-semibold'>Got lost?</h1>
    </div>
  );
};

export default ErrorPage;
