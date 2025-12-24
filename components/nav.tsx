"use client";

import Link from "next/link";
import { useState } from "react";

export function Nav() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const links = [
    { href: "/", label: "HOME", color: "text-zine-magenta" },
    { href: "/projects", label: "PROJECTS", color: "text-zine-cyan" },
    { href: "/about", label: "ABOUT", color: "text-zine-yellow" },
  ];

  return (
    <nav className="border-b-4 border-black relative overflow-hidden bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group relative"
          >
            <span className="text-3xl md:text-4xl font-impact text-black relative z-10 hover:animate-wobble inline-block transition-all">
              CHRIS WYLDE
            </span>
            <span className="absolute -bottom-1 left-0 w-full h-3 bg-zine-magenta opacity-40 -z-10 transform -rotate-1" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl md:text-4xl font-impact text-zine-cyan opacity-0 group-hover:opacity-30 transition-opacity duration-200 blur-sm">
              CHRIS WYLDE
            </span>
          </Link>

          <ul className="flex gap-4 md:gap-8 items-center">
            {links.map((link, index) => (
              <li
                key={link.href}
                className="relative"
                style={{
                  transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`
                }}
              >
                <Link
                  href={link.href}
                  className={`
                    text-sm md:text-lg font-impact ${link.color}
                    hover:scale-110 transition-all duration-200 inline-block
                    relative group
                  `}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <span className="relative z-10 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
                    {link.label}
                  </span>

                  {hoveredLink === link.href && (
                    <span
                      className="absolute inset-0 border-2 border-black transform rotate-3 animate-stamp-pop"
                      style={{
                        boxShadow: 'inset 0 0 0 1px black'
                      }}
                    />
                  )}
                </Link>

                {index < links.length - 1 && (
                  <span className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 text-black font-bold text-xl">
                    ★
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Diagonal stripe accent */}
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-br from-zine-yellow/20 to-transparent transform skew-x-12 pointer-events-none" />
    </nav>
  );
}

