import { ShoppingCart, Search, Menu, X, Settings } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  onCartClick: () => void;
  currentPage: 'home' | 'catalog';
  onNavigate: (page: 'home' | 'catalog') => void;
  onAdminClick?: () => void;
}

export const Header = ({ onCartClick, currentPage, onNavigate, onAdminClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 hover:opacity-70 transition"
          >
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center relative">
              <span className="text-white">O</span>
              <div className="absolute w-2 h-0.5 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="tracking-wider">MOLO</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`text-sm hover:opacity-70 transition ${currentPage === 'home' ? 'font-bold' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('catalog')}
              className={`text-sm hover:opacity-70 transition ${currentPage === 'catalog' ? 'font-bold' : ''}`}
            >
              Catálogo
            </button>
            <a href="#about" className="text-sm hover:opacity-70 transition">Nosotros</a>
            <a href="#contact" className="text-sm hover:opacity-70 transition">Contacto</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="w-5 h-5" />
            </Button>
            
            {onAdminClick && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onAdminClick}
                title="Acceso Admin"
              >
                <Settings className="w-5 h-5" />
              </Button>
            )}
            
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col gap-4 border-t">
            <button 
              onClick={() => {
                onNavigate('home');
                setIsMenuOpen(false);
              }}
              className="text-sm hover:opacity-70 transition text-left"
            >
              Home
            </button>
            <button 
              onClick={() => {
                onNavigate('catalog');
                setIsMenuOpen(false);
              }}
              className="text-sm hover:opacity-70 transition text-left"
            >
              Catálogo
            </button>
            <a href="#about" className="text-sm hover:opacity-70 transition" onClick={() => setIsMenuOpen(false)}>Nosotros</a>
            <a href="#contact" className="text-sm hover:opacity-70 transition" onClick={() => setIsMenuOpen(false)}>Contacto</a>
            {onAdminClick && (
              <button 
                onClick={() => {
                  onAdminClick();
                  setIsMenuOpen(false);
                }}
                className="text-sm hover:opacity-70 transition text-left"
              >
                Admin Panel
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};