
import React from 'react';

export const AnimatedTeddyBear: React.FC = () => {
  return (
    <div className="relative w-full h-40 mb-8 overflow-hidden">
      {/* Car - Initially parked at center */}
      <div className="car-container absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="car relative">
          {/* Car Body */}
          <div className="car-body bg-red-500 rounded-lg w-20 h-12 relative shadow-lg">
            {/* Car Windows */}
            <div className="car-window bg-blue-200 rounded-t-lg w-12 h-6 absolute top-0 left-4 border-2 border-gray-300"></div>
            {/* Car Wheels */}
            <div className="car-wheel-left bg-black rounded-full w-4 h-4 absolute -bottom-2 left-1"></div>
            <div className="car-wheel-right bg-black rounded-full w-4 h-4 absolute -bottom-2 right-1"></div>
            {/* Car Details */}
            <div className="car-stripe bg-yellow-400 h-2 w-full absolute top-3 rounded"></div>
            {/* Car Door (subtle indication) */}
            <div className="car-door bg-red-600 w-0.5 h-8 absolute right-6 top-2 rounded"></div>
          </div>
        </div>
      </div>

      {/* Teddy Bear - Starts from top, jumps down */}
      <div className="teddy-bear-container absolute top-0 left-1/2 transform -translate-x-1/2">
        <div className="teddy-bear relative">
          {/* Speech Bubble */}
          <div className="speech-bubble absolute -top-8 -left-2 bg-white rounded-lg px-2 py-1 shadow-md border border-gray-200 opacity-0">
            <div className="text-xs font-bold text-gray-700">Hi! 👋</div>
            <div className="absolute bottom-0 left-4 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white transform translate-y-full"></div>
          </div>

          {/* Teddy Head */}
          <div className="teddy-head bg-amber-700 rounded-full w-8 h-8 relative">
            {/* Eyes */}
            <div className="teddy-eye-left bg-black rounded-full w-1.5 h-1.5 absolute top-2 left-1.5"></div>
            <div className="teddy-eye-right bg-black rounded-full w-1.5 h-1.5 absolute top-2 right-1.5"></div>
            {/* Nose */}
            <div className="teddy-nose bg-black rounded-full w-1 h-1 absolute top-3 left-1/2 transform -translate-x-1/2"></div>
            {/* Mouth (subtle smile) */}
            <div className="teddy-mouth w-2 h-1 border-b-2 border-black rounded-full absolute top-4 left-1/2 transform -translate-x-1/2"></div>
            {/* Ears */}
            <div className="teddy-ear-left bg-amber-600 rounded-full w-3 h-3 absolute -top-1 left-0"></div>
            <div className="teddy-ear-right bg-amber-600 rounded-full w-3 h-3 absolute -top-1 right-0"></div>
          </div>
          
          {/* Teddy Body */}
          <div className="teddy-body bg-amber-700 rounded-lg w-6 h-8 absolute top-6 left-1 relative">
            {/* Arms */}
            <div className="teddy-arm-left bg-amber-700 rounded-full w-2 h-4 absolute -left-1 top-1 waving-arm"></div>
            <div className="teddy-arm-right bg-amber-700 rounded-full w-2 h-4 absolute -right-1 top-1"></div>
            {/* Legs */}
            <div className="teddy-leg-left bg-amber-700 rounded-full w-1.5 h-3 absolute left-1 bottom-0 transform translate-y-2"></div>
            <div className="teddy-leg-right bg-amber-700 rounded-full w-1.5 h-3 absolute right-1 bottom-0 transform translate-y-2"></div>
          </div>
          
          {/* Backpack */}
          <div className="teddy-backpack bg-blue-600 rounded w-4 h-5 absolute top-7 left-2 z-10">
            <div className="backpack-strap bg-blue-800 w-0.5 h-6 absolute -top-2 left-1"></div>
            <div className="backpack-strap bg-blue-800 w-0.5 h-6 absolute -top-2 right-1"></div>
            <div className="backpack-pocket bg-blue-500 w-2 h-2 absolute top-1 left-1 rounded"></div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        /* Car stays parked initially, then starts moving after teddy gets in */
        .car-container {
          animation: carJourney 12s ease-in-out infinite;
        }
        
        /* Teddy bear animation sequence */
        .teddy-bear-container {
          animation: teddyJourney 12s ease-in-out infinite;
        }
        
        /* Waving animation for teddy's arm */
        .waving-arm {
          animation: waveHand 0.5s ease-in-out 3;
          animation-delay: 2s;
          transform-origin: top center;
        }
        
        /* Speech bubble animation */
        .speech-bubble {
          animation: showSpeech 2s ease-in-out;
          animation-delay: 2s;
        }
        
        /* Car wheels rotation when moving */
        .car-wheel-left, .car-wheel-right {
          animation: wheelRotation 0.8s linear infinite;
          animation-play-state: paused;
        }
        
        /* Start wheel rotation when car moves */
        .car-container {
          animation: carJourney 12s ease-in-out infinite;
        }
        
        .car-container .car-wheel-left, 
        .car-container .car-wheel-right {
          animation-delay: 5s;
          animation-play-state: running;
        }
        
        /* Main teddy journey animation */
        @keyframes teddyJourney {
          /* Phase 1: Jump from top and land */
          0% {
            transform: translateX(-50%) translateY(-200px);
            opacity: 0;
          }
          8% {
            transform: translateX(-50%) translateY(120px) translateX(-40px);
            opacity: 1;
          }
          16% {
            transform: translateX(-50%) translateY(140px) translateX(-40px);
            opacity: 1;
          }
          
          /* Phase 2: Stand and wave (2 seconds) */
          25% {
            transform: translateX(-50%) translateY(140px) translateX(-40px);
            opacity: 1;
          }
          
          /* Phase 3: Walk to car and get in */
          33% {
            transform: translateX(-50%) translateY(140px) translateX(-10px);
            opacity: 1;
          }
          41% {
            transform: translateX(-50%) translateY(140px) translateX(0px);
            opacity: 0;
          }
          
          /* Phase 4: Inside car, moving with it */
          50% {
            transform: translateX(-50%) translateY(120px) translateX(0px);
            opacity: 0;
          }
          75% {
            transform: translateX(300px) translateY(120px);
            opacity: 0;
          }
          83% {
            transform: translateX(-400px) translateY(120px);
            opacity: 0;
          }
          100% {
            transform: translateX(-50%) translateY(-200px);
            opacity: 0;
          }
        }
        
        /* Car movement animation */
        @keyframes carJourney {
          /* Phase 1-3: Car stays parked */
          0% {
            transform: translateX(-50%);
          }
          41% {
            transform: translateX(-50%);
          }
          
          /* Phase 4: Car starts moving right */
          50% {
            transform: translateX(-50%);
          }
          75% {
            transform: translateX(400px);
          }
          83% {
            transform: translateX(-400px);
          }
          92% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        /* Waving hand animation */
        @keyframes waveHand {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-30deg);
          }
        }
        
        /* Speech bubble animation */
        @keyframes showSpeech {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          20% {
            opacity: 1;
            transform: scale(1);
          }
          80% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.8);
          }
        }
        
        /* Wheel rotation */
        @keyframes wheelRotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .teddy-bear-container, .car-container {
            transform: scale(0.8) translateX(-62.5%);
          }
        }
        
        @media (max-width: 480px) {
          .teddy-bear-container, .car-container {
            transform: scale(0.6) translateX(-83.3%);
          }
        }
        `
      }} />
    </div>
  );
};
