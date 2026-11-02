import React, { useState } from 'react';
import { MessageCircle, Menu, X, Phone, MapPin } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BUSINESS_INFO, getWhatsAppLink, getTelLink } from '../data/business';

interface HeaderProps {
  onNavigate?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#top' },
    { label: 'Properties', href: '#properties' },
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'About', href: '#about' },
    { label: 'Book Visit', href: '#book-visit' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    if (onNavigate) {
      onNavigate(targetId);
    } else {
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0F1720]/90 border-b border-white/10 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Zone: Logo in a crisp white rounded chip */}
          <a 
            href="#top" 
            onClick={(e) => handleLinkClick(e, '#top')}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="bg-white rounded-xl px-2.5 py-1.5 shadow-sm border border-slate-200/50 flex items-center justify-center transition-transform group-hover:scale-102">
              <img 
                src="/images/logo-color.png" 
                alt="Shafique Properties" 
                className="h-8 sm:h-9 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-white font-bold tracking-tight text-base sm:text-lg leading-none font-heading">
                SHAFIQUE
              </span>
              <span className="text-[#0096C7] font-semibold text-xs tracking-wider uppercase mt-0.5">
                PROPERTIES DHA
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="hover:text-white transition-colors duration-150 whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Zone: Green WhatsApp Pill & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center gap-2 bg-[#7AC143] hover:bg-[#6cb337] active:scale-98 text-slate-950 font-bold px-4 py-2 rounded-full text-xs sm:text-sm shadow-sm transition-all whitespace-nowrap cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-slate-950 fill-current" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="min-h-[44px] min-w-[44px] md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-[#0F1720] border-l border-white/10 z-50 p-6 flex flex-col justify-between md:hidden shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="bg-white rounded-lg p-1.5 inline-flex">
                    <img src="/images/logo-color.png" alt="Shafique Properties" className="h-7 w-auto object-contain" />
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-slate-400 hover:text-white rounded-md"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="py-6 flex flex-col gap-4">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="text-lg font-medium text-slate-200 hover:text-[#0096C7] transition-colors py-1"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

                <div className="pt-6 border-t border-white/10 flex flex-col gap-3 text-xs text-slate-400">
                <a
                  href={getTelLink()}
                  className="flex items-center gap-2 text-slate-300 hover:text-white"
                >
                  <Phone className="w-4 h-4 text-[#0096C7]" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
                <div className="flex items-start gap-2 text-slate-400">
                  <MapPin className="w-4 h-4 text-[#7AC143] shrink-0 mt-0.5" />
                  <span>{BUSINESS_INFO.address}</span>
                </div>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full text-center bg-[#7AC143] text-slate-950 font-bold py-2.5 rounded-xl hover:bg-[#6cb337] transition-colors"
                >
                  Chat with Naveed
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
