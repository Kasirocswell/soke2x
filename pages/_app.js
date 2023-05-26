import "../styles/globals.css";
import "../styles/nprogress.css";
import { useState, useEffect } from "react";
import Router from "next/router";
import NextNProgress from "nextjs-progressbar";
import LoadingScreen from "../components/LoadingScreen";
import {
  Nanum_Pen_Script,
  Waiting_for_the_Sunrise,
  Mochiy_Pop_One,
} from "@next/font/google";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };
    const handleComplete = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <>
      <LoadingScreen />
      <NextNProgress />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
