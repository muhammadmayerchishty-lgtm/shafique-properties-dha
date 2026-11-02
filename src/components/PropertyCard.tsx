import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Bed, Bath, Maximize2, MapPin, Heart, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Property } from '../data/properties';
import { SafeImage } from './SafeImage';
import { getWhatsAppLink } from '../data/business';

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onOpenDetails: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSaved,
  onToggleSave,
  onOpenDetails,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Framer Motion 3D tilt (max 6 degrees as specified)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const waLink = getWhatsAppLink(
    `Hello Naveed, I am interested in '${property.title}' (${property.phase}, ${property.price}). Please share more details.`
  );

  return (
    <motion.div
      layout
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="[perspective:1000px] h-full"
    >
      <div 
        onClick={() => onOpenDetails(property)}
        className="group relative h-full bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer"
      >
        {/* Cover Image in 16:10 */}
        <div className="relative overflow-hidden bg-slate-900">
          <SafeImage
            src={property.images[0]}
            alt={property.title}
            fallbackTitle={property.title}
            aspectRatioClass="aspect-[16/10]"
            className="transition-transform duration-500 group-hover:scale-103"
          />

          {/* Top Tags & Save Button */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs ${
                property.purpose === 'Buy'
                  ? 'bg-[#0F1720] text-white'
                  : 'bg-[#0096C7] text-white'
              }`}>
                For {property.purpose}
              </span>
              
              {/* Mandatory Sample Tag */}
              <span className="bg-[#FFEB12] text-slate-950 text-[11px] font-extrabold px-2 py-1 rounded-md shadow-xs uppercase tracking-wider">
                Sample
              </span>
            </div>

            {/* Heart Save Button (min 44x44 touch target) */}
            <button
              type="button"
              onClick={(e) => onToggleSave(property.id, e)}
              aria-label={isSaved ? "Remove from saved" : "Save property"}
              className={`min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                isSaved
                  ? 'bg-rose-500 text-white scale-105'
                  : 'bg-black/40 hover:bg-black/60 text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Bottom Gradient Overlay on Image with Price */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end justify-between z-10">
            <div>
              <div className="text-[11px] text-slate-300 font-medium">{property.phase}</div>
              <div className="font-heading font-extrabold text-lg sm:text-xl text-white tabular-nums">
                {property.price}
              </div>
            </div>
            <span className="text-xs font-semibold text-white/95 bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-md">
              {property.size}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#0096C7] shrink-0" />
              <span className="truncate">{property.location}</span>
            </div>

            {/* Title */}
            <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-[#0096C7] transition-colors line-clamp-1 mb-2">
              {property.title}
            </h3>

            {/* Description */}
            <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
              {property.description}
            </p>
          </div>

          {/* Specs & Action Buttons */}
          <div>
            {/* Specs Row */}
            <div className="flex items-center gap-4 text-xs text-slate-600 pt-3 border-t border-slate-100 mb-4">
              {property.bedrooms !== undefined && property.bedrooms > 0 && (
                <span className="flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-slate-400" />
                  <strong className="text-slate-800">{property.bedrooms}</strong> Beds
                </span>
              )}
              {property.bathrooms !== undefined && property.bathrooms > 0 && (
                <span className="flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-slate-400" />
                  <strong className="text-slate-800">{property.bathrooms}</strong> Baths
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-slate-400" />
                <span>{property.size}</span>
              </span>
            </div>

            {/* Actions: View Details & WhatsApp (min-h 44px on mobile) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenDetails(property)}
                className="min-h-[44px] flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>View Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 bg-[#7AC143] hover:bg-[#6cb337] active:scale-95 text-slate-950 rounded-xl transition-all shadow-xs shrink-0 cursor-pointer"
                title={`Chat about ${property.title} on WhatsApp`}
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
