import React from 'react';
import { ShoppingBag, Tag, Key, Calculator, FileCheck2, TrendingUp, ArrowRight, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../data/business';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      id: 'buy',
      title: 'Property Acquisition (Buy)',
      icon: ShoppingBag,
      desc: 'Expert representation for purchasing residential bungalows, commercial plots, and investment files across DHA Phases 1 to 8.',
      tag: 'To be confirmed',
    },
    {
      id: 'sell',
      title: 'Listing & Sales (Sell)',
      icon: Tag,
      desc: 'Targeted marketing to genuine domestic buyers and overseas Pakistani investors for maximum market value and prompt closure.',
      tag: 'To be confirmed',
    },
    {
      id: 'rent',
      title: 'Rental & Leasing (Rent)',
      icon: Key,
      desc: 'Connecting vetted corporate, executive, and diplomat tenants with luxury furnished and unfurnished residences across DHA Lahore.',
      tag: 'To be confirmed',
    },
    {
      id: 'valuation',
      title: 'Property Valuation',
      icon: Calculator,
      desc: 'Accurate, unbiased market price assessments based on recent sector sales, plot location, facing advantages, and construction quality.',
      tag: 'To be confirmed',
    },
    {
      id: 'documentation',
      title: 'Documentation Support',
      icon: FileCheck2,
      desc: 'End-to-end management of DHA verification, NDC (No Demand Certificate), allotment letters, transfer letters, and legal tax compliance.',
      tag: 'To be confirmed',
    },
    {
      id: 'investment',
      title: 'Investment Advice',
      icon: TrendingUp,
      desc: 'Strategic capital allocation advice focusing on high-growth files, upcoming commercial nodes, and long-term rental yield assets.',
      tag: 'To be confirmed',
    },
  ];

  return (
    <section id="services" className="py-24 bg-white text-[#0F1720] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#0096C7] text-xs font-bold tracking-wide uppercase mb-3">
            <span>Specialized Agency Practice</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500 font-medium">Sample Offerings</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Comprehensive Real Estate Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Tailored property solutions for residents and overseas Pakistanis looking to transact with absolute transparency in Defence Housing Authority Lahore.
          </p>
        </div>

        {/* 6 Sample Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item) => {
            const Icon = item.icon;
            const waUrl = getWhatsAppLink(
              `Hello Naveed, I would like to inquire about your '${item.title}' service in DHA Lahore.`
            );

            return (
              <div
                key={item.id}
                className="group relative bg-[#F7FAFC] rounded-2xl p-7 border border-slate-200/90 hover:border-[#0096C7]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon and "To be confirmed" Badge */}
                  <div className="flex items-start justify-between gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-[#0096C7] group-hover:bg-[#0096C7] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Mandatory Label "to be confirmed" */}
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 border border-amber-200 px-2.5 py-1 rounded-md tracking-wide">
                      Sample · {item.tag}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-slate-900 group-hover:text-[#0096C7] transition-colors mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-bold text-[#0096C7] hover:text-[#007ba3] transition-colors"
                  >
                    <span>Consult on {item.title.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-[#7AC143] hover:text-slate-950 transition-colors"
                    title="WhatsApp Inquiry"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
