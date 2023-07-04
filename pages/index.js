import { useState, useEffect } from "react";
import ThreeScene from "../components/ThreeScene";
import { pen, sun, pop } from "../fonts/fonts";
import Link from "next/link";
import AudioEqualizer from "../components/AudioEqualizer";

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

  const [isMuted, setMuted] = useState(false);

  const handleSound = () => {
    setMuted(!isMuted);
  };

  //

  return (
    <div
      className="h-screen w-screen bg-no-repeat bg-cover bg-center overflow-hidden 2xl:h-screen 2xl:w-screen 2xl:bg-no-repeat 2xl:bg-cover 2xl:bg-center 2xl:overflow-hidden relative"
      style={{ backgroundImage: "url(/bar2.png)" }}
    >
      <div className="header-container flex flex-row justify-between 2xl:header-container 2xl:flex 2xl:flex-row 2xl:justify-between">
        <div className="z-40 pl-[25px] pt-[20px] overflow-x-hidden text-[15px] 2xl:z-40 2xl:pl-[100px] 2xl:pt-[50px] 2xl:overflow-x-hidden">
          <h2 className={`2xl:text-4xl ${pop.className}`}>SOKES SWIG</h2>
        </div>
        <div className="pt-[20px] mr-[20px] flex z-30 2xl:pt-[60px] 2xl:pr-[100px] 2xl:flex 2xl:z-30 2xl:text-3xl">
          <div className="w-[80px] h-[40px] pr-[150px] z-40 2xl:w-[80px] 2xl:h-[40px] 2xl:pr-[160px] 2xl:z-40">
            <button
              onClick={handleSound}
              className={`w-[90px] h-[40px] pl-[90px] text-[25px] 2xl:w-[90px] 2xl:-[40px] 2xl:ml-[80px] 2xl:text-[45px] ${pen.className}`}
            >
              Sound
            </button>
            <div className="w-[90px] h-[40px] pl-[80px] 2xl:pl-[160px]">
              <AudioEqualizer muted={isMuted} />
            </div>
          </div>
          <Link
            href="mailto:springerisoke@gmail.com"
            className={`text-[25px] 2xl:text-[45px] 2xl:ml-[130px] ${pen.className}`}
          >
            Contact
          </Link>
        </div>
      </div>
      <div
        container="div-sound"
        className="pt-[700px] pl-[1500px] z-40 text-3xl"
      ></div>
      <div className="absolute z-20 top-0 right-0 bottom-0 left-0">
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
            className="h-screen w-screen flex items-center justify-center text-6xl pb-[260px] text-white bg-transparent"
          >
            <div className="flavor-main-container h-[60%] w-[100%] flex">
              <div className="w-screen flex flex-col text-3xl 2xl:pl-[250px] 2xl:pt-[70px]">
                <div
                  className={`pl-[20px] text-lg 2xl:text-3xl 2xl:pb-[16px] ${sun.className}`}
                >
                  {section.tagLine}
                </div>
                <div
                  className={`w-[230px] pl-[20px] ${pen.className} text-4xl 2xl:w-[400px] 2xl:text-[80px] 2xl:z-10`}
                >
                  {section.name}
                </div>
                <div
                  className={`text-lg pl-[20px] 2xl:text-3xl 2xl:pt-[20px] ${sun.className}`}
                >
                  {section.attributes}
                </div>
              </div>
              <div
                className={`w-screen pt-[430px] pr-[10px] flex flex-wrap 2xl:w-[740px] 2xl:mr-[150px] 2xl:pt-[450px] 2xl:flex-wrap 2xl:flex-row 2xl:text-3xl text-lg ${sun.className}`}
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
