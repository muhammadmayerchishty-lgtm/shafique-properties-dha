import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, MessageCircle, Building2, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppLink, getTelLink } from '../data/business';

export const ContactSection: React.FC = () => {
  // Google Maps search URLs for both addresses
  const mapsUrlPrimary = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'F-38/1 Basement, Phase 1, DHA Lahore, Pakistan'
  )}`;
  
  const mapsUrlAlternate = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    '42 Block, Sector F, DHA Phase 1, Lahore, Pakistan'
  )}`;

  return (
    <section id="contact" className="py-24 bg-[#F7FAFC] text-[#0F1720] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-[#0096C7] text-xs font-bold tracking-wide uppercase mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Head Office & Locations</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Contact & Office Directions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Conveniently situated in DHA Phase 1, Lahore. Visit our office for document verification, market discussions, or direct owner negotiations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Office Details & Directions Buttons */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Address Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:border-[#0096C7]/40 transition-colors">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0096C7]/10 flex items-center justify-center text-[#0096C7] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0096C7]">
                    Primary Registered Office
                  </span>
                  <h3 className="font-heading font-bold text-lg text-slate-900 mt-0.5">
                    {BUSINESS_INFO.address}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Phase 1 Commercial / Sector F, DHA Lahore
                  </p>
                </div>
              </div>

              {/* Get Directions Button for Primary */}
              <a
                href={mapsUrlPrimary}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] w-full py-2.5 px-4 bg-slate-900 hover:bg-[#0096C7] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions (F-38/1 Basement)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            {/* Alternate Google Address Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:border-[#7AC143]/40 transition-colors">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#7AC143]/15 flex items-center justify-center text-[#7AC143] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Alternate Listed on Google
                    </span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                      To be confirmed
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-slate-900 mt-1">
                    {BUSINESS_INFO.alternateAddress}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    DHA Phase 1, Lahore, Punjab, Pakistan
                  </p>
                </div>
              </div>

              {/* Get Directions Button for Alternate */}
              <a
                href={mapsUrlAlternate}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5 text-[#7AC143]" />
                <span>Get Directions (42 Block, Sector F)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            {/* Tap-To-Call Phone & Hours Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#7AC143] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Direct Phone (Tap to Call)
                  </span>
                  <a 
                    href={getTelLink()}
                    className="block font-heading font-bold text-lg text-slate-900 hover:text-[#0096C7] transition-colors mt-0.5"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                  <span className="text-xs text-slate-500">Contact: {BUSINESS_INFO.contact}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Office Hours
                  </span>
                  <div className="font-semibold text-sm text-slate-800 mt-0.5">
                    {BUSINESS_INFO.hours}
                  </div>
                  <span className="text-xs text-slate-500">Sundays open by advance appointment only</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] w-full py-3 px-4 bg-[#7AC143] hover:bg-[#6cb337] text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Start WhatsApp Conversation</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Stylized SVG Map Block */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-slate-800 relative overflow-hidden flex flex-col justify-between">
            
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-[#0096C7] uppercase tracking-wider">
                  DHA Lahore Cartography
                </span>
                <h4 className="font-heading font-bold text-lg text-white">
                  Sector F · Phase 1 Landmark Map
                </h4>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-[#7AC143] animate-pulse" />
                <span>Office Active</span>
              </div>
            </div>

            {/* SVG Vector Map Container */}
            <div className="relative w-full aspect-[16/10] bg-[#0F1720] rounded-2xl overflow-hidden border border-slate-800 shadow-inner my-2">
              <svg 
                viewBox="0 0 800 500" 
                className="w-full h-full select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Grid pattern */}
                  <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" strokeWidth="0.8" opacity="0.4" />
                  </pattern>
                  {/* Pin Glow */}
                  <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0096C7" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0096C7" stopOpacity="0" />
                  </radialGradient>
                  {/* Green Glow */}
                  <radialGradient id="greenGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#7AC143" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#7AC143" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Background Grid */}
                <rect width="800" height="500" fill="#0F1720" />
                <rect width="800" height="500" fill="url(#mapGrid)" />

                {/* Major Arterial Roads */}
                {/* Lahore Ring Road (L-20 curve) */}
                <path d="M -20 180 Q 250 150 450 60 T 820 20" fill="none" stroke="#334155" strokeWidth="16" opacity="0.7" />
                <path d="M -20 180 Q 250 150 450 60 T 820 20" fill="none" stroke="#64748B" strokeWidth="3" strokeDasharray="8 6" />

                {/* Main Boulevard DHA Phase 1 */}
                <path d="M 120 480 L 380 40 L 440 20" fill="none" stroke="#1E3A8A" strokeWidth="12" opacity="0.9" />
                <path d="M 120 480 L 380 40 L 440 20" fill="none" stroke="#0096C7" strokeWidth="2" />

                {/* Ghazi Road arterial */}
                <path d="M 40 280 L 760 320" fill="none" stroke="#334155" strokeWidth="10" opacity="0.8" />
                <path d="M 40 280 L 760 320" fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="6 6" />

                {/* Bedian Road connection */}
                <path d="M 680 40 L 520 480" fill="none" stroke="#1E293B" strokeWidth="8" />

                {/* Sector Blocks */}
                {/* Sector F (Where Office is located) */}
                <rect x="260" y="160" width="180" height="110" rx="8" fill="#0096C7" fillOpacity="0.12" stroke="#0096C7" strokeWidth="1.5" strokeDasharray="4 3" />
                <text x="275" y="185" fill="#38BDF8" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
                  SECTOR F (Phase 1)
                </text>

                {/* Sector H Commercial */}
                <rect x="460" y="160" width="160" height="110" rx="8" fill="#1E293B" fillOpacity="0.5" stroke="#475569" strokeWidth="1" />
                <text x="475" y="185" fill="#94A3B8" fontSize="11" fontWeight="600" fontFamily="sans-serif">
                  SECTOR H COMMERCIAL
                </text>

                {/* Sector G */}
                <rect x="260" y="290" width="180" height="90" rx="8" fill="#1E293B" fillOpacity="0.4" stroke="#475569" strokeWidth="1" />
                <text x="275" y="315" fill="#64748B" fontSize="11" fontWeight="600" fontFamily="sans-serif">
                  SECTOR G
                </text>

                {/* Sector J & K */}
                <rect x="460" y="290" width="160" height="90" rx="8" fill="#1E293B" fillOpacity="0.4" stroke="#475569" strokeWidth="1" />
                <text x="475" y="315" fill="#64748B" fontSize="11" fontWeight="600" fontFamily="sans-serif">
                  SECTOR J
                </text>

                {/* DHA Central Park / Green Zone */}
                <circle cx="210" cy="220" r="45" fill="#7AC143" fillOpacity="0.15" stroke="#7AC143" strokeWidth="1" />
                <text x="180" y="224" fill="#86EFAC" fontSize="10" fontWeight="600" fontFamily="sans-serif">
                  Phase 1 Park
                </text>

                {/* Road Labels */}
                <text x="80" y="450" fill="#94A3B8" fontSize="11" fontWeight="600" transform="rotate(-62 80 450)" fontFamily="sans-serif">
                  MAIN BOULEVARD DHA
                </text>
                <text x="480" y="340" fill="#94A3B8" fontSize="10" fontWeight="600" fontFamily="sans-serif">
                  GHAZI ROAD &rarr;
                </text>
                <text x="350" y="45" fill="#CBD5E1" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  LAHORE RING ROAD (L-20)
                </text>

                {/* Pin 1: Primary Office Location (F-38/1 Basement) */}
                <circle cx="340" cy="215" r="26" fill="url(#pinGlow)" />
                <circle cx="340" cy="215" r="8" fill="#0096C7" stroke="#FFFFFF" strokeWidth="2.5" />
                
                {/* Pin Tooltip */}
                <rect x="290" y="235" width="160" height="34" rx="6" fill="#0F1720" stroke="#0096C7" strokeWidth="1" />
                <text x="300" y="250" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                  SHAFIQUE PROPERTIES
                </text>
                <text x="300" y="262" fill="#7AC143" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">
                  F-38/1 Basement, Phase 1
                </text>

                {/* Pin 2: Alternate 42 Block Sector F Location */}
                <circle cx="410" cy="190" r="18" fill="url(#greenGlow)" />
                <circle cx="410" cy="190" r="6" fill="#7AC143" stroke="#FFFFFF" strokeWidth="2" />
                <text x="420" y="194" fill="#FFEB12" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                  42 Block (Alt)
                </text>

                {/* Compass Rose */}
                <g transform="translate(730, 80)">
                  <circle cx="0" cy="0" r="18" fill="#1E293B" stroke="#475569" strokeWidth="1" />
                  <polygon points="0,-14 4,-3 0,0 -4,-3" fill="#EF4444" />
                  <polygon points="0,14 4,3 0,0 -4,3" fill="#94A3B8" />
                  <text x="-4" y="-18" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">N</text>
                </g>
              </svg>
            </div>

            {/* Map Legend Footer */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0096C7]" />
                  <strong className="text-slate-200">Primary:</strong> F-38/1 Basement
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7AC143]" />
                  <strong className="text-slate-200">Alternate:</strong> 42 Block Sector F
                </span>
              </div>

              <span className="text-[11px] text-slate-500">
                5 mins from Ring Road DHA Interchange
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
