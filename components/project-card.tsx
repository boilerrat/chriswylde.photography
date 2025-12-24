"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/schema";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Alternate rotations and colors for collage effect
  const rotations = ['-3deg', '2deg', '-2deg', '3deg', '-1deg', '2deg'];
  const rotation = rotations[index % rotations.length];

  const stampColors = [
    'text-zine-magenta',
    'text-zine-cyan',
    'text-zine-yellow',
    'text-zine-lime',
  ];
  const stampColor = stampColors[index % stampColors.length];

  const borderColors = [
    'border-zine-magenta',
    'border-zine-cyan',
    'border-zine-yellow',
    'border-zine-lime',
  ];
  const borderColor = borderColors[index % borderColors.length];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block relative"
      style={{
        transform: `rotate(${rotation})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card container with torn paper effect */}
      <div className={`
        relative bg-white p-3 border-4 ${borderColor}
        shadow-[6px_6px_0px_0px_rgba(0,0,0,0.9)]
        transition-all duration-300
        ${isHovered ? 'shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)] -translate-y-1 scale-105' : ''}
      `}>
        {/* Torn edge at top */}
        <div className="absolute -top-2 left-0 right-0 h-2 bg-white" style={{
          clipPath: 'polygon(0% 40%, 3% 70%, 6% 30%, 9% 80%, 12% 50%, 15% 85%, 18% 40%, 21% 75%, 24% 35%, 27% 80%, 30% 45%, 33% 75%, 36% 30%, 39% 85%, 42% 50%, 45% 70%, 48% 35%, 51% 80%, 54% 45%, 57% 75%, 60% 40%, 63% 80%, 66% 50%, 69% 85%, 72% 35%, 75% 75%, 78% 45%, 81% 80%, 84% 40%, 87% 75%, 90% 50%, 93% 75%, 96% 45%, 100% 80%, 100% 100%, 0% 100%)'
        }} />

        {/* Image with photocopier effect */}
        <div className="aspect-[4/3] relative overflow-hidden bg-black border-2 border-black">
          <Image
            src={project.coverImageUrl}
            alt={project.title}
            fill
            className="object-cover transition-all duration-300 group-hover:contrast-125 group-hover:brightness-110 zine-photocopy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay gradient on hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 pointer-events-none" />
          )}
        </div>

        {/* Title with impact font and marker underline */}
        <div className="mt-4 space-y-2">
          <h2 className="text-2xl font-impact uppercase text-black leading-tight relative inline-block">
            {project.title}
            <span className={`absolute -bottom-1 left-0 right-0 h-2 ${stampColor.replace('text-', 'bg-')} opacity-40 transform -rotate-1 -z-10`} />
          </h2>

          {/* Description in typewriter font */}
          <p className="text-sm font-mono text-black/80 line-clamp-2 leading-relaxed">
            {project.oneLine}
          </p>

          {/* Location with stamp effect */}
          {project.location && (
            <div className={`inline-block px-3 py-1 border-2 border-black ${stampColor} font-impact text-xs transform -rotate-2 mt-2`}>
              {project.location.toUpperCase()}
            </div>
          )}
        </div>

        {/* Corner tape effect */}
        <div className="absolute -top-3 -right-3 w-16 h-8 bg-yellow-100 opacity-60 transform rotate-45 shadow-sm" style={{
          background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
        }} />

        {/* Random scribble accent */}
        {index % 3 === 0 && (
          <div className="absolute -bottom-2 -left-2 text-3xl transform rotate-12 opacity-70">
            <span className={stampColor}>✦</span>
          </div>
        )}

        {/* Rubber stamp on some cards */}
        {index % 4 === 0 && isHovered && (
          <div className={`absolute top-4 right-4 px-2 py-1 border-2 ${stampColor} border-current font-impact text-xs uppercase transform rotate-12 opacity-80 animate-stamp-pop`} style={{
            boxShadow: 'inset 0 0 0 1px currentColor'
          }}>
            NEW!
          </div>
        )}
      </div>

      {/* Hand-drawn arrow on hover */}
      {isHovered && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-4xl animate-bounce">
          ↓
        </div>
      )}
    </Link>
  );
}

