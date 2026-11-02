import React, { useState } from 'react';
import { Home } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  title?: string;
  aspectRatioClass?: string;
  fallbackTitle?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  title,
  fallbackTitle,
  aspectRatioClass = 'aspect-[16/10]',
  className = '',
  loading = 'lazy',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const displayTitle = fallbackTitle || title || alt || 'Shafique Properties';

  if (hasError) {
    return (
      <div 
        className={`w-full ${aspectRatioClass} bg-gradient-to-br from-[#0096C7] via-[#0F1720] to-[#7AC143] flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden select-none ${className}`}
      >
        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-3 border border-white/20 shadow-md">
          <Home className="w-6 h-6 text-[#FFEB12]" />
        </div>
        <span className="font-heading font-bold text-sm sm:text-base text-white line-clamp-2 max-w-xs drop-shadow-sm">
          {displayTitle}
        </span>
        <span className="text-[11px] font-medium text-slate-300 mt-1 uppercase tracking-wider">
          DHA Lahore Collection
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${aspectRatioClass} overflow-hidden bg-slate-900 ${className}`}>
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse" />
      )}
      
      <img
        src={src}
        alt={alt}
        title={title}
        loading={loading}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...rest}
      />
    </div>
  );
};
