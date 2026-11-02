import React, { useState } from 'react';
import { Calendar, Clock, MessageCircle, CheckCircle2, Send, ShieldCheck, MapPin } from 'lucide-react';
import { BUSINESS_INFO, getWhatsAppLink } from '../data/business';

export const BookVisitSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: '1 Kanal Ultra-Modern Designer Bungalow (Phase 6)',
    preferredDate: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState<typeof formData | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.preferredDate) errs.preferredDate = 'Please select a preferred date';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    // Save in localStorage safely with try/catch
    try {
      const existing = localStorage.getItem('shafique_visit_requests');
      const list = existing ? JSON.parse(existing) : [];
      const newEntry = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('shafique_visit_requests', JSON.stringify([...list, newEntry]));
    } catch (err) {
      console.warn('Unable to store visit request in localStorage:', err);
    }

    setLastSubmittedData({ ...formData });
    setIsSuccess(true);
  };

  const getVisitWhatsAppUrl = () => {
    const data = lastSubmittedData || formData;
    const text = `Hello Naveed, I would like to confirm my visit booking:\n- Name: ${data.name}\n- Phone: ${data.phone}\n- Property Interest: ${data.interest}\n- Preferred Date: ${data.preferredDate || 'As soon as possible'}\n- Message: ${data.message || 'No additional notes'}`;
    return getWhatsAppLink(text);
  };

  // Min date for datepicker is today
  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="book-visit" className="py-24 bg-white text-[#0F1720] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Context & Guidelines */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#0096C7] text-xs font-bold tracking-wide uppercase mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Inspection</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
              Book a Private Property Visit
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Experience the luxury finishes, structural workmanship, and neighborhood ambiance of our featured DHA Lahore properties in person with Naveed Shafique.
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 mb-8">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#0096C7] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Accompanied Viewings</strong>
                  <span>Guided by our senior consultant with complete sector floor plans.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#7AC143] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">DHA Phase 1 Meeting Point</strong>
                  <span>Meet at our F-38/1 Phase 1 office or directly at the property site.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#0096C7] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Document Review on Site</strong>
                  <span>Inspect copy of original allotment letter, transfer papers, and approved map.</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7FAFC] border border-slate-200 text-xs text-slate-500">
              Visiting hours: Mon to Sat, 10:00 AM to 9:00 PM. Sunday closed.
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="lg:col-span-7 bg-[#F7FAFC] rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-lg">
            
            {isSuccess ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-[#7AC143]">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>

                <div>
                  <h3 className="font-heading font-extrabold text-2xl text-slate-900 mb-2">
                    Visit Request Registered!
                  </h3>
                  
                  {/* Mandatory Success Text */}
                  <div className="inline-block px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold mb-2">
                    Demo: request stored in this browser only
                  </div>

                  <p className="text-slate-600 text-sm max-w-md mx-auto mt-2">
                    Your viewing request for <strong className="text-slate-900">{lastSubmittedData?.interest}</strong> on <strong className="text-slate-900">{lastSubmittedData?.preferredDate}</strong> has been safely recorded.
                  </p>
                </div>

                {/* Mandatory "Also send on WhatsApp" button */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getVisitWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#7AC143] hover:bg-[#6cb337] text-slate-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Also send on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: '',
                        phone: '',
                        interest: '1 Kanal Ultra-Modern Designer Bungalow (Phase 6)',
                        preferredDate: '',
                        message: '',
                      });
                    }}
                    className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-xl text-sm border border-slate-300 transition-colors cursor-pointer"
                  >
                    Book Another Visit
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-heading font-bold text-xl text-slate-900 mb-1">
                    Book an In-Person Inspection
                  </h3>
                  <p className="text-xs text-slate-500">
                    Schedule a private showing at a convenient time for you and your family.
                  </p>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Asad Chaudhry"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`min-h-[44px] w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm focus:outline-none transition-all ${
                        errors.name ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 focus:border-[#0096C7]'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`min-h-[44px] w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm focus:outline-none transition-all ${
                        errors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 focus:border-[#0096C7]'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Interest Dropdown & Preferred Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Property Interest *
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="min-h-[44px] w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-[#0096C7] cursor-pointer"
                    >
                      <option value="1 Kanal Ultra-Modern Designer Bungalow (Phase 6)">
                        1 Kanal Modern Bungalow (Phase 6)
                      </option>
                      <option value="10 Marla Contemporary Spanish Villa (Phase 5)">
                        10 Marla Spanish Villa (Phase 5)
                      </option>
                      <option value="2 Kanal Executive Mansion with Pool (Phase 8)">
                        2 Kanal Mansion with Pool (Phase 8)
                      </option>
                      <option value="4 Marla Commercial Corporate Plaza (Phase 1)">
                        4 Marla Commercial Plaza (Phase 1)
                      </option>
                      <option value="1 Kanal Corner Residential Plot (Phase 7)">
                        1 Kanal Corner Plot (Phase 7)
                      </option>
                      <option value="1 Kanal Furnished Executive House for Rent (Phase 6)">
                        1 Kanal House for Rent (Phase 6)
                      </option>
                      <option value="10 Marla Modern Villa for Rent (Phase 5)">
                        10 Marla Villa for Rent (Phase 5)
                      </option>
                      <option value="5 Marla Luxury Townhouse Apartment (Phase 2)">
                        5 Marla Townhouse (Phase 2)
                      </option>
                      <option value="General DHA Portfolio Tour & Consultation">
                        General DHA Portfolio Consultation
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className={`min-h-[44px] w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm focus:outline-none transition-all cursor-pointer ${
                        errors.preferredDate ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 focus:border-[#0096C7]'
                      }`}
                    />
                    {errors.preferredDate && <p className="text-[11px] text-rose-500 mt-1">{errors.preferredDate}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Specific Questions or Time Preference
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Afternoon around 3:00 PM works best; bringing family..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0096C7] transition-all"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#0096C7] hover:bg-[#0083ad] text-white font-bold rounded-xl text-sm shadow-md shadow-[#0096C7]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Visit Request</span>
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2">
                    Demo application · Free booking without upfront obligations
                  </p>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
