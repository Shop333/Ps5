'use client';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

export default function ProductList({ initialProducts = [] }: any) {
  // Variasi animasi untuk container (untuk mengontrol stagger children)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Jeda 0.1 detik antar munculnya setiap kartu
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
    >
      {/* Jika data kosong, tampilkan placeholder */}
      {initialProducts.length === 0 ? (
        <div className="col-span-full text-center py-20 glass rounded-3xl border-white/5">
          <p className="text-gray-600 font-black tracking-widest text-xs uppercase italic">No Products Found</p>
        </div>
      ) : (
        // Map 17 produk yang sudah kamu input
        initialProducts.map((item: any) => (
          <ProductCard key={item._id} product={item} />
        ))
      )}
    </motion.div>
  );
}
