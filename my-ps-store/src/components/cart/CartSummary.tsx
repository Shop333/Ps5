'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import PaymentModal from './PaymentModal'; // Import modal yang tadi dibuat

export default function CartSummary() {
  const { cart, totalPrice } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Jika keranjang kosong, sembunyikan summary dengan animasi exit
  if (cart.length === 0) return null;

  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[90] w-[92%] max-w-md"
      >
        <div className="glass rounded-[2.5rem] p-4 flex items-center justify-between border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          
          {/* Detail Belanja */}
          <div className="flex items-center gap-4 ml-2">
            <div className="relative">
              <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center">
                <ShoppingBag className="text-blue-400 w-6 h-6" />
              </div>
              <motion.span 
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                key={cart.length} // Animasi bounce tiap barang nambah
                className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black h-6 w-6 rounded-full flex items-center justify-center shadow-lg"
              >
                {cart.length}
              </motion.span>
            </div>
            
            <div>
              <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] mb-0.5">Subtotal</p>
              <p className="text-xl font-black text-white italic tracking-tighter leading-none">
                Rp {totalPrice.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          {/* Tombol Checkout ke Modal */}
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 25px rgba(37,99,235,0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)} // Buka modal di sini
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-[1.8rem] flex items-center gap-3 group transition-all"
          >
            <span className="text-[11px] font-black uppercase tracking-tighter">Checkout</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[3]" />
          </motion.button>
        </div>
      </motion.div>

      {/* Tampilkan Modal Pembayaran */}
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
