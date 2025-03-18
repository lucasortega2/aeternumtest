import React from 'react';
import { motion } from 'framer-motion';

interface AeternumLoadingButtonProps {
  isLoading: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}
const AeternumLoadingButton: React.FC<AeternumLoadingButtonProps> = ({
  isLoading,
  onClick,
  disabled,
  className,
  children,
}) => {
  return (
    <button
      type="submit"
      onClick={onClick ? onClick : () => {}}
      disabled={isLoading || disabled}
      className={`w-full py-3 px-6 rounded-lg bg-blue-500 hover:bg-opacity-80 transition relative overflow-hidden ${
        isLoading || disabled
          ? 'opacity-90 cursor-not-allowed'
          : 'cursor-pointer'
      } ${className || ''}`}
    >
      {/* Content */}
      <span
        className={`flex justify-center items-center transition-opacity ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {children || 'Generar Pago'}
      </span>

      {/* Loading animation */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-32 h-8">
            {/* Base shadow path */}
            <svg viewBox="0 0 120 40" className="absolute w-full h-full">
              <path
                d="M30,20 C30,12 42,12 60,20 C78,28 90,28 90,20 C90,12 78,12 60,20 C42,28 30,28 30,20 Z"
                fill="none"
                stroke="rgba(0,0,0,0.3)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>

            {/* Base path */}
            <svg viewBox="0 0 120 40" className="absolute w-full h-full">
              <path
                d="M30,20 C30,12 42,12 60,20 C78,28 90,28 90,20 C90,12 78,12 60,20 C42,28 30,28 30,20 Z"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            {/* Metallic trace animation */}
            <svg viewBox="0 0 120 40" className="absolute w-full h-full">
              <defs>
                <linearGradient
                  id="loadingGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,1)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              <motion.path
                d="M30,20 C30,12 42,12 60,20 C78,28 90,28 90,20 C90,12 78,12 60,20 C42,28 30,28 30,20 Z"
                fill="none"
                stroke="url(#loadingGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0.2, pathOffset: 0 }}
                animate={{ pathOffset: 1 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </svg>

            {/* Subtle particles */}
            <motion.div
              className="absolute w-full h-full pointer-events-none"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 120 40" className="w-full h-full">
                <motion.circle
                  cx="40"
                  cy="20"
                  r="1"
                  fill="white"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                />
                <motion.circle
                  cx="60"
                  cy="20"
                  r="1"
                  fill="white"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.circle
                  cx="80"
                  cy="20"
                  r="1"
                  fill="white"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
                />
                <motion.circle
                  cx="50"
                  cy="15"
                  r="0.8"
                  fill="white"
                  animate={{ opacity: [0, 0.7, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
                />
                <motion.circle
                  cx="70"
                  cy="25"
                  r="0.8"
                  fill="white"
                  animate={{ opacity: [0, 0.7, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
                />
              </svg>
            </motion.div>

            {/* Pulse glow effect */}
            <motion.div
              className="absolute w-full h-full pointer-events-none"
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 120 40" className="w-full h-full">
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <path
                  d="M30,20 C30,12 42,12 60,20 C78,28 90,28 90,20 C90,12 78,12 60,20 C42,28 30,28 30,20 Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      )}
    </button>
  );
};

export default AeternumLoadingButton;
