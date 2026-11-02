/**
 * Shafique Properties business information
 * Demo concept developed by ORION IT SOLUTIONS
 */

export interface BusinessDetails {
  name: string;
  contact: string;
  phone: string;
  whatsapp: string;
  address: string;
  alternateAddress: string;
  hours: string;
  city: string;
  email: string;
  tagline: string;
  creator: {
    agency: string;
    note: string;
  };
}

export const BUSINESS_INFO: BusinessDetails = {
  name: "SHAFIQUE PROPERTIES",
  contact: "Naveed Shafique",
  phone: "+92 323 7912129",
  whatsapp: "923237912129",
  address: "F-38/1 Basement, Phase 1, D.H.A Lahore",
  alternateAddress: "42 Block, Sector F, DHA Phase 1, Lahore",
  hours: "Mon to Sat, 10:00 AM to 9:00 PM, Sunday closed",
  city: "Lahore, Pakistan",
  email: "info@shafiqueproperties.com",
  tagline: "Your Premier Real Estate Agency in DHA Lahore",
  creator: {
    agency: "ORION IT SOLUTIONS",
    note: "Demo concept by ORION IT SOLUTIONS. Sample listings and AI-generated visuals."
  }
};

export const getWhatsAppLink = (message?: string): string => {
  const text = message 
    ? encodeURIComponent(message)
    : encodeURIComponent("Hello Naveed, I am interested in buying/renting property in DHA Lahore with Shafique Properties.");
  return `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${text}`;
};

export const getTelLink = (): string => {
  return `tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`;
};
