import React from 'react';
import { Phone, MapPin, Clock, MessageCircle, Navigation, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppLink, getTelLink } from '../data/business';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    } else {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const mapsUrlPrimary = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'F-38/1 Basement, Phase 1, DHA Lahore, Pakistan'
  )}`;
  
  const mapsUrlAlternate = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    '42 Block, Sector F, DHA Phase 1, Lahore, Pakistan'
  )}`;

  return (
    <footer className="bg-[#0F1720] text-slate-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Logo & Agency identity */}
          <div className="lg:col-span-4">
            {/* Dark logo with aspect ratio preserved (Requirement 1) */}
            <div className="mb-5 inline-block">
              <img
                src="/images/logo-dark.png"
                alt="Shafique Properties"
                className="h-16 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mb-4">
              Premium real estate consultancy based in DHA Phase 1, Lahore. Specialists in residential bungalows, commercial investments, and 100% verified plot files across DHA Lahore.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-300 mb-4">
              <span className="text-slate-400">Principal Contact:</span>
              <strong className="text-white font-semibold">{BUSINESS_INFO.contact}</strong>
            </div>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7AC143] hover:bg-[#6cb337] text-slate-950 font-bold text-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp with Naveed</span>
            </a>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a 
                  href="#top" 
                  onClick={(e) => handleNavClick(e, 'top')} 
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#properties" 
                  onClick={(e) => handleNavClick(e, 'properties')} 
                  className="hover:text-white transition-colors"
                >
                  Properties (Sample)
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => handleNavClick(e, 'services')} 
                  className="hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#why-us" 
                  onClick={(e) => handleNavClick(e, 'why-us')} 
                  className="hover:text-white transition-colors"
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => handleNavClick(e, 'about')} 
                  className="hover:text-white transition-colors"
                >
                  About Team
                </a>
              </li>
              <li>
                <a 
                  href="#book-visit" 
                  onClick={(e) => handleNavClick(e, 'book-visit')} 
                  className="hover:text-white transition-colors"
                >
                  Book a Visit
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => handleNavClick(e, 'contact')} 
                  className="hover:text-white transition-colors"
                >
                  Contact & Map
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: DHA Sectors Covered */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-4">
              DHA Lahore Inventory
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-slate-200 transition-colors">Phase 1 (Office Headquarters)</li>
              <li className="hover:text-slate-200 transition-colors">Phase 2 (Townhouses & Plots)</li>
              <li className="hover:text-slate-200 transition-colors">Phase 3 (Y-Block Commercial)</li>
              <li className="hover:text-slate-200 transition-colors">Phase 4 (Sector CC & DD)</li>
              <li className="hover:text-slate-200 transition-colors">Phase 5 (Spanish Villas)</li>
              <li className="hover:text-slate-200 transition-colors">Phase 6 (Luxury Bungalows)</li>
              <li className="hover:text-slate-200 transition-colors">Phase 7 (Emerging Sectors)</li>
              <li className="hover:text-slate-200 transition-colors">Phase 8 (Executive Mansions)</li>
            </ul>
          </div>

          {/* Col 4: Contact, Addresses & Directions */}
          <div className="lg:col-span-4 space-y-4 text-xs text-slate-300">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-2">
              DHA Phase 1 Offices
            </h4>
            
            {/* Primary Address */}
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#0096C7] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Primary Office:</strong>
                <span>{BUSINESS_INFO.address}</span>
                <a
                  href={mapsUrlPrimary}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#0096C7] hover:underline mt-1 font-semibold"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Alternate Address */}
            <div className="flex items-start gap-2.5 pt-2 border-t border-white/5">
              <MapPin className="w-4 h-4 text-[#7AC143] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Alternate (Google):</strong>
                <span>{BUSINESS_INFO.alternateAddress} (to be confirmed)</span>
                <a
                  href={mapsUrlAlternate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#7AC143] hover:underline mt-1 font-semibold"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Phone & Hours */}
            <div className="flex items-center gap-2.5 pt-2 border-t border-white/5">
              <Phone className="w-4 h-4 text-[#0096C7] shrink-0" />
              <div>
                <span className="text-slate-400">Direct Phone: </span>
                <a href={getTelLink()} className="text-white font-bold hover:underline">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#FFEB12] shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400">Hours: </span>
                <span className="text-slate-200">{BUSINESS_INFO.hours}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Note & Attribution (Requirement 6) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved. {BUSINESS_INFO.city}.
          </div>

          {/* Explicit Note Requirement 6 */}
          <div className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-center sm:text-right font-medium text-slate-300">
            {BUSINESS_INFO.creator.note}
          </div>
        </div>

      </div>
    </footer>
  );
};
