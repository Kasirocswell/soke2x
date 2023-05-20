import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../public/soke4.png";
import PalmTreeSVG from "./PalmTree";
import BeachBallSVG from "./BeachBall";
import DolphinSVG from "./Dolphin";
import SharkSVG from "./Shark";
import ProgressBar from "./ProgressBar";

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 8000); // 8 seconds
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div className="w-screen h-screen fixed top-0 right-0 bottom-0 left-0 bg-white flex items-center justify-center z-50 overflow-clip">
      <div className="z-20 relative mx-auto">
        <Image src={logo} alt="Logo" className="w-250 h-250" />
        <div className=" ml-[100px] flex-col animate-pulse">
          <p className="mt-4 text-6xl text-black font-second">Loading...</p>
          <ProgressBar />
        </div>
      </div>

      <style jsx>{`
        @keyframes moveRandomly1 {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(100px, 50px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes moveRandomly2 {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-60px, 30px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        .svg1 {
          animation: moveRandomly1 5s infinite;
          z-index: 10;
          position: absolute;
          top: 30%;
          left: 0%;
        }

        .svg2 {
          animation: moveRandomly2 5s infinite;
          z-index: 10;
          position: absolute;
          top: 50%;
          right: 10%;
        }

        .svg3 {
          animation: moveRandomly1 5s infinite;
          z-index: 10;
          position: absolute;
          bottom: 30%;
          left: 70%;
        }

        .svg4 {
          animation: moveRandomly2 5s infinite;
          z-index: 10;
          position: absolute;
          bottom: 40%;
          right: 40%;
        }

        // add more keyframes and classes for each SVG
      `}</style>

      <div className="svg1">
        <PalmTreeSVG />
      </div>
      <div className="svg2">
        <BeachBallSVG />
      </div>
      {/* Add more SVGs with their own classes */}
      <div className="svg3">
        <DolphinSVG />
      </div>
      <div className="svg4">
        <SharkSVG />
      </div>
    </div>
  ) : null;
};

export default LoadingScreen;
