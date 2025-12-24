"use client";

import { useEffect, useState } from "react";

export function ZineHero() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);

  const words = ["BOLD", "RAW", "REAL", "LOUD"];

  useEffect(() => {
    // Cycle through words
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);

    return () => {
      clearInterval(wordInterval);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-white border-b-4 border-black">
      {/* Background shapes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 border-8 border-zine-magenta transform rotate-45" />
        <div className="absolute bottom-20 right-20 w-96 h-96 border-8 border-zine-cyan transform -rotate-12" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-impact text-zine-yellow opacity-5">
          ★
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main headline with glitch effect */}
          <div className="relative mb-8">
            <h1
              className={`
                text-6xl md:text-8xl lg:text-9xl font-impact text-black uppercase leading-none
                ${glitchActive ? "animate-glitch" : ""}
              `}
              style={{
                textShadow: "4px 4px 0px rgba(0, 0, 0, 0.2)",
              }}
            >
              PHOTOGRAPHY
            </h1>

            {/* Color overlays for glitch effect */}
            {glitchActive && (
              <>
                <h1
                  className="absolute top-0 left-0 text-6xl md:text-8xl lg:text-9xl font-impact text-zine-magenta uppercase leading-none opacity-70"
                  style={{ transform: "translate(-3px, -3px)" }}
                >
                  PHOTOGRAPHY
                </h1>
                <h1
                  className="absolute top-0 left-0 text-6xl md:text-8xl lg:text-9xl font-impact text-zine-cyan uppercase leading-none opacity-70"
                  style={{ transform: "translate(3px, 3px)" }}
                >
                  PHOTOGRAPHY
                </h1>
              </>
            )}
          </div>

          {/* Animated rotating word */}
          <div className="relative h-24 md:h-32 mb-8 overflow-hidden">
            <div
              className="absolute inset-0 flex items-center transition-transform duration-500"
              style={{
                transform: `translateY(-${currentWord * 100}%)`,
              }}
            >
              {words.map((word, index) => (
                <h2
                  key={word}
                  className={`
                    w-full flex-shrink-0 text-5xl md:text-7xl font-impact uppercase
                    ${index % 4 === 0 ? "text-zine-magenta" : ""}
                    ${index % 4 === 1 ? "text-zine-cyan" : ""}
                    ${index % 4 === 2 ? "text-zine-yellow" : ""}
                    ${index % 4 === 3 ? "text-zine-lime" : ""}
                  `}
                  style={{
                    transform: `rotate(${index % 2 === 0 ? "-2deg" : "2deg"})`,
                    textShadow: "3px 3px 0px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  {word}
                </h2>
              ))}
            </div>
          </div>

          {/* Manifesto text */}
          <div className="relative max-w-2xl">
            <p className="text-lg md:text-xl font-mono text-black leading-relaxed">
              Not your typical portfolio. This is a{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-bold">visual zine</span>
                <span className="absolute bottom-0 left-0 right-0 h-2 bg-zine-magenta opacity-40 transform -rotate-1" />
              </span>
              {" "}— where photography meets DIY culture. Cut-and-paste aesthetics,
              photocopied vibes, and unapologetic creativity.
            </p>

            {/* Stamp accents */}
            <div className="flex gap-4 mt-8 flex-wrap">
              <div
                className="px-4 py-2 border-3 border-black bg-zine-magenta text-white font-impact text-sm transform -rotate-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer"
                style={{
                  boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.3), 3px 3px 0px 0px rgba(0,0,0,1)",
                }}
              >
                EST. 2024
              </div>
              <div
                className="px-4 py-2 border-3 border-black bg-zine-cyan text-black font-impact text-sm transform rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer"
                style={{
                  boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.3), 3px 3px 0px 0px rgba(0,0,0,1)",
                }}
              >
                100% DIY
              </div>
              <div
                className="px-4 py-2 border-3 border-black bg-zine-yellow text-black font-impact text-sm transform -rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer"
                style={{
                  boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.3), 3px 3px 0px 0px rgba(0,0,0,1)",
                }}
              >
                NO FILTERS
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-4 -right-4 text-8xl text-zine-lime opacity-30 transform rotate-45 animate-pulse hidden lg:block">
            ✦
          </div>
        </div>
      </div>

      {/* Bottom tear effect */}
      <div
        className="absolute -bottom-1 left-0 right-0 h-3 bg-white"
        style={{
          clipPath: "polygon(0% 40%, 2% 70%, 4% 30%, 6% 80%, 8% 50%, 10% 85%, 12% 40%, 14% 75%, 16% 35%, 18% 80%, 20% 45%, 22% 75%, 24% 30%, 26% 85%, 28% 50%, 30% 70%, 32% 35%, 34% 80%, 36% 45%, 38% 75%, 40% 40%, 42% 80%, 44% 50%, 46% 85%, 48% 35%, 50% 75%, 52% 45%, 54% 80%, 56% 40%, 58% 75%, 60% 50%, 62% 75%, 64% 45%, 66% 80%, 68% 40%, 70% 75%, 72% 50%, 74% 85%, 76% 35%, 78% 75%, 80% 45%, 82% 80%, 84% 40%, 86% 75%, 88% 50%, 90% 75%, 92% 45%, 94% 80%, 96% 50%, 98% 70%, 100% 45%, 100% 100%, 0% 100%)",
        }}
      />
    </div>
  );
}
