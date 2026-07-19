import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ClipboardList } from 'lucide-react';
import { useEnquiryStore } from '@/stores/enquiryStore';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Shop', href: '/shop' },
  { name: 'Customize', href: '/customize' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const enquiryCount = useEnquiryStore(s => s.totalItems());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-white/5' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="text-lg md:text-xl tracking-[0.18em] uppercase text-white font-bold">
              UNI<span className="text-[#F26522]">Q</span>LIURZ
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-[11px] tracking-[0.18em] uppercase text-white/70 hover:text-[#F26522] transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/enquiry"
              className="relative flex items-center gap-1 text-[11px] tracking-[0.18em] uppercase text-white/70 hover:text-[#F26522] transition-colors duration-200"
            >
              <ClipboardList className="w-4 h-4" />
              Enquiry
              {enquiryCount > 0 && (
                <span className="px-1.5 py-0.5 bg-[#F26522] text-black text-[10px] font-bold rounded-full leading-none">
                  {enquiryCount}
                </span>
              )}
            </Link>
            <a
              href="https://wa.me/15512297949"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.16em] uppercase font-semibold px-4 py-2 bg-gradient-to-r from-[#D94F16] to-[#FF7A2F] text-black rounded-md hover:shadow-[0_0_15px_rgba(242,101,34,0.5)] transition-shadow duration-200"
            >
              WhatsApp Us
            </a>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/5"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-sm tracking-[0.18em] uppercase text-white/80 hover:text-[#F26522] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/enquiry"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm tracking-[0.18em] uppercase text-white/80 hover:text-[#F26522] transition-colors"
                >
                  <ClipboardList className="w-4 h-4" />
                  Enquiry List
                  {enquiryCount > 0 && (
                    <span className="px-2 py-0.5 bg-[#F26522] text-black text-[10px] font-bold rounded-full">
                      {enquiryCount}
                    </span>
                  )}
                </Link>
              </motion.div>
              <motion.a
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                href="https://wa.me/15512297949"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-center text-xs tracking-[0.16em] uppercase font-semibold px-6 py-3 bg-gradient-to-r from-[#D94F16] to-[#FF7A2F] text-black rounded-md"
              >
                WhatsApp Us
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
