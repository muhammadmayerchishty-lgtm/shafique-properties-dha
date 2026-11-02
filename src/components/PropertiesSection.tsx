import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, SlidersHorizontal, Heart, ShieldAlert, RotateCcw } from 'lucide-react';
import { Property, PROPERTIES, DHA_PHASE_OPTIONS, PROPERTY_TYPE_OPTIONS, PROPERTY_SIZE_OPTIONS, BUDGET_RANGES } from '../data/properties';
import { PropertyCard } from './PropertyCard';
import { PropertyModal } from './PropertyModal';
import { SearchFilterState } from './Hero';
import { getSavedPropertyIds, toggleSavedPropertyId } from '../utils/storage';

interface PropertiesSectionProps {
  initialFilter?: SearchFilterState | null;
}

export const PropertiesSection: React.FC<PropertiesSectionProps> = ({ initialFilter }) => {
  // Live filter states
  const [purposeFilter, setPurposeFilter] = useState<'All' | 'Buy' | 'Rent'>('All');
  const [phaseFilter, setPhaseFilter] = useState<string>('All Phases');
  const [typeFilter, setTypeFilter] = useState<string>('All Types');
  const [sizeFilter, setSizeFilter] = useState<string>('All Sizes');
  const [budgetFilter, setBudgetFilter] = useState<string>('Any Budget');
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);

  // Favorites in localStorage
  const [savedIds, setSavedIds] = useState<string[]>([]);
  // Selected property for detail modal
  const [activeModalProperty, setActiveModalProperty] = useState<Property | null>(null);

  // Sync initial filter from Hero search if submitted
  useEffect(() => {
    if (initialFilter) {
      setPurposeFilter(initialFilter.purpose);
      if (initialFilter.phase !== 'All Phases') {
        setPhaseFilter(initialFilter.phase.startsWith('DHA') ? initialFilter.phase : `DHA ${initialFilter.phase}`);
      }
      if (initialFilter.type !== 'All Types') {
        setTypeFilter(initialFilter.type);
      }
      if (initialFilter.budget !== 'Any Budget') {
        setBudgetFilter(initialFilter.budget);
      }
    }
  }, [initialFilter]);

  // Read saved properties from localStorage with try/catch
  useEffect(() => {
    setSavedIds(getSavedPropertyIds());
  }, []);

  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = toggleSavedPropertyId(id);
    setSavedIds(updated);
  };

  const handleResetFilters = () => {
    setPurposeFilter('All');
    setPhaseFilter('All Phases');
    setTypeFilter('All Types');
    setSizeFilter('All Sizes');
    setBudgetFilter('Any Budget');
    setShowSavedOnly(false);
  };

  // Filter evaluation logic
  const filteredProperties = PROPERTIES.filter((prop) => {
    // Saved only filter
    if (showSavedOnly && !savedIds.includes(prop.id)) {
      return false;
    }
    // Purpose filter
    if (purposeFilter !== 'All' && prop.purpose !== purposeFilter) {
      return false;
    }
    // Phase filter
    if (phaseFilter !== 'All Phases' && prop.phase !== phaseFilter) {
      return false;
    }
    // Type filter
    if (typeFilter !== 'All Types' && prop.type !== typeFilter) {
      return false;
    }
    // Size filter
    if (sizeFilter !== 'All Sizes' && prop.size !== sizeFilter) {
      return false;
    }
    // Budget range filter
    if (budgetFilter !== 'Any Budget') {
      const budgetConfig = BUDGET_RANGES.find((b) => b.label === budgetFilter);
      if (budgetConfig) {
        if (prop.numericPrice < budgetConfig.min || prop.numericPrice > budgetConfig.max) {
          return false;
        }
      }
    }
    return true;
  });

  return (
    <section id="properties" className="py-20 bg-[#F7FAFC] text-[#0F1720]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs font-bold text-[#0096C7] tracking-wider uppercase mb-2">
              DHA Lahore Inventory
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Featured Properties
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Authentic luxury homes, commercial investments, and verified plots across DHA Lahore. Real-time filtering and 3D preview.
            </p>
          </div>

          {/* Purpose Switch & Saved Filter */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Buy / Rent Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-xl">
              {(['All', 'Buy', 'Rent'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setPurposeFilter(tab)}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    purposeFilter === tab
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab === 'All' ? 'All (8)' : tab === 'Buy' ? 'Buy (5)' : 'Rent (3)'}
                </button>
              ))}
            </div>

            {/* Saved Toggle Button */}
            <button
              type="button"
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
                showSavedOnly
                  ? 'bg-rose-50 text-rose-700 border-rose-300 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${showSavedOnly ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
              <span>Saved ({savedIds.length})</span>
            </button>
          </div>
        </div>

        {/* Live Filter Bar (Phase, Type, Size, Budget) */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Phase Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                DHA Phase
              </label>
              <select
                value={phaseFilter}
                onChange={(e) => setPhaseFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0096C7] cursor-pointer"
              >
                {DHA_PHASE_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Type Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Property Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0096C7] cursor-pointer"
              >
                {PROPERTY_TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Size Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Area Size
              </label>
              <select
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0096C7] cursor-pointer"
              >
                {PROPERTY_SIZE_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Budget Range Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Budget Range
              </label>
              <select
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0096C7] cursor-pointer"
              >
                {BUDGET_RANGES.map((b) => (
                  <option key={b.label} value={b.label}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Active Status & Live Result Count */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">
                Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">
                {purposeFilter === 'All' ? 'Buy & Rent' : `For ${purposeFilter}`}
                {phaseFilter !== 'All Phases' && ` in ${phaseFilter}`}
                {typeFilter !== 'All Types' && ` · ${typeFilter}`}
                {sizeFilter !== 'All Sizes' && ` · ${sizeFilter}`}
              </span>
            </div>

            {(purposeFilter !== 'All' || phaseFilter !== 'All Phases' || typeFilter !== 'All Types' || sizeFilter !== 'All Sizes' || budgetFilter !== 'Any Budget' || showSavedOnly) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0096C7] hover:text-[#007ba3] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Animated Layout Grid of Property Cards */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto shadow-xs">
            <ShieldAlert className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              No matching properties
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Try adjusting your filters or contact Naveed Shafique for unlisted off-market plots and luxury bungalows.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#0F1720] text-white font-bold rounded-xl text-xs hover:bg-slate-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  isSaved={savedIds.includes(prop.id)}
                  onToggleSave={handleToggleSave}
                  onOpenDetails={(p) => setActiveModalProperty(p)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>

      {/* Property Detail Modal */}
      {activeModalProperty && (
        <PropertyModal
          property={activeModalProperty}
          allProperties={PROPERTIES}
          onClose={() => setActiveModalProperty(null)}
          onSelectProperty={(p) => setActiveModalProperty(p)}
        />
      )}
    </section>
  );
};
