import { Instagram, Facebook } from 'lucide-react';
import { getWhatsAppHref } from '../utils/whatsapp';

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center relative">
                <span className="text-black">O</span>
                <div className="absolute w-2 h-0.5 bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="tracking-wider">MOLO</span>
            </div>
            <p className="text-white/70 text-sm">
              Diseño artístico que rompe el área tradicional. 
              Ropa única para personas únicas.
            </p>
          </div>

          {/* Info */}
          <div>
            <h3 className="mb-4">Información</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>✓ Envíos a todo el país</li>
              <li>✓ Todos los medios de pago aceptados</li>
              <li>✓ Mercado Pago, efectivo, transferencia</li>
              <li>✓ Cambios y devoluciones</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
                aria-label="Facebook"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
                aria-label="TikTok"
                title="TikTok"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
            <p className="mt-4 text-sm text-white/70">
              Contáctanos por WhatsApp:<br />
              <a href={getWhatsAppHref()} className="hover:text-white transition">
                +54 9 11 2345-6789
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/50">
          <p>© 2025 MOLO. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
