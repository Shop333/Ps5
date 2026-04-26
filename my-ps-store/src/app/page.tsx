import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/layout/Hero';
import ProductList from '@/components/product/ProductList';
import Footer from '@/components/layout/Footer';
import CartSummary from '@/components/cart/CartSummary'; // WAJIB: Supaya keranjang muncul

async function getProducts() {
  // Menggunakan cache ISR agar performa load 17 produk sekencang kilat
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products`, { 
    next: { revalidate: 60 } 
  });
  
  if (!res.ok) return []; // Fallback agar page tidak crash jika API offline
 
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen relative bg-mesh">
      
      {/* Overlay tetap di atas semua konten */}
      <Navbar />
      
      {/* Efek visual pembuka */}
      <Hero />

      {/* Grid Produk Utama */}
      <section id="catalog" className="max-w-7xl mx-auto p-6 sm:p-12 relative z-10 pb-40">
        
        {/* Header Katalog dengan styling premium */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/5 pb-10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-blue-500 rounded-full" />
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">
                Exclusive Inventory
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white italic">
              LATEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">RELEASES</span>
            </h2>
          </div>
          
          <div className="glass px-6 py-3 rounded-2xl border-white/5">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              Available <span className="text-white ml-2">{products.length} Items</span>
            </p>
          </div>
        </div>

        {/* List Produk dengan 17 data dari MongoDB */}
        <ProductList initialProducts={products} />

      </section>

      {/* Floating UI: Muncul otomatis saat user menambah barang */}
      <CartSummary />

      <Footer />

      {/* Decorative Aura tambahan untuk kedalaman visual */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,114,206,0.03)_0%,transparent_70%)] pointer-events-none z-0" />
      
    </main>
  );
}
