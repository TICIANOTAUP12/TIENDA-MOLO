import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Cart } from '../Cart';
import { CartProvider } from '@/contexts/CartContext';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useEffect } from 'react';

// Wrapper component to populate cart for testing
const CartWrapper = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { addToCart } = useCart();
  const product = products[0];

  useEffect(() => {
    // Add item on mount only once for test setup
    addToCart(product, product.sizes[0], product.colors[0]);
  }, []);

  return <Cart isOpen={isOpen} onClose={onClose} />;
};

describe('Cart Component', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('no renderiza cuando isOpen es false', () => {
    render(
      <CartProvider>
        <Cart isOpen={false} onClose={() => {}} />
      </CartProvider>
    );
    expect(screen.queryByText('Carrito de Compras')).not.toBeInTheDocument();
  });

  it('renderiza cuando isOpen es true', () => {
    render(
      <CartProvider>
        <Cart isOpen={true} onClose={() => {}} />
      </CartProvider>
    );
    expect(screen.getByText('Carrito de Compras')).toBeInTheDocument();
    expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
  });

  it('muestra productos agregados y calcula total', () => {
    render(
      <CartProvider>
        <CartWrapper isOpen={true} onClose={() => {}} />
      </CartProvider>
    );

    const product = products[0];
    const priceText = `$${product.price.toLocaleString('es-AR')}`;
    
    // Check product name and price
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getAllByText(priceText).length).toBeGreaterThan(0); // One for item, one for total if single item

    // Check quantity controls
    expect(screen.getByText('1')).toBeInTheDocument(); // Quantity display
  });

  it('permite cerrar el carrito', () => {
    const handleClose = vi.fn();
    render(
      <CartProvider>
        <Cart isOpen={true} onClose={handleClose} />
      </CartProvider>
    );

    // Close button (X)
    const closeButtons = screen.getAllByRole('button');
    // First button usually X in header
    fireEvent.click(closeButtons[0]); 
    expect(handleClose).toHaveBeenCalled();
  });

  it('checkout via WhatsApp', () => {
    render(
      <CartProvider>
        <CartWrapper isOpen={true} onClose={() => {}} />
      </CartProvider>
    );

    const checkoutBtn = screen.getByText('Finalizar por WhatsApp');
    fireEvent.click(checkoutBtn);
    expect(window.open).toHaveBeenCalled();
    const url = vi.mocked(window.open).mock.calls[0][0] as string;
    expect(url).toContain('wa.me');
  });
});
