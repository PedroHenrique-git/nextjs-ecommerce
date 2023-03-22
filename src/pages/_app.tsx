import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from '@containers/Layout/Layout';
import type { AppProps } from 'next/app';
import theme from 'src/styles/theme';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider resetCSS theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
