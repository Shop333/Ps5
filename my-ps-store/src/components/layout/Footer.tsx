'use client';
import { motion } from 'framer-motion';
// Menggunakan ikon SHAPES & UI dasar yang PASTI ada di setiap versi Lucide
import { 
  MapPin, 
  ShieldCheck,
  Globe,
  MessageSquare,
  Zap,
  Circle
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 pb-12 px-6 overflow-hidden border-t border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pt-16 relative z-10">
        
        {/* Kolom 1: Brand */}
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <span className="text-white font-black italic text-sm text-center">P</span>
            </div>
            <span className="text-white font-black tracking-tighter text-lg italic uppercase">PS Store</span>
          </div>
          <div className="flex items-start gap-3 text-gray-500">
            <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
            <p className="text-[11px] leading-relaxed font-medium italic">
              Negara, Jembrana, Bali.<br />
              Premium Gaming Gear.
            </p>
          </div>
        </div>

        {/* Kolom 2: Navigation */}
        <div>
          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-6">Navigation</h4>
          <ul className="space-y-4 text-gray-500 text-[11px] font-bold uppercase tracking-tighter italic">
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Katalog</li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Syarat & Ketentuan</li>
          </ul>
        </div>

        {/* Kolom 3: Status */}
        <div>
          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-6">System</h4>
          <div className="glass p-4 rounded-2xl border-white/5 inline-flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span className="text-[10px] font-bold text-gray-300 tracking-tight">Verified Store</span>
            </div>
          </div>
        </div>

        {/* Kolom 4: Social - PAKE IKON UNIVERSAL */}
        <div>
          <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-6">Connect</h4>
          <div className="flex gap-4">
            {[
              { Icon: Globe, name: 'Web' },
              { Icon: MessageSquare, name: 'Chat' },
              { Icon: Zap, name: 'Fast' },
              { Icon: Circle, name: 'More' }
            ].map(({ Icon, name }) => (
              <motion.a
                key={name}
                whileHover={{ y: -5, color: '#3b82f6', borderColor: 'rgba(59,130,246,0.5)' }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-500 border border-white/5"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 opacity-30">
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
          © {currentYear} ACIK LUNG • JEMBRANA DIGITAL
        </p>
        <p className="text-[9px] font-black text-gray-600 uppercase tracking-tighter italic">
          High Performance Catalog
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
    </footer>
  );
}
