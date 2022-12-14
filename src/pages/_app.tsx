import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { withTRPC } from '@trpc/next';

import { ServerRouter } from '../server/router';

const  App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default withTRPC<ServerRouter>({
  config({ ctx }) {
    const url = '/api/trpc';

    return {
      url,
      headers: {
        'x-ssr': '1'
      }
    };
  },
  ssr: true
})(App);
