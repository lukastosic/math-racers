import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

// --- Configuration ---
// The number of firework rockets to launch.
const NUM_FIREWORKS = 15;
// The number of sparks each firework creates upon exploding.
const NUM_SPARKS_PER_FIREWORK = 30;


/**
 * A single firework component that handles its own animation from launch to explosion.
 */
const SingleFirework: React.FC = () => {
    // Generate random, unique properties for this firework's lifecycle.
    const style = {
        '--x-end': `${Math.random() * 80 + 10}%`,      // Horizontal explosion point
        '--y-end': `${Math.random() * 30 + 15}%`,      // Vertical explosion point
        '--hue': `${Math.random() * 360}`,             // Base color of the firework
        '--fly-duration': `${Math.random() * 1 + 0.8}s`,  // How long the rocket takes to fly up
        '--explode-duration': `${Math.random() * 0.8 + 0.6}s`, // How long the sparks last
        '--delay': `${Math.random() * 7}s`,             // Initial delay before the first launch
    } as React.CSSProperties;

    return (
        <div className="firework-container" style={style}>
            <div className="shooter" />
            <div className="explosion">
                {Array.from({ length: NUM_SPARKS_PER_FIREWORK }).map((_, i) => (
                    <div
                        key={i}
                        className="spark"
                        style={{
                            '--angle': `${(360 / NUM_SPARKS_PER_FIREWORK) * i}deg`,
                            '--travel-distance': `${Math.random() * 40 + 60}px`,
                        } as React.CSSProperties}
                    />
                ))}
            </div>
        </div>
    );
};


/**
 * The main component that renders multiple firework instances and handles theme-specific styling.
 */
const Fireworks: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${theme}`}>
            {Array.from({ length: NUM_FIREWORKS }).map((_, i) => (
                <SingleFirework key={i} />
            ))}
        </div>
    );
};

// Add the animation styles to the document head, ensuring it's only added once.
if (!document.getElementById('fireworks-style')) {
    const style = document.createElement('style');
    style.id = 'fireworks-style';
    style.innerHTML = `
      .firework-container {
        position: absolute;
        left: var(--x-end);
        top: var(--y-end);
        transform: translate(-50%, -50%);
      }
      
      /* Default (dark mode) styles */
      .shooter {
        position: absolute;
        width: 4px;
        height: 4px;
        background-color: hsl(var(--hue), 100%, 85%);
        border-radius: 50%;
        filter: brightness(1.8);
        box-shadow: 0 0 5px hsl(var(--hue), 100%, 60%);
        animation: fly var(--fly-duration) ease-in var(--delay) infinite;
      }
      
      /* Light mode: Use darker, more saturated colors for better contrast */
      .light .shooter {
          background-color: hsl(var(--hue), 95%, 60%);
          filter: brightness(1.1);
          box-shadow: 0 0 5px hsl(var(--hue), 90%, 50%);
      }

      .explosion {
        position: absolute;
        width: 1px;
        height: 1px;
      }

      /* Default (dark mode) styles */
      .spark {
        position: absolute;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background-color: hsl(var(--hue), 100%, 75%);
        box-shadow: 0 0 6px 2px hsl(var(--hue), 100%, 65%);
        transform-origin: center;
        opacity: 0; /* Hidden until explosion time */
        animation: burst var(--explode-duration) ease-out infinite;
        animation-delay: calc(var(--delay) + var(--fly-duration));
      }

      /* Light mode: Use darker, more saturated colors */
      .light .spark {
          background-color: hsl(var(--hue), 90%, 65%);
          box-shadow: 0 0 6px 2px hsl(var(--hue), 85%, 55%);
      }

      @keyframes fly {
        0% {
          transform: translateY(25vh); /* Start from way below the viewport */
          opacity: 1;
        }
        80% {
            opacity: 1;
        }
        100% {
          transform: translateY(0); /* Arrive at the explosion point */
          opacity: 0;
        }
      }

      @keyframes burst {
        0% {
          transform: rotate(var(--angle)) translateX(0) scale(1);
          opacity: 1;
        }
        100% {
          /* Sparks fly outwards, creating a trail effect by shrinking */
          transform: rotate(var(--angle)) translateX(var(--travel-distance)) scale(0);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
}

export default Fireworks;
