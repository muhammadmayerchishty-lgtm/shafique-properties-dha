import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Bed, Bath, Maximize2, MapPin, Check, MessageCircle, Calendar, ShieldCheck, Tag } from 'lucide-react';
import { Property } from '../data/properties';
import { SafeImage } from './SafeImage';
import { getWhatsAppLink } from '../data/business';

interface PropertyModalProps {
  property: Property | null;
  allProperties: Property[];
  onClose: () => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  allProperties,
  onClose,
  onSelectProperty,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image index when selected property changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [property?.id]);

  const handlePrevImage = useCallback(() => {
    if (!property) return;
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : property.images.length - 1));
  }, [property]);

  const handleNextImage = useCallback(() => {
    if (!property) return;
    setActiveImageIndex((prev) => (prev < property.images.length - 1 ? prev + 1 : 0));
  }, [property]);

  // Arrow key and Escape keyboard navigation
  useEffect(() => {
    if (!property) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [property, onClose, handlePrevImage, handleNextImage]);

  if (!property) return null;

  // Similar properties: matching type or phase, excluding current
  const similarProperties = allProperties
    .filter((p) => p.id !== property.id && (p.type === property.type || p.phase === property.phase))
    .slice(0, 3);

  const visitWhatsAppUrl = getWhatsAppLink(
    `Hello Naveed, I would like to book a physical visit to inspect '${property.title}' (${property.location}) listed at ${property.price}. What days/times are available?`
  );

  const inquiryWhatsAppUrl = getWhatsAppLink(
    `Hello Naveed, I am interested in '${property.title}' in ${property.phase} (${property.price}). Could you please send me the official file / document details?`
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]"
      >
        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          
          {/* Gallery Header */}
          <div className="relative bg-slate-950 group">
            {/* Main Image with SafeImage */}
            <div className="relative w-full aspect-[16/10] max-h-[460px] overflow-hidden">
              <SafeImage
                src={property.images[activeImageIndex] || property.images[0]}
                alt={`${property.title} - View ${activeImageIndex + 1}`}
                fallbackTitle={property.title}
                aspectRatioClass="aspect-[16/10]"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all cursor-pointer backdrop-blur-md"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gallery Navigation Arrows */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  type="button"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white transition-all cursor-pointer backdrop-blur-xs"
                  aria-label="Previous photo (Left Arrow)"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  type="button"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white transition-all cursor-pointer backdrop-blur-xs"
                  aria-label="Next photo (Right Arrow)"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Price & Tag Overlay on Gallery */}
            <div className="absolute bottom-4 inset-x-6 z-10 flex flex-wrap items-end justify-between gap-3 pointer-events-none">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-[#0096C7] text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    For {property.purpose} · {property.phase}
                  </span>
                  <span className="bg-[#FFEB12] text-slate-950 text-xs font-extrabold px-2 py-1 rounded-md uppercase">
                    Sample Listing
                  </span>
                </div>
                <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white drop-shadow-md">
                  {property.price}
                </div>
              </div>

              <div className="text-xs text-white/90 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg font-medium">
                Image {activeImageIndex + 1} of {property.images.length} (Use &larr; &rarr; keys)
              </div>
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="bg-slate-100 p-3 flex items-center gap-3 overflow-x-auto border-b border-slate-200">
            {property.images.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-[#0096C7] scale-102 shadow-md ring-2 ring-[#0096C7]/30'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <SafeImage
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  fallbackTitle={`${property.title} #${idx + 1}`}
                  aspectRatioClass="aspect-[16/10]"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Header / Title */}
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <MapPin className="w-4 h-4 text-[#0096C7]" />
                <span>{property.location}</span>
                <span>·</span>
                <span className="font-semibold text-slate-700">{property.type}</span>
              </div>

              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
                {property.title}
              </h2>
            </div>

            {/* Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="block text-[11px] font-semibold text-slate-400 uppercase">Size</span>
                <span className="font-bold text-slate-900 text-sm sm:text-base">{property.size}</span>
              </div>
              <div>
                <span className="block text-[11px] font-semibold text-slate-400 uppercase">Phase</span>
                <span className="font-bold text-slate-900 text-sm sm:text-base">{property.phase}</span>
              </div>
              {property.bedrooms !== undefined && property.bedrooms > 0 && (
                <div>
                  <span className="block text-[11px] font-semibold text-slate-400 uppercase">Bedrooms</span>
                  <span className="font-bold text-slate-900 text-sm sm:text-base">{property.bedrooms} Beds</span>
                </div>
              )}
              {property.bathrooms !== undefined && property.bathrooms > 0 && (
                <div>
                  <span className="block text-[11px] font-semibold text-slate-400 uppercase">Bathrooms</span>
                  <span className="font-bold text-slate-900 text-sm sm:text-base">{property.bathrooms} Baths</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900 mb-2">
                Property Overview
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities List (Labelled Sample) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-base text-slate-900">
                  Key Amenities & Specifications
                </h3>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  Sample List
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-[#7AC143]/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#7AC143]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Book a Visit & WhatsApp (min-h 44px) */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={visitWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] py-3.5 px-6 rounded-xl bg-[#0096C7] hover:bg-[#0083ad] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Visit</span>
              </a>

              <a
                href={inquiryWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] py-3.5 px-6 rounded-xl bg-[#7AC143] hover:bg-[#6cb337] text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>

            {/* Similar Properties Row */}
            {similarProperties.length > 0 && (
              <div className="pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-heading font-bold text-base text-slate-900">
                    Similar Properties in DHA Lahore
                  </h4>
                  <span className="text-xs text-slate-500">Related listings</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similarProperties.map((sim) => (
                    <div
                      key={sim.id}
                      onClick={() => onSelectProperty(sim)}
                      className="group p-2.5 rounded-xl border border-slate-200 hover:border-[#0096C7] hover:shadow-md transition-all cursor-pointer bg-white"
                    >
                      <div className="h-24 rounded-lg overflow-hidden mb-2">
                        <SafeImage
                          src={sim.images[0]}
                          alt={sim.title}
                          fallbackTitle={sim.title}
                          aspectRatioClass="aspect-[16/10]"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-[#0096C7]">
                        {sim.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {sim.phase} · {sim.size}
                      </div>
                      <div className="text-xs font-bold text-[#0096C7] mt-1">
                        {sim.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
