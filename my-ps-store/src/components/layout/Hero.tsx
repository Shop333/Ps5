'use client';
import { motion } from 'framer-motion';

export default function Hero() {
  // Variasi animasi untuk container (judul utama)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3, // Jeda sebelum anak-anaknya mulai muncul
        staggerChildren: 0.2 // Jeda antar kata/huruf
      }
    }
  };

  // Variasi animasi untuk setiap kata/bagian teks
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9] // Custom ease untuk gerakan yang smooth
      }
    }
  };

  return (
    <section className="relative pt-36 pb-20 px-6 sm:px-12 overflow-hidden">
      
      {/* Background Decor (Glow Biru Halus) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        
        {/* Label Kecil di Atas Judul */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full border-blue-500/20 mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-[9px] font-bold text-blue-300 uppercase tracking-widest">
            OFFICIAL DIGITAL CATALOG
          </span>
        </motion.div>

        {/* Judul Utama dengan Animasi Staggered */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl font-black italic tracking-tighter leading-none"
        >
          <motion.span variants={itemVariants} className="block text-white">THE ULTIMATE</motion.span>
          <motion.span 
            variants={itemVariants} 
            className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-ps-light-blue"
          >
            PLAYSTATION
          </motion.span>
          <motion.span variants={itemVariants} className="block text-white">EXPERIENCE</motion.span>
        </motion.h1>

        {/* Deskripsi Singkat */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed"
        >
          Temukan konsol terbaru, aksesori premium, dan game terlaris. 
          Katalog digital terlengkap untuk komunitas PlayStation di <span className="text-white font-semibold">Jembrana, Bali</span>.
        </motion.p>

        {/* Tombol Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 flex flex-wrap gap-4 justify-center"
        >
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(37,99,235,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-tighter shadow-xl shadow-blue-600/20"
          >
            Jelajahi Katalog
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.95 }}
            className="glass text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-tighter border-white/10"
          >
            Pelajari Lebih Lanjut
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
