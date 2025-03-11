import { motion } from 'framer-motion';

const AeternumAnimatedLogo = () => {
  return (
    <div className="w-full h-64 flex flex-col items-center justify-center  p-8">
      <div className="relative w-64 h-40 flex items-center justify-center">
        {/* Shadow base */}
        <div className="absolute w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <path
              d="M25,25 C25,13 35,13 50,25 C65,37 75,37 75,25 C75,13 65,13 50,25 C35,37 25,37 25,25 Z"
              fill="none"
              stroke="#222"
              strokeWidth="8"
              strokeLinecap="round"
              filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.5))"
            />
          </svg>
        </div>

        {/* Metallic base - outer silver ring */}
        <svg viewBox="0 0 100 50" className="absolute w-full h-full">
          <defs>
            <linearGradient
              id="silverGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#e0e0e0" />
              <stop offset="30%" stopColor="#f5f5f5" />
              <stop offset="70%" stopColor="#a0a0a0" />
              <stop offset="100%" stopColor="#808080" />
            </linearGradient>
          </defs>
          <path
            d="M25,25 C25,13 35,13 50,25 C65,37 75,37 75,25 C75,13 65,13 50,25 C35,37 25,37 25,25 Z"
            fill="none"
            stroke="url(#silverGradient1)"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>

        {/* Black center */}
        <svg viewBox="0 0 100 50" className="absolute w-full h-full">
          <path
            d="M25,25 C25,13 35,13 50,25 C65,37 75,37 75,25 C75,13 65,13 50,25 C35,37 25,37 25,25 Z"
            fill="none"
            stroke="#121212"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* Animated light reflection */}
        <motion.div
          className="absolute w-full h-full"
          animate={{
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <linearGradient
              id="silverGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#d0d0d0" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#a0a0a0" stopOpacity="0.1" />
            </linearGradient>
            <path
              d="M25,25 C25,13 35,13 50,25 C65,37 75,37 75,25 C75,13 65,13 50,25 C35,37 25,37 25,25 Z"
              fill="none"
              stroke="url(#silverGradient2)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Animated trace light */}
        <svg viewBox="0 0 100 50" className="absolute w-full h-full">
          <motion.path
            d="M25,25 C25,13 35,13 50,25 C65,37 75,37 75,25 C75,13 65,13 50,25 C35,37 25,37 25,25 Z"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{
              pathLength: [0, 1, 1],
              pathOffset: [0, 0, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>

        {/* Inner shine effect */}
        {/* <motion.div
          className="absolute w-full h-full"
          animate={{
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <path
              d="M25,25 C25,13 35,13 50,25 C65,37 75,37 75,25 C75,13 65,13 50,25 C35,37 25,37 25,25 Z"
              fill="none"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="1"
              strokeDasharray="1 3"
              strokeLinecap="round"
            />
          </svg>
        </motion.div> */}

        {/* Subtle glow effect */}
        {/* <motion.div
          className="absolute w-full h-full"
          animate={{
            filter: ['blur(2px)', 'blur(4px)', 'blur(2px)'],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <path
              d="M25,25 C25,13 35,13 50,25 C65,37 75,37 75,25 C75,13 65,13 50,25 C35,37 25,37 25,25 Z"
              fill="none"
              stroke="rgba(230, 230, 255, 0.5)"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </motion.div> */}

        {/* Particle effect around the infinity symbol */}
        <motion.div
          className="absolute w-full h-full"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <circle cx="30" cy="25" r="1" fill="white" opacity="0.5" />
            <circle cx="70" cy="25" r="1" fill="white" opacity="0.5" />
            <circle cx="50" cy="15" r="1" fill="white" opacity="0.5" />
            <circle cx="50" cy="35" r="1" fill="white" opacity="0.5" />
            <circle cx="40" cy="20" r="0.5" fill="white" opacity="0.3" />
            <circle cx="60" cy="30" r="0.5" fill="white" opacity="0.3" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default AeternumAnimatedLogo;
