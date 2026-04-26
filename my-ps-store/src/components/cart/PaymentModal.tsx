'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { X, CreditCard, Bitcoin, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function PaymentModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cart, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = async (method: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          totalPrice: totalPrice,
          paymentMethod: method,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          const message = `Halo Admin, saya ingin konfirmasi pembayaran via ${method} sebesar Rp ${totalPrice.toLocaleString('id-ID')}`;
          window.open(`https://wa.me/6283867279174?text=${encodeURIComponent(message)}`, '_blank');
        }, 2000);
      }
    } catch (err) {
      console.error("Gagal buat order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md glass rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black italic tracking-tighter text-white">CHECKOUT</h2>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {!isSuccess ? (
                <>
                  <div className="bg-white/5 rounded-2xl p-4 mb-8 border border-white/5">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Final Amount</p>
                    <p className="text-3xl font-black text-white italic">Rp {totalPrice.toLocaleString('id-ID')}</p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Select Payment Method</p>
                    
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePayment('QRIS')}
                      disabled={loading}
                      className="w-full flex items-center justify-between p-5 rounded-[1.5rem] border border-white/5 glass transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                          <CreditCard className="text-blue-500 w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-white">QRIS / Transfer</p>
                          <p className="text-[10px] text-gray-500 font-medium tracking-tight">Otomatis (Jembrana Local)</p>
                        </div>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePayment('BTC')}
                      disabled={loading}
                      className="w-full flex items-center justify-between p-5 rounded-[1.5rem] border border-white/5 glass transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center">
                          <Bitcoin className="text-orange-500 w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-white">Bitcoin (Lightning)</p>
                          <p className="text-[10px] text-gray-500 font-medium tracking-tight">Global Crypto Payment</p>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-xl font-black text-white italic mb-2">ORDER SECURED!</h3>
                  <p className="text-gray-400 text-sm">Membuka WhatsApp untuk bukti bayar...</p>
                </motion.div>
              )}

              {loading && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-[3rem]">
                  <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
