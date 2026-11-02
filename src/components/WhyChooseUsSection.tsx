import React from 'react';
import { ShieldCheck, UserCheck, Globe2, Award, CheckCircle2 } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const glassCards = [
    {
      icon: UserCheck,
      title: 'Direct Principal Representation',
      desc: 'Work directly with Naveed Shafique throughout your transaction. No junior agents, no commission confusion, and complete personal accountability.',
      accent: '#0096C7',
    },
    {
      icon: ShieldCheck,
      title: '100% DHA Official Verification',
      desc: 'Every plot allotment, allocation letter, and NDC is verified directly at the DHA Lahore Main Head Office prior to any financial transaction.',
      accent: '#7AC143',
    },
    {
      icon: Globe2,
      title: 'Overseas Pakistani Concierge',
      desc: 'Dedicated end-to-end assistance for clients residing in the UK, USA, Gulf, and Canada, including live HD video tours and power of attorney guidance.',
      accent: '#FFEB12',
    },
    {
      icon: Award,
      title: 'Unrivalled DHA Sector Knowledge',
      desc: '15+ years of continuous presence in DHA Phase 1 ensures deep historical pricing knowledge, builder reputation insights, and off-market deal flow.',
      accent: '#0096C7',
    },
  ];

  const statStrip = [
    {
      number: '15+',
      label: 'Years in DHA Lahore',
      subtext: 'Local Experience',
    },
    {
      number: '500+',
      label: 'Verified Transactions',
      subtext: 'Residential & Commercial',
    },
    {
      number: '100%',
      label: 'NDC & Legal Clearance',
      subtext: 'Direct at DHA Head Office',
    },
    {
      number: '8',
      label: 'DHA Phases Active',
      subtext: 'Phases 1 through 8',
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-[#0F1720] text-white relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#0096C7]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#7AC143]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#7AC143] text-xs font-bold tracking-wide uppercase mb-3">
            <span>Client Assurance</span>
            <span className="text-white/30">·</span>
            <span className="text-slate-300 font-medium">Why Shafique Properties</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Why Transact With Our Team
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Real estate in DHA Lahore demands meticulous document scrutiny and localized expertise. We protect your hard-earned wealth with integrity.
          </p>
        </div>

        {/* 4 Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {glassCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl p-8 bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-xl border border-white/10 hover:border-white/25 shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-6 text-white group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" style={{ color: card.accent }} />
                  </div>

                  <h3 className="font-heading font-bold text-xl text-white mb-3">
                    {card.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-[#7AC143]" />
                  <span>DHA Lahore Standard of Excellence</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Count-Up / Stat Strip Labelled "Sample" */}
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-white/[0.07] via-white/[0.04] to-white/[0.07] backdrop-blur-2xl border border-white/15 shadow-2xl">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Agency Track Record & Impact
            </span>
            <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-[#FFEB12] text-slate-950 uppercase tracking-wider shadow-xs">
              Sample Metrics
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
            {statStrip.map((item, i) => (
              <div key={i} className="flex flex-col">
                <div className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight tabular-nums flex items-baseline justify-center sm:justify-start gap-1">
                  <span>{item.number}</span>
                  <span className="text-[11px] font-bold text-[#FFEB12] uppercase tracking-wider">
                    (Sample)
                  </span>
                </div>
                <div className="font-bold text-sm text-slate-200 mt-2">
                  {item.label}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {item.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
