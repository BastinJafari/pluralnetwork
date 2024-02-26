import "../../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import {
  PremiumAuthContextProvider,
  PremiumAuthContextFreeProvider,
} from "../PremiumAuthContext";
import { MainProvider } from "../MainContext";
import { MySubsProvider } from "../MySubs";
import { MyCollectionsProvider } from "../components/collections/CollectionContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Script from "next/script";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

import NavBar from "../components/NavBar";
import { useEffect, } from "react";
import { checkVersion } from "../../lib/utils";
import { usePlausible } from "next-plausible";
import PremiumModal from "../components/PremiumModal";
import RateLimitModal from "../components/RateLimitModal";
import type { AppProps, AppType } from 'next/app';
import { Session } from "next-auth";
import { useRouter } from 'next/router'
import { trpc } from "../utils";
import { Toaster } from "react-hot-toast";

const NO_AUTH_FREE_ACCESS = JSON.parse(
  process?.env?.NEXT_PUBLIC_FREE_ACCESS ?? "true"
);

const VERSION = "0.1";
const queryClient = new QueryClient();

type CustomProps = {
  session: Session
}
const App: AppType = ({ Component, pageProps }: AppProps<CustomProps>) => {
  console.log('and then app')
  console.log(pageProps)

  const router = useRouter()
  console.log(router.pathname)
  if (router.pathname === "/plural") {

    return (<Component props={pageProps}/>)
  }

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider defaultTheme="system">
        <MainProvider>
          <MySubsProvider>
            <MyCollectionsProvider>
              <QueryClientProvider client={queryClient}>
                <NavBar/>
                <Component {...pageProps} />
                <PremiumModal/>
                <RateLimitModal/>
                <Toaster position="bottom-center"/>
                <Analytics/>
                <ReactQueryDevtools initialIsOpen={false}/>
              </QueryClientProvider>
            </MyCollectionsProvider>
          </MySubsProvider>
        </MainProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

const AppWithTRPC = trpc.withTRPC(App);

export default function MyApp({ Component, pageProps }): AppProps {
  const plausible = usePlausible();
  useEffect(() => {
    const curVersion = VERSION;
    const prevVersion = localStorage.getItem("trodditVersion");
    if (prevVersion) {
      let compare = checkVersion(curVersion, prevVersion);
      // if (compare === 1) {
      //   const toastId = toast.custom(
      //     (t) => (
      //       <ToastCustom
      //         t={t}
      //         message={`Troddit updated! Click to see changelog`}
      //         mode={"version"}
      //       />
      //     ),
      //     { position: "bottom-center", duration: 8000 }
      //   );
      // }
    }
    localStorage.setItem("trodditVersion", curVersion);
  }, []);

  return (
    <>
      <Script defer data-domain={"plural-network"} src="/js/script.js"></Script>

      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover" //user-scalable="no"
        />
        <link rel="shortcut icon" href="/favicon.ico"/>
      </Head>

      {NO_AUTH_FREE_ACCESS ? (
        <PremiumAuthContextFreeProvider>
          <AppWithTRPC Component={Component} pageProps={pageProps}/>
        </PremiumAuthContextFreeProvider>
      ) : (
        <>
          <ClerkProvider {...pageProps}>
            <PremiumAuthContextProvider>
              <AppWithTRPC Component={Component} pageProps={pageProps}/>
            </PremiumAuthContextProvider>
          </ClerkProvider>
        </>
      )}
    </>
  );
}
