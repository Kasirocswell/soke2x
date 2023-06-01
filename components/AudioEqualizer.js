import { useEffect, useRef, useState } from "react";
import { Howl, Howler } from "howler";

export default function AudioEqualizer({ muted, paused }) {
  const canvasRef = useRef(null);
  const [audio, setAudio] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const p5 = require("p5");
      if (audio == null || undefined) {
        const sound = new Howl({
          src: ["/waves.mp3"],
          format: ["mp3"],
          loop: true,
        });
        setAudio(sound);
      } else if (muted) {
        audio.stop();
        console.log("sound stopped");
      } else if (!muted) {
        audio.play();
        console.log("sound playing");
      }

      let analyser = Howler.ctx.createAnalyser();
      Howler.masterGain.connect(analyser);
      analyser.connect(Howler.ctx.destination);
      analyser.fftSize = 64;
      let dataArray = new Uint8Array(analyser.frequencyBinCount);

      new p5((p) => {
        p.setup = () => {
          p.createCanvas(25, 50);
        };

        p.draw = () => {
          analyser.getByteFrequencyData(dataArray);

          p.clear(); // Transparent background
          p.stroke(255);
          p.strokeWeight(2);

          let lowEnd = dataArray.slice(0, dataArray.length / 3);
          let midEnd = dataArray.slice(
            dataArray.length / 3,
            (dataArray.length / 3) * 2
          );
          let highEnd = dataArray.slice(
            (dataArray.length / 3) * 2,
            dataArray.length
          );

          let lowAvg = average(lowEnd);
          let midAvg = average(midEnd);
          let highAvg = average(highEnd);

          let barWidth = 25 / 3;
          let highHeight = p.map(highAvg, 0, 255, 0, 50);
          let midHeight = p.map(midAvg, 0, 255, 0, 50);
          let lowHeight = p.map(lowAvg, 0, 255, 0, 50);

          p.rect(0, 50 - lowHeight, barWidth, lowHeight); // Lastly, low frequency bar
          p.rect(barWidth, 50 - midHeight, barWidth, midHeight); // Then mid frequency bar
          p.rect(barWidth * 2, 50 - highHeight, barWidth, highHeight); // Draw high frequency bar first
        };

        function average(arr) {
          let sum = 0;
          for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
          }
          return sum / arr.length;
        }
      }, canvasRef.current);
    }

    // Cleanup function to remove sketch on unmount
    return () => {
      if (canvasRef.current) {
        canvasRef.current.innerHTML = "";
      }
    };
  }, [muted, paused]);

  return (
    <div
      ref={canvasRef}
      className="w-25 h-50 mr-[400px] mt-[-65px] scale-x-[-1]"
    ></div>
  );
}
