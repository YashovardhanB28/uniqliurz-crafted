import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';

const PHONE_NUMBER = '+1 551 229 7949';
const INSTAGRAM_URL = 'https://www.instagram.com/uniq_li_urz?igsh=dDF2dG9teHNudHFw';
const FACEBOOK_URL = 'https://www.facebook.com/share/175gMpFb8u/?mibextid=wwXIfr';

const quickLinks = [
  { name: 'Shop', href: '/shop' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Custom Order', href: '/customize' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">
                UNI<span className="text-[#F26522]">Q</span>LIURZ
              </span>
            </Link>
            <p className="text-white/50 max-w-md mb-6 text-sm leading-relaxed">
              Where Every Creation Tells a Story. Thoughtfully curated hampers, keepsakes, and branded pieces that feel personal, polished, and impossible to forget.
            </p>
            <div className="flex gap-4">
              <a 
                href={INSTAGRAM_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#F26522] hover:text-[#F26522] transition-colors text-white/50"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={FACEBOOK_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#F26522] hover:text-[#F26522] transition-colors text-white/50"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs tracking-[0.18em] uppercase text-white/50 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-white/60 hover:text-[#F26522] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs tracking-[0.18em] uppercase text-white/50 mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="hover:text-[#F26522] transition-colors">{PHONE_NUMBER}</a></li>
              <li><a href="https://wa.me/15512297949" target="_blank" rel="noopener noreferrer" className="hover:text-[#F26522] transition-colors">WhatsApp</a></li>
              <li><span>New Jersey, USA</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs tracking-[0.16em] uppercase text-white/30">
            © {new Date().getFullYear()} Uniqliurz LLC · New Jersey, USA · All rights reserved
          </p>
          <a href="#top" className="text-xs tracking-[0.16em] uppercase text-[#F26522] hover:text-[#FF7A2F] transition-colors">
            ↑ Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
