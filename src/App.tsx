import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero, SearchFilterState } from './components/Hero';
import { PropertiesSection } from './components/PropertiesSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { AboutSection } from './components/AboutSection';
import { BookVisitSection } from './components/BookVisitSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from './data/business';

const MainView: React.FC = () => {
  const [activeSearchFilter, setActiveSearchFilter] = useState<SearchFilterState | null>(null);

  const handleHeroSearch = (filters: SearchFilterState) => {
    setActiveSearchFilter(filters);
    const propertiesElem = document.getElementById('properties');
    if (propertiesElem) {
      propertiesElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreProperties = () => {
    const propertiesElem = document.getElementById('properties');
    if (propertiesElem) {
      propertiesElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSectionNavigate = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7FAFC] text-[#0F1720] overflow-x-hidden w-full">
      <Header onNavigate={handleSectionNavigate} />
      
      <main className="flex-1 w-full overflow-x-hidden">
        <Hero 
          onSearch={handleHeroSearch} 
          onExploreProperties={handleExploreProperties} 
        />
        <PropertiesSection initialFilter={activeSearchFilter} />
        <ServicesSection />
        <WhyChooseUsSection />
        <AboutSection />
        <BookVisitSection />
        <ContactSection />
      </main>

      <Footer onNavigate={handleSectionNavigate} />

      {/* Floating WhatsApp Button on Every Page (min-h 48px) */}
      <aside aria-label="Quick WhatsApp Contact" className="fixed bottom-6 right-6 z-40">
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="group min-h-[48px] flex items-center gap-2.5 bg-[#7AC143] hover:bg-[#6cb337] active:scale-95 text-slate-950 font-bold px-4 py-3 rounded-full shadow-2xl hover:shadow-[#7AC143]/30 transition-all duration-200 border border-slate-950/10 cursor-pointer"
          title="Direct WhatsApp with Naveed Shafique"
        >
          <div className="relative flex items-center justify-center">
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-700 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-800 rounded-full" />
          </div>
          <span className="text-xs uppercase tracking-wider font-extrabold pr-0.5">
            Chat on WhatsApp
          </span>
        </a>
      </aside>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="*" element={<MainView />} />
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  );
}
