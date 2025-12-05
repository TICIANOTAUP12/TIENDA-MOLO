import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { ProductCard } from '../ProductCard';
import { products } from '@/data/products';

describe('ProductCard', () => {
  const product = products[0];

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('muestra imagen, nombre y precio', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText(product.name)).toBeInTheDocument();
    const priceText = `$${product.price.toLocaleString('es-AR')}`;
    expect(screen.getByText(priceText)).toBeInTheDocument();
    // Imagen
    const img = screen.getByAltText(product.name);
    expect(img).toBeInTheDocument();
  });

  it('abre y cierra el modal de detalles', () => {
    render(<ProductCard product={product} />);
    // Abrir modal clickeando la tarjeta
    fireEvent.click(screen.getByText(product.name));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText('Detalles del Producto')).toBeInTheDocument();
    // Contenidos del modal en el diálogo
    expect(within(dialog).getByText(product.name)).toBeInTheDocument();
    const priceText = `$${product.price.toLocaleString('es-AR')}`;
    expect(within(dialog).getByText(priceText)).toBeInTheDocument();
    expect(within(dialog).getByText(/Talles:/)).toBeInTheDocument();
    expect(within(dialog).getByText(/Colores:/)).toBeInTheDocument();
    // Cerrar
    fireEvent.click(screen.getByLabelText('Cerrar'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('no abre modal al hacer click en WhatsApp', () => {
    render(<ProductCard product={product} />);
    const button = screen.getByRole('button', { name: /whatsapp/i });
    fireEvent.click(button);
    expect(window.open).toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('soporta múltiples instancias con productos distintos', () => {
    const other = products[1];
    render(
      <div>
        <ProductCard product={product} />
        <ProductCard product={other} />
      </div>
    );
    // Abrir el segundo
    fireEvent.click(screen.getByText(other.name));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText(other.name)).toBeInTheDocument();
  });

  it('no muestra errores en consola durante la interacción', () => {
    render(<ProductCard product={product} />);
    fireEvent.click(screen.getByText(product.name));
    fireEvent.click(screen.getByLabelText('Cerrar'));
    expect(console.error).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
  });
});
