import React from 'react';
import { Phone, MessageCircle, MapPin, CheckCircle2, Building, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppLink, getTelLink } from '../data/business';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#F7FAFC] text-[#0F1720] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story & Narrative */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-[#0096C7] text-xs font-bold tracking-wide uppercase mb-4">
              <span>Local DHA Lahore Team</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-6">
              A Trusted Local Agency in DHA Lahore
            </h2>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                <strong className="text-slate-900">SHAFIQUE PROPERTIES</strong> is a boutique real estate consultancy headquartered in Phase 1, Defence Housing Authority (DHA) Lahore. With Naveed Shafique as our principal contact, we provide a hands-on, highly personalized approach to property buying, selling, and leasing.
              </p>
              <p>
                Unlike distant corporate agencies, our team is physically on the ground every day in DHA Lahore. We know every sector from Phase 1 to Phase 8—its development progress, price history, ground reality, and true commercial potential.
              </p>
              <p>
                We believe trust is earned through transparency. Every file and deed we handle is verified through official DHA Head Office channels, providing complete peace of mind to domestic buyers and overseas Pakistanis worldwide.
              </p>
            </div>

            {/* Core Values checklist */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7AC143] shrink-0" />
                <span>Physical office in DHA Phase 1</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7AC143] shrink-0" />
                <span>Direct consultation with Naveed</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7AC143] shrink-0" />
                <span>Transparent commission structure</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7AC143] shrink-0" />
                <span>100% legal NDC verification</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#7AC143] hover:bg-[#6cb337] text-slate-950 font-bold text-sm shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat with Naveed</span>
              </a>

              <a
                href={getTelLink()}
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-semibold text-sm transition-all shadow-xs"
              >
                <Phone className="w-4 h-4 text-[#0096C7]" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Naveed Shafique Profile Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0096C7]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0096C7] via-[#0F1720] to-[#7AC143] p-0.5 shadow-md shrink-0">
                  <div className="w-full h-full bg-[#0F1720] rounded-[14px] flex items-center justify-center font-heading font-extrabold text-xl text-white">
                    NS
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-extrabold text-xl text-slate-900">
                    {BUSINESS_INFO.contact}
                  </h3>
                  <p className="text-xs font-semibold text-[#0096C7] mt-0.5">
                    Managing Principal & Founder
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Shafique Properties DHA Lahore
                  </p>
                </div>
              </div>

              {/* Direct Details */}
              <div className="space-y-3.5 text-xs text-slate-600 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#7AC143] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Registered DHA Office:</span>
                    <span>{BUSINESS_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#0096C7] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Direct Mobile:</span>
                    <a href={getTelLink()} className="text-slate-800 hover:text-[#0096C7] font-semibold">
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#0096C7] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">DHA Authority Status:</span>
                    <span>Active consultant across all Lahore phases</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
                "Our commitment is simple: complete document clarity, fair market pricing, and continuous support even after the keys are in your hand."
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
