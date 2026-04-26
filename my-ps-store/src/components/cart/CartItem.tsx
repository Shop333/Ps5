'use client';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartItem({ item }: any) {
  const { addToCart, removeFromCart, updateQty } = useCart(); // Pastikan updateQty ada di Context

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center gap-4 p-4 glass rounded-[2rem] border-white/5 mb-3 group transition-all hover:border-white/10"
    >
      {/* Icon/Image Placeholder */}
      <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center text-3xl border border-white/5 shadow-inner">
        {item.category === 'Stik' ? '🎮' : '💿'}
      </div>

      {/* Item Info */}
      <div className="flex-1">
        <h4 className="text-sm font-black text-white italic truncate tracking-tight">
          {item.name}
        </h4>
        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">
          Rp {item.price.toLocaleString('id-ID')}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3 bg-black/40 p-1.5 rounded-2xl border border-white/5">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => item.qty > 1 ? addToCart({...item, qty: -1}) : removeFromCart(item._id)}
          className="p-1 hover:text-white text-gray-500 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </motion.button>
        
        <span className="text-xs font-black text-white w-4 text-center">
          {item.qty}
        </span>

        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => addToCart(item)}
          className="p-1 hover:text-white text-gray-500 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Delete Button */}
      <motion.button
        whileHover={{ color: '#ef4444' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => removeFromCart(item._id)}
        className="p-2 text-gray-600 transition-colors"
      >
        <Trash2 className="w-5 h-5 stroke-[2.5]" />
      </motion.button>
    </motion.div>
  );
}
