import { Link } from 'react-router-dom';
import { Gift, Instagram, Facebook, Mail, Phone } from 'lucide-react';

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
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Gift className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-display font-bold">
                UNI<span className="text-primary">Q</span>LIURZ
              </span>
            </Link>
            <p className="text-secondary-foreground/70 max-w-md mb-6">
              Where Every Creation Tells a Story. Handcrafted luxury gifts, personalized perfectly for your special moments. Making smiles in USA only — coming worldwide soon!
            </p>
            <div className="flex gap-4">
              <a 
                href={INSTAGRAM_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={FACEBOOK_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <a 
              href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
              className="flex items-center gap-2 mt-4 text-secondary-foreground/70 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{PHONE_NUMBER}</span>
            </a>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.href} className="text-secondary-foreground/70 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-secondary-foreground/70 text-sm mb-4">Subscribe for exclusive offers</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="flex-1 px-4 py-2 bg-secondary-foreground/10 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-r-lg">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 text-center text-sm text-secondary-foreground/50">
          © 2026 UNIQLIURZ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}