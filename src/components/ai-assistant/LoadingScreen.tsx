import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Generate particles for the ring
  const particles = Array.from({ length: 80 }, (_, i) => {
    const angle = (i / 80) * Math.PI * 2;
    const radius = 80;
    const randomOffset = Math.random() * 20 - 10;
    const x = Math.cos(angle) * (radius + randomOffset);
    const y = Math.sin(angle) * (radius + randomOffset);
    const delay = (i / 80) * 2;
    const size = Math.random() * 3 + 1;
    
    return { x, y, delay, size, angle };
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#0a1a1f] flex flex-col items-center justify-center">
      {/* Particle Ring */}
      <div className="relative w-48 h-48 mb-8">
        <svg viewBox="-120 -120 240 240" className="w-full h-full">
          <defs>
            <radialGradient id="particleGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="1" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Animated particles */}
          {particles.map((particle, i) => (
            <circle
              key={i}
              cx={particle.x}
              cy={particle.y}
              r={particle.size}
              fill="#7dd3fc"
              className="animate-particle-pulse"
              style={{
                animationDelay: `${particle.delay}s`,
                filter: "blur(0.5px)",
                opacity: 0.7 + Math.random() * 0.3,
              }}
            >
              <animate
                attributeName="cx"
                values={`${particle.x};${particle.x + Math.cos(particle.angle) * 10};${particle.x}`}
                dur="3s"
                repeatCount="indefinite"
                begin={`${particle.delay}s`}
              />
              <animate
                attributeName="cy"
                values={`${particle.y};${particle.y + Math.sin(particle.angle) * 10};${particle.y}`}
                dur="3s"
                repeatCount="indefinite"
                begin={`${particle.delay}s`}
              />
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="2s"
                repeatCount="indefinite"
                begin={`${particle.delay}s`}
              />
            </circle>
          ))}
          
          {/* Rotating trail effect */}
          <g className="animate-spin-slow origin-center">
            {Array.from({ length: 40 }, (_, i) => {
              const angle = (i / 40) * Math.PI * 0.8 - Math.PI / 2;
              const radius = 80;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const opacity = i / 40;
              
              return (
                <circle
                  key={`trail-${i}`}
                  cx={x}
                  cy={y}
                  r={2 + (i / 40) * 2}
                  fill="#7dd3fc"
                  opacity={opacity * 0.8}
                  style={{ filter: "blur(1px)" }}
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <h2 className="text-white/90 text-xl md:text-2xl font-light mb-2 tracking-wide">
          Analyzing Your Preferences
        </h2>
        <p className="text-white/50 text-sm mb-6">
          Our AI is preparing your personalized recommendations
        </p>
        
        {/* Progress Bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-cyan-300 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white/40 text-xs mt-2">{progress}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
