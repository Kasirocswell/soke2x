import { useState, useEffect } from "react";

const ProgressBar = ({ completed }) => {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCompletion((prevCompletion) => {
        if (prevCompletion >= completed || prevCompletion >= 100) {
          clearInterval(timer);
          return prevCompletion >= 100 ? 100 : completed;
        }
        return prevCompletion + 1;
      });
    }, 70); // 1000ms * 7s / 100% = 70ms per 1%

    return () => clearInterval(timer);
  }, [completed]);

  return (
    <div className="h-4 w-64 bg-yellow-500 rounded-full my-12 relative overflow-hidden">
      <div
        className="h-full bg-blue-500 rounded-full text-black font-bold px-2 absolute left-0 flex items-center justify-center"
        style={{ width: `${completion}%` }}
      >
        {completion}%
      </div>

      <style jsx>{`
        .w-64 {
          width: 250px;
        }

        div[style] {
          animation: width 7s linear forwards;
        }

        @keyframes width {
          from {
            width: 0%;
          }
          to {
            width: ${completed}%;
          }
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
