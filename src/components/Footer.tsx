import { Link } from 'react-router-dom';
import { Gift, Instagram, Facebook, Twitter, Mail } from 'lucide-react';

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
              <span className="text-2xl font-display font-bold">UNIQLIURZ</span>
            </Link>
            <p className="text-secondary-foreground/70 max-w-md mb-6">
              Where Every Creation Tells a Story. Handcrafted luxury gifts, personalized perfectly for your special moments.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Shop', 'About Us', 'Contact', 'FAQs'].map(link => (
                <li key={link}>
                  <Link to="#" className="text-secondary-foreground/70 hover:text-primary transition-colors">{link}</Link>
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
          © 2024 UNIQLIURZ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}