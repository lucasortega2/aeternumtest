import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Componente para el título con un efecto de animación mejorado
const AnimatedTitle = ({ title = 'Messenger Bag' }) => {
  const letters = title.split('');
  const [activeLetters, setActiveLetters] = useState(
    Array(letters.length).fill(false),
  );
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const titleRef = useRef(null);

  // Efecto de "resplandor magnético" que sigue al mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });

        // Actualizar qué letras están activas basado en la cercanía al cursor
        const newActiveLetters = letters.map((_, index) => {
          const letterEl = titleRef.current.children[index];
          if (letterEl) {
            const letterRect = letterEl.getBoundingClientRect();
            const letterCenter = {
              x: letterRect.left + letterRect.width / 2 - rect.left,
              y: letterRect.top + letterRect.height / 2 - rect.top,
            };

            const distance = Math.sqrt(
              Math.pow(letterCenter.x - mousePosition.x, 2) +
                Math.pow(letterCenter.y - mousePosition.y, 2),
            );

            // Activar letras cercanas al cursor
            return distance < 60;
          }
          return false;
        });

        setActiveLetters(newActiveLetters);
      }
    };

    // También añadimos un efecto de "ola" automático cuando no hay interacción
    const autoWaveEffect = () => {
      if (!titleRef.current || titleRef.current.matches(':hover')) return;

      let i = 0;
      const waveInterval = setInterval(() => {
        if (i >= letters.length) {
          clearInterval(waveInterval);
          setActiveLetters(Array(letters.length).fill(false));
          return;
        }

        setActiveLetters((prev) => {
          const newActive = [...prev];
          // Activar la letra actual y adyacentes para un efecto de ola
          newActive[i - 1] = i > 0;
          newActive[i] = true;
          newActive[i + 1] = i < letters.length - 1;
          return newActive;
        });

        i++;
      }, 100);
    };

    // Ejecutar el efecto de ola cada cierto tiempo
    const waveTimer = setInterval(autoWaveEffect, 5000);

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(waveTimer);
    };
  }, [letters.length, mousePosition]);

  return (
    <div className="flex flex-col items-center mb-8">
      <div ref={titleRef} className="flex relative py-2 px-4">
        {letters.map((letter, index) => (
          <span
            key={index}
            className={`relative text-4xl md:text-5xl font-bold transition-all duration-300 ${
              letter === ' ' ? 'w-4' : ''
            } ${
              activeLetters[index]
                ? 'text-aeternum-silver scale-110 z-10'
                : 'text-aeternum-highlight'
            }`}
            style={{
              textShadow: activeLetters[index]
                ? '0 0 20px rgba(217, 217, 217, 0.7)'
                : 'none',
              transform: activeLetters[index]
                ? 'translateY(-4px)'
                : 'translateY(0)',
            }}
          >
            {letter}
          </span>
        ))}

        {/* Efecto de resplandor que sigue al cursor */}
        <div
          className="absolute rounded-full bg-gradient-to-r from-aeternum-silver/5 to-aeternum-highlight/5 blur-xl pointer-events-none"
          style={{
            width: '120px',
            height: '120px',
            left: `${mousePosition.x - 60}px`,
            top: `${mousePosition.y - 60}px`,
            opacity: 0.7,
            transition: 'transform 0.05s ease-out',
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      </div>

      {/* Línea decorativa con efecto de brillo */}
      <div className="w-40 h-1 bg-gradient-to-r from-aeternum-highlight/20 via-aeternum-silver/50 to-aeternum-highlight/20 rounded-full relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full w-20 bg-aeternum-silver/40 blur-sm"
          style={{
            animation: 'shimmer 2s infinite',
            transform: 'skewX(-45deg) translateX(-100%)',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: skewX(-45deg) translateX(-150%);
          }
          100% {
            transform: skewX(-45deg) translateX(250%);
          }
        }
      `}</style>
    </div>
  );
};

// Componente principal para la sección destacada
const FeaturedMessengerBag = ({
  product = {
    title: 'Messenger Bag',
    description:
      'Diseñada para el profesional moderno, nuestra Messenger Bag combina funcionalidad y elegancia. Fabricada con cuero genuino y acabados premium.',
    price: '$149.99',
    media: '/Video-Messenger-bag.mp4',
  },
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-20"
    >
      <div className="relative bg-gradient-to-r from-aeternum-medium/50 via-aeternum-medium/30 to-aeternum-dark/80 rounded-2xl overflow-hidden">
        {/* Creative background effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[300px] h-[300px] bg-aeternum-highlight/5 rounded-full blur-[80px] -top-20 -left-20 animate-pulse-subtle"></div>
          <div
            className="absolute w-[250px] h-[250px] bg-aeternum-highlight/10 rounded-full blur-[70px] bottom-10 right-20 animate-pulse-subtle"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10 cursor-default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Animated title component */}
              <AnimatedTitle title={product.title} />

              <p className="text-xl text-aeternum-accent/90">
                {product.description}
              </p>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-aeternum-accent/10 flex items-center justify-center">
                    <span className="text-aeternum-highlight">✓</span>
                  </div>
                  <p className="text-aeternum-accent">Resistente al agua</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-aeternum-accent/10 flex items-center justify-center">
                    <span className="text-aeternum-highlight">✓</span>
                  </div>
                  <p className="text-aeternum-accent">Materiales premium</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-aeternum-accent/10 flex items-center justify-center">
                    <span className="text-aeternum-highlight">✓</span>
                  </div>
                  <p className="text-aeternum-accent">Diseño versátil</p>
                </motion.div>
              </div>
              <div className="pt-6">
                <p className="text-3xl font-bold text-aeternum-highlight mb-4">
                  {product.price}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-aeternum-accent/20 text-aeternum-highlight px-8 py-3 rounded-lg hover:bg-aeternum-accent/30 transition-colors duration-300 hover:cursor-pointer"
                >
                  Agregar al carrito
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative rounded-3xl w-full h-96"
            >
              <video
                src={product.media}
                loop
                muted
                autoPlay
                className="rounded-3xl w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aeternum-dark/30 to-transparent rounded-3xl"></div>

              {/* Pulsing highlight effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                animate={{
                  boxShadow: [
                    '0 0 0 rgba(209, 213, 219, 0)',
                    '0 0 20px rgba(209, 213, 219, 0.3)',
                    '0 0 0 rgba(209, 213, 219, 0)',
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedMessengerBag;
