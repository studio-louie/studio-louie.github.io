import React from 'react';

interface MasterSwordProps {
  className?: string;
  glow?: boolean;
}

export const MasterSword: React.FC<MasterSwordProps> = ({ className = "", glow = false }) => {
  return (
    <svg
      viewBox="0 0 100 300"
      className={`overflow-visible ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bladeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C0C0C0" />
          <stop offset="50%" stopColor="#E0E0E0" />
          <stop offset="51%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#C0C0C0" />
        </linearGradient>
        <filter id="glowFilter">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Blade */}
      <path
        d="M50 20 L65 220 L50 290 L35 220 Z"
        fill="url(#bladeGradient)"
        stroke="#999"
        strokeWidth="1"
        filter={glow ? "url(#glowFilter)" : ""}
      />
      
      {/* Triforce Emblem */}
      <path
        d="M50 70 L45 80 L55 80 Z M45 80 L40 90 L50 90 Z M55 80 L50 90 L60 90 Z"
        fill="#FFD700"
      />

      {/* Guard (The blue winged part) */}
      <path
        d="M20 220 C20 220, 5 200, 50 170 C95 200, 80 220, 80 220 L65 220 L65 230 L35 230 L35 220 Z"
        fill="#483D8B" 
        stroke="#2E2563"
        strokeWidth="2"
      />
      
      {/* Jewel in the hilt */}
      <path
        d="M50 215 L55 225 L50 235 L45 225 Z"
        fill="#FFD700"
      />

      {/* Handle */}
      <rect x="42" y="230" width="16" height="50" fill="#2E2563" rx="2" />
      
      {/* Handle Grip Texture */}
      <path d="M42 240 L58 245" stroke="#483D8B" strokeWidth="2" />
      <path d="M42 250 L58 255" stroke="#483D8B" strokeWidth="2" />
      <path d="M42 260 L58 265" stroke="#483D8B" strokeWidth="2" />
      <path d="M42 270 L58 275" stroke="#483D8B" strokeWidth="2" />

      {/* Pommel */}
      <circle cx="50" cy="285" r="8" fill="#483D8B" stroke="#2E2563" strokeWidth="2" />
    </svg>
  );
};
