import '@/styles/globals.scss'
import { ThemeProvider } from '@material-tailwind/react'

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
