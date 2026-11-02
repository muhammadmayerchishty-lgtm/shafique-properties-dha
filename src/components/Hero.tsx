import React, { useRef, useState, Suspense } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Search, MapPin, PhoneCall, ArrowRight, ShieldCheck, CheckCircle2, MessageCircle, Box, Image as ImageIcon } from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppLink } from '../data/business';
import { DHA_PHASE_OPTIONS, PROPERTY_TYPE_OPTIONS, BUDGET_RANGES } from '../data/properties';
import { SafeImage } from './SafeImage';

// Lazy-load the Three.js 3D accent component
const Hero3DHouse = React.lazy(() => import('./Hero3DHouse'));

export interface SearchFilterState {
  purpose: 'Buy' | 'Rent';
  phase: string;
  type: string;
  budget: string;
}

interface HeroProps {
  onSearch: (filters: SearchFilterState) => void;
  onExploreProperties: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onExploreProperties }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Search state
  const [purpose, setPurpose] = useState<'Buy' | 'Rent'>('Buy');
  const [phase, setPhase] = useState<string>('All Phases');
  const [propertyType, setPropertyType] = useState<string>('All Types');
  const [budget, setBudget] = useState<string>('Any Budget');

  // Showcase view mode: '3d' or 'photo'
  const [showcaseMode, setShowcaseMode] = useState<'3d' | 'photo'>('3d');

  // Mouse 3D Parallax Tilt state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);
  const cardTranslateZ = useTransform(smoothMouseX, [-0.5, 0.5], [10, 25]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      purpose,
      phase,
      type: propertyType,
      budget,
    });
  };

  return (
    <section 
      id="top"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[94vh] flex flex-col justify-center bg-[#0F1720] overflow-x-hidden overflow-y-clip text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Hero Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <SafeImage
          src="/images/hero.jpg"
          alt="Luxury Modern House Exterior at Golden Hour - DHA Lahore"
          fallbackTitle="Shafique Properties DHA Lahore"
          aspectRatioClass="h-full w-full"
          className="h-full w-full object-cover scale-105"
        />
        {/* Measured dark gradient overlays for rich contrast and legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1720]/95 via-[#0F1720]/90 to-[#0F1720]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1720] via-transparent to-[#0F1720]/70" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center my-auto">
        
        {/* Left Column: Headlines & Trust Signals */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-slate-200 w-fit mb-5 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#7AC143] shrink-0" />
            <span className="truncate">Authorized DHA Lahore Consultants</span>
            <span className="text-white/40">·</span>
            <span className="text-[#0096C7] font-bold shrink-0">Phase 1 Office</span>
          </div>

          <h1 className="font-heading font-extrabold text-white text-[clamp(2.15rem,5.2vw,4.15rem)] leading-[1.08] tracking-tight text-balance mb-5">
            Find your place in <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#0096C7]">DHA Lahore.</span>
          </h1>

          <p className="text-slate-200 text-[clamp(0.95rem,1.8vw,1.2rem)] leading-relaxed max-w-2xl mb-8 drop-shadow-xs">
            Buy, sell and rent with a trusted local team. Verified files, premium plots, luxury designer bungalows, and prime commercial investments across DHA Lahore.
          </p>

          {/* Action Buttons (at least 44px min-h) */}
          <div className="flex flex-wrap items-center gap-3.5 mb-9">
            <button
              onClick={onExploreProperties}
              type="button"
              className="min-h-[44px] inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 rounded-xl bg-[#0096C7] hover:bg-[#0083ad] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#0096C7]/30 transition-all hover:translate-y-[-1px] active:translate-y-[0px] cursor-pointer"
            >
              <span>View Properties</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm sm:text-base backdrop-blur-md transition-all hover:border-white/40 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#7AC143]" />
              <span>Talk to Naveed</span>
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-5 border-t border-white/15 max-w-lg">
            <div>
              <div className="text-xl sm:text-3xl font-extrabold text-white font-heading">Phase 1-8</div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-1 font-medium">DHA Sectors</div>
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-extrabold text-white font-heading">100%</div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-1 font-medium">Verified Files</div>
            </div>
            <div>
              <div className="text-xl sm:text-3xl font-extrabold text-[#7AC143] font-heading">15+ Yrs</div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-1 font-medium">Local Expertise</div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Parallax Tilt Showcase Card with 3D House Accent */}
        <div className="lg:col-span-5 flex justify-center [perspective:1000px] w-full">
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="w-full max-w-md relative rounded-3xl p-1 bg-gradient-to-b from-white/25 via-white/10 to-white/0 shadow-2xl transition-shadow"
          >
            <div className="relative rounded-[22px] overflow-hidden bg-[#16202D]/95 border border-white/15 p-5 sm:p-6 flex flex-col backdrop-blur-md">
              
              {/* Header Mode Switcher (3D Model vs Photo) */}
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <span className="text-xs font-bold text-white tracking-wide">
                  {showcaseMode === '3d' ? 'Interactive 3D Emblem' : 'Featured Listing Preview'}
                </span>

                <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-lg border border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowcaseMode('3d')}
                    className={`min-h-[32px] px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      showcaseMode === '3d'
                        ? 'bg-[#0096C7] text-white shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>3D Accent</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowcaseMode('photo')}
                    className={`min-h-[32px] px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      showcaseMode === 'photo'
                        ? 'bg-[#0096C7] text-white shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Photo</span>
                  </button>
                </div>
              </div>

              {/* Showcase Container: Either 3D House or Photo */}
              <div className="relative rounded-xl overflow-hidden mb-5 bg-[#0F1720]/80 border border-white/10">
                {showcaseMode === '3d' ? (
                  <div className="relative h-[250px] flex items-center justify-center">
                    <Suspense
                      fallback={
                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                          <Box className="w-8 h-8 animate-spin text-[#0096C7]" />
                          <span className="text-xs">Loading 3D accent...</span>
                        </div>
                      }
                    >
                      <Hero3DHouse />
                    </Suspense>

                    {/* Overlay Tag */}
                    <div className="absolute top-3 left-3 bg-[#0F1720]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-white border border-white/15 pointer-events-none">
                      Logo Palette · Three.js
                    </div>

                    <div className="absolute bottom-3 inset-x-3 flex justify-between items-center text-[11px] text-slate-300 pointer-events-none bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
                      <span>Blue & Green Roof · Chimney</span>
                      <span className="text-[#FFEB12] font-semibold">Glowing Windows</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-[16/10]">
                    <SafeImage
                      src="/images/p1-1.jpg"
                      alt="DHA Phase 6 Ultra Modern Bungalow"
                      fallbackTitle="DHA Phase 6 Luxury Bungalow"
                      aspectRatioClass="aspect-[16/10]"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                    
                    <div className="absolute top-3 left-3 bg-[#0F1720]/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-white border border-white/15">
                      Featured in Phase 6
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      <div>
                        <span className="text-[11px] text-slate-300 block">Sector C · 1 Kanal</span>
                        <span className="text-base sm:text-lg font-bold text-white font-heading">PKR 8.75 Crore (Sample)</span>
                      </div>
                      <span className="bg-[#7AC143] text-slate-950 text-xs font-bold px-2 py-0.5 rounded">
                        Ready
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Consultant Card */}
              <motion.div 
                style={{ translateZ: cardTranslateZ }}
                className="bg-white/10 border border-white/15 rounded-xl p-3.5 sm:p-4 flex items-center justify-between gap-3 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0096C7] to-[#7AC143] flex items-center justify-center font-bold text-white text-sm shadow-md shrink-0">
                    NS
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{BUSINESS_INFO.contact}</span>
                      <CheckCircle2 className="w-4 h-4 text-[#7AC143] shrink-0" />
                    </div>
                    <div className="text-xs text-slate-300">Principal Consultant · DHA Lahore</div>
                  </div>
                </div>

                <a
                  href={getWhatsAppLink("Hello Naveed, I am interested in viewing available luxury residences in DHA Lahore.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 bg-[#7AC143] hover:bg-[#6cb337] active:scale-95 text-slate-950 rounded-xl transition-all cursor-pointer shadow-xs shrink-0"
                  title="Direct WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                </a>
              </motion.div>

              {/* Micro badge */}
              <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                <span className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#0096C7] shrink-0" />
                  <span className="truncate">F-38/1 Basement, Phase 1 DHA</span>
                </span>
                <span className="text-[#FFEB12] font-semibold shrink-0">8 Sample Listings</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Integrated Search Bar */}
      <div className="max-w-6xl mx-auto w-full relative z-20 mt-10 sm:mt-12">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-3 sm:p-4 border border-slate-200/90 text-slate-900 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center"
        >
          {/* Buy/Rent Segmented Control */}
          <div className="lg:col-span-3 flex bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setPurpose('Buy')}
              className={`min-h-[44px] flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                purpose === 'Buy'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Buy
            </button>
            <button
              type="button"
              onClick={() => setPurpose('Rent')}
              className={`min-h-[44px] flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                purpose === 'Rent'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Rent
            </button>
          </div>

          {/* Phase Selector */}
          <div className="lg:col-span-3 px-3 py-1.5 border border-slate-200 rounded-xl bg-slate-50/70 min-h-[44px] flex flex-col justify-center">
            <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
              DHA Phase
            </label>
            <select
              value={phase}
              onChange={(e) => setPhase(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
            >
              {DHA_PHASE_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div className="lg:col-span-3 px-3 py-1.5 border border-slate-200 rounded-xl bg-slate-50/70 min-h-[44px] flex flex-col justify-center">
            <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
              Property Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
            >
              {PROPERTY_TYPE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Search Trigger Button (at least 44px min-h) */}
          <div className="lg:col-span-3">
            <button
              type="submit"
              className="min-h-[44px] w-full py-3 px-5 bg-[#0096C7] hover:bg-[#0083ad] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#0096C7]/20 transition-all hover:shadow-lg cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search Properties</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
