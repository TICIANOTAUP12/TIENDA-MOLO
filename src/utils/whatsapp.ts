export const getWhatsAppHref = (message?: string) => {
  const phone = (import.meta as any).env?.VITE_WHATSAPP_PHONE || '5491234567890';
  const base = `https://wa.me/${phone}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
};

export const openWhatsApp = (message: string) => {
  const href = getWhatsAppHref(message);
  window.open(href, '_blank');
};
