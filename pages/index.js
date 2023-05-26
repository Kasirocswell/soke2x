import { useState, useEffect } from "react";
import Image from "next/image";
import LoopingSound from "../components/LoopingSound";
import ThreeScene from "../components/ThreeScene";
import { pen, sun, pop } from "../fonts/fonts";

export default function Home() {
  const sections = [
    {
      id: 1,
      name: "Peanut Punch",
      tagLine: "It's So Good",
      attributes: "Iron - Agave",
      description:
        "Creamy blend of peanuts, bananas, and a touch of sweetness, creating a rich and satisfying punch.",
    },
    {
      id: 2,
      name: "Strango",
      tagLine: "Strawed Up The Mango",
      attributes: "Vitamin C - High Fiber",
      description:
        "Exotic fusion of strawberries and mangoes, delivering a tantalizingly sweet and tangy flavor explosion.",
    },
    {
      id: 3,
      name: "Strawnanza",
      tagLine: "Banana Strawberry Yum",
      attributes: "Potassium - Vitamin B6",
      description:
        "A delightful frenzy of strawberry and banana, culminating in a burst of fruity goodness.",
    },
    {
      id: 4,
      name: "Tapple",
      tagLine: "Tap That Apple",
      attributes: "Apple - Agave",
      description:
        "Creamy blend of peanuts, bananas, and a touch of sweetness, creating a rich and satisfying punch.",
    },
    {
      id: 5,
      name: "Pineberry",
      tagLine: "Sweet Pinapple Goodness",
      attributes: "Vitamain - Agave",
      description:
        "A delightful blend of juicy pineapples and succulent strawberries, creating a sweet and tangy sensation.",
    },
  ];

  const handleSound = () => {
    // const audio = document.getElementsByClassName("audio");
    // const mute = () => {
    //   if (audio.hasAttribute("muted")) {
    //     audio.removeAttribute("muted");
    //   } else {
    //     audio.setAttribute("muted");
    //   }
    // };
  };

  const [activeSection, setActiveSection] = useState(0);
  const [scrollTime, setScrollTime] = useState(Date.now());

  const goPrev = () =>
    setActiveSection(
      activeSection > 0 ? activeSection - 1 : sections.length - 1
    );
  const goNext = () =>
    setActiveSection(
      activeSection < sections.length - 1 ? activeSection + 1 : 0
    );

  const onWheel = (e) => {
    e.preventDefault();
    // Debounce scroll event
    if (Date.now() - scrollTime > 500) {
      // Only allow scroll event to trigger if 500ms has passed since last scroll
      setScrollTime(Date.now()); // Update last scroll time
      if (e.deltaY < 0 || e.deltaX < 0) {
        goPrev();
      } else if (e.deltaY > 0 || e.deltaX > 0) {
        goNext();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [activeSection]);

  //

  return (
    <div
      className="h-screen w-screen bg-no-repeat bg-cover bg-center overflow-x-hidden relative"
      style={{ backgroundImage: "url(/bar2.png)" }}
    >
      <div className="header-container flex flex-row justify-between">
        <div className="z-40 pl-[100px] pt-[50px] text-4xl">
          <h2 className={`${pop.className}`}>SOKES SWIG</h2>
        </div>
        <div className="pt-[60px] pr-[150px] text-3xl">
          <a href="mailto:123@gmail.com" className={`${pen.className}`}>
            Contact
          </a>
        </div>
      </div>
      <div className="z-40 pt-[700px] pl-[1500px] text-3xl">
        <LoopingSound src="/waves.mp3" />
        <h2 onClick={handleSound} className={`${pen.className}`}>
          Sound
        </h2>
      </div>
      <div className="absolute z-10 top-0 right-0 bottom-0 left-0">
        <ThreeScene />
      </div>
      <div
        className="absolute top-0 h-full w-full flex transition-all transform duration-2000 ease-in-out"
        style={{
          transform: `translateX(-${activeSection * 100}vw)`,
          width: `${sections.length * 100}vw`,
        }}
      >
        {sections.map((section, index) => (
          <div
            key={index}
            className="h-screen w-screen flex items-center justify-center text-6xl text-white bg-transparent"
          >
            <div className="flavor-main-container h-[60%] w-[80%] flex">
              <div className="w-[700px] flex-col text-3xl">
                <div className={`${sun.className}`}>{section.tagLine}</div>
                <div className={`w-[500px] ${pen.className} text-6xl`}>
                  {section.name}
                </div>
                <div className={`${sun.className}`}>{section.attributes}</div>
              </div>
              <div
                className={`description-div w-[1520px] pl-[400px] pt-[400px] flex-wrap ${sun.className} text-3xl`}
              >
                {section.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
