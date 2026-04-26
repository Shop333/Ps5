'use client';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react'; 
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }: any) {
  const { addToCart } = useCart();

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        borderColor: "rgba(59, 130, 246, 0.3)" 
      }}
      className="relative group glass rounded-[2.5rem] overflow-hidden transition-colors duration-300 border border-white/5"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-transparent to-blue-900/0 group-hover:from-blue-600/10 group-hover:to-blue-900/5 transition-colors duration-500 z-0" />

      {/* Container Gambar Produk */}
      <div className="relative h-64 w-full p-4 z-10">
        <div className="relative w-full h-full bg-gray-900/50 rounded-[2rem] overflow-hidden border border-white/5 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
          
          {/* Visual Emoji / Image */}
          <motion.div 
            className="absolute text-7xl z-20 pointer-events-none"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {product.category === 'Stik' ? '🎮' : product.category === 'Kaset' ? '💿' : '🛸'}
          </motion.div>
          
          {/* Label Kategori */}
          <div className="absolute top-4 left-4 z-30">
            <div className="glass px-3 py-1 rounded-full border-blue-500/20 shadow-xl">
              <span className="text-[9px] font-black text-blue-300 uppercase tracking-[0.2em]">
                {product.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Konten Detail Produk */}
      <div className="p-6 pt-2 relative z-10">
        <h3 className="text-xl font-black text-white mt-1 group-hover:text-blue-400 transition-colors duration-300 italic tracking-tighter">
          {product.name}
        </h3>
        
        <p className="text-[11px] text-gray-500 mt-2 line-clamp-2 leading-relaxed h-8 font-medium">
          {product.description || "Premium PlayStation gear. Jembrana Official warranty."}
        </p>
        
        <div className="mt-6 flex items-end justify-between gap-4">
          <div className="mb-1">
            <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Pricing</p>
            {/* Ditambahkan suppressHydrationWarning sebagai pengaman ekstra */}
            <p 
              suppressHydrationWarning
              className="text-2xl font-black text-white italic tracking-tighter"
            >
              Rp {new Intl.NumberFormat('de-DE').format(product.price)}
            </p>
          </div>
          
          <motion.button 
            onClick={() => addToCart(product)}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "#2563eb", 
              color: "#ffffff",
              boxShadow: "0 0 20px rgba(37,99,235,0.4)"
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="h-14 w-14 bg-white/5 backdrop-blur-md text-blue-400 rounded-3xl flex items-center justify-center border border-white/10 group/btn transition-all"
          >
            <Plus className="h-6 w-6 stroke-[3] group-hover/btn:rotate-90 transition-transform duration-300" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
