'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Catalog', href: '#catalog' },
    { name: 'Orders', href: '#orders' },
    { name: 'Support', href: '#support' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled || isOpen
          ? 'py-3 px-4 sm:px-8' 
          : 'py-6 px-6 sm:px-12'
      }`}
    >
      <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 ${
        isScrolled || isOpen
          ? 'glass rounded-[2rem] px-6 py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] border-white/10' 
          : 'bg-transparent'
      }`}>
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] group-hover:rotate-12 transition-transform duration-300">
            <span className="text-white font-black text-xl italic">P</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black tracking-tighter text-lg leading-none italic">PS STORE</span>
            <span className="text-[8px] text-blue-400 font-bold uppercase tracking-[0.2em]">Jembrana</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-tighter hover:bg-blue-500 hover:text-white transition-all shadow-xl"
          >
            <span>Login</span>
            <LogIn size={14} strokeWidth={3} />
          </motion.button>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white md:hidden hover:bg-white/10 rounded-xl transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[calc(100%+10px)] left-4 right-4 md:hidden z-[101]"
          >
            <div className="glass rounded-[2.5rem] p-6 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="flex flex-col gap-4">
                {navLinks.map((item, i) => (
                  <motion.a
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-blue-600/20 transition-all group"
                  >
                    <span className="text-sm font-black text-white uppercase tracking-widest italic">{item.name}</span>
                    <ChevronRight size={16} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                ))}
                
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-full mt-2 bg-blue-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black uppercase text-xs tracking-tighter shadow-[0_10px_20px_rgba(37,99,235,0.3)]"
                >
                  <LogIn size={16} strokeWidth={3} />
                  <span>Account Login</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
