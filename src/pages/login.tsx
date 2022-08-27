import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginVariables } from '../common/validation/auth';
import Navbar from '../components/Navbar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import Input from '../components/Input';
import { signIn } from 'next-auth/react';

const Login: NextPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginVariables>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = useCallback(async (data: LoginVariables) => {
    await signIn('credentials', { ...data, callbackUrl: '/dashboard' });
  }, []);

  return (
    <>
      <Head>
        <title>nts - Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-base-200 w-screen flex flex-col items-center">
        <Navbar />
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex pt-20 items-center justify-center"
        >
          <div className="card rounded-none w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                Welcome back!
              </h2>
              <Input 
                label="Your email" 
                type="email"
                placeholder="jsmith@gmail.com" 
                hookFormProps={register('email')}
                error={errors.email}
              />
              <Input 
                label="Your password" 
                type="password"
                placeholder="*****" 
                hookFormProps={register('password')}
                error={errors.password}
              />
              <div className="card-actions items-center justify-between">
                <Link href="/signup">
                  <a className="link">Go to sign up</a>
                </Link>
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
    
  );
};

export default Login;
