import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
const DiscountCombo = () => {
  return (
    <motion.div
      className=" rounded-2xl bg-gradient-to-r from-aeternum-silver/20 to-aeternum-silver/10 p-8 mb-16 border border-aeternum-silver/10 overflow-hidden relative "
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left max-w-xl">
          <div className="inline-flex items-center mb-4 px-3 py-1 rounded-full bg-aeternum-silver/20 text-aeternum-silver text-sm">
            <Sparkles size={16} className="mr-2" />
            Oferta por tiempo limitado
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Compra cualquier combo y recibe un 15% de descuento adicional
          </h2>
          <p className="text-aeternum-silver/80 mb-6">
            Usa el código{' '}
            <span className="font-mono bg-aeternum-black/30 px-2 py-1 rounded text-aeternum-white">
              AETERNUM15
            </span>{' '}
            durante el proceso de compra para recibir este descuento exclusivo.
          </p>
          <a href="/productos">
            <motion.button
              className="bg-aeternum-silver text-aeternum-black font-medium px-6 py-3 rounded-lg border border-transparent hover:bg-transparent hover:text-aeternum-silver hover:border-aeternum-silver transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Ver todos los productos
            </motion.button>
          </a>
        </div>
        <div className="w-48 h-48 relative flex items-center justify-center">
          <motion.div
            className="absolute inset-1 border-2 border-dashed border-aeternum-silver/30 rounded-full "
            animate={{ rotate: 360 }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <div className="absolute inset-4  rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-aeternum-silver">15%</span>
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 bg-aeternum-silver/5 rounded-full blur-2xl"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </motion.div>
  );
};
export default DiscountCombo;
