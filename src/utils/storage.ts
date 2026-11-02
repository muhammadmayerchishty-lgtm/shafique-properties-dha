/**
 * Safe localStorage utilities with try/catch blocks
 */

export const getSavedPropertyIds = (): string[] => {
  try {
    const raw = localStorage.getItem('shafique_saved_properties');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Unable to read saved properties from localStorage:', err);
    return [];
  }
};

export const toggleSavedPropertyId = (id: string): string[] => {
  try {
    const current = getSavedPropertyIds();
    const next = current.includes(id) 
      ? current.filter(item => item !== id)
      : [...current, id];
    localStorage.setItem('shafique_saved_properties', JSON.stringify(next));
    return next;
  } catch (err) {
    console.warn('Unable to save property to localStorage:', err);
    return [];
  }
};
