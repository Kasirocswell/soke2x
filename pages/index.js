import { useState, useEffect } from "react";

export default function Home() {
  const sections = [
    { id: 1, name: "Smoothie 1" },
    { id: 2, name: "Smoothie 2" },
    { id: 3, name: "Smoothie 3" },
    { id: 4, name: "Smoothie 4" },
    { id: 5, name: "Smoothie 5" },
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

  return (
    <div
      className="h-screen w-screen bg-no-repeat bg-cover bg-center overflow-x-hidden relative"
      style={{ backgroundImage: "url(/bar.jpg)" }}
    >
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
            className="h-screen w-screen flex items-center justify-center text-6xl text-black bg-transparent"
          >
            {section.name}
          </div>
        ))}
      </div>
    </div>
  );
}
