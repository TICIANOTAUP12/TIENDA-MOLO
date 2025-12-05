import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { CatalogPage } from './components/CatalogPage';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Footer } from './components/Footer';
import { AdminApp } from './components/AdminApp';
import { CartProvider } from './contexts/CartContext';
import { Product } from './services/api';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalog' | 'product' | 'admin'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if we're in admin mode
    const urlParams = new URLSearchParams(window.location.search);
    const adminParam = urlParams.get('admin');
    if (adminParam === 'true') {
      setIsAdmin(true);
      setCurrentPage('admin');
    }
  }, []);

  const handleNavigate = (page: 'home' | 'catalog') => {
    setCurrentPage(page);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleBackToCatalog = () => {
    setSelectedProduct(null);
    setCurrentPage('catalog');
  };

  const handleAdminAccess = () => {
    setIsAdmin(true);
    setCurrentPage('admin');
    // Update URL to reflect admin mode
    window.history.pushState({}, '', '?admin=true');
  };

  const handleExitAdmin = () => {
    setIsAdmin(false);
    setCurrentPage('home');
    // Remove admin parameter from URL
    window.history.pushState({}, '', window.location.pathname);
  };

  // If in admin mode, show only admin interface
  if (isAdmin) {
    return <AdminApp onLogout={handleExitAdmin} />;
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header 
          onCartClick={() => setIsCartOpen(true)} 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onAdminClick={handleAdminAccess}
        />
        
        <main>
          {currentPage === 'home' && (
            <HomePage onNavigateToCatalog={() => handleNavigate('catalog')} />
          )}
          
          {currentPage === 'catalog' && (
            <CatalogPage />
          )}
          
          {currentPage === 'product' && selectedProduct && (
            <ProductDetail 
              product={selectedProduct} 
              onBack={handleBackToCatalog}
            />
          )}
        </main>

        <Footer />
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
}

export default App;
