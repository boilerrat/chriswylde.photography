"use client";

export function Footer() {
  return (
    <footer className="border-t-4 border-black mt-auto bg-white relative overflow-hidden">
      {/* Diagonal stripes background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-zine-magenta via-zine-cyan to-zine-yellow"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright with stamp effect */}
          <div className="text-center md:text-left">
            <p className="text-sm font-mono text-black">
              © {new Date().getFullYear()} CHRIS WYLDE PHOTOGRAPHY
            </p>
            <p className="text-xs font-mono text-black/60 mt-1">
              HANDCRAFTED WITH ❤️ & ZINE VIBES
            </p>
          </div>

          {/* Decorative stamps */}
          <div className="flex gap-4 items-center">
            <div className="px-3 py-1 border-2 border-zine-magenta text-zine-magenta font-impact text-xs transform -rotate-3" style={{
              boxShadow: 'inset 0 0 0 1px currentColor'
            }}>
              DIY
            </div>
            <div className="px-3 py-1 border-2 border-zine-cyan text-zine-cyan font-impact text-xs transform rotate-2" style={{
              boxShadow: 'inset 0 0 0 1px currentColor'
            }}>
              SINCE 2024
            </div>
            <div className="px-3 py-1 border-2 border-zine-yellow text-zine-yellow font-impact text-xs transform -rotate-1" style={{
              boxShadow: 'inset 0 0 0 1px currentColor'
            }}>
              ANALOG
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="mt-6 h-2 bg-gradient-to-r from-zine-magenta via-zine-cyan to-zine-yellow transform -rotate-1" />
      </div>
    </footer>
  );
}

