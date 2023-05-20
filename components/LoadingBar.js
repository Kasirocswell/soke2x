import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";

const LoadingBar = () => {
  useEffect(() => {
    let timer;

    const handleStart = () => {
      NProgress.set(0.0);
      timer = setInterval(() => {
        NProgress.inc(Math.random() * 0.1);
      }, 800);
    };

    const handleStop = () => {
      clearInterval(timer);
      NProgress.done();
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleStop);
    Router.events.on("routeChangeError", handleStop);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleStop);
      Router.events.off("routeChangeError", handleStop);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="../styles/nprogress" />
      </Head>
    </>
  );
};

export default LoadingBar;
