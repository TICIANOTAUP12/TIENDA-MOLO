import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CatalogPage } from '../CatalogPage';
import { products } from '@/data/products';

describe('CatalogPage', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza tarjetas y contador de productos', () => {
    render(<CatalogPage />);
    const countText = `${products.length} ${products.length === 1 ? 'producto' : 'productos'}`;
    expect(screen.getByText(countText)).toBeInTheDocument();
    // Renderiza al menos una tarjeta
    expect(screen.getAllByText(/Consultar por WhatsApp/i).length).toBeGreaterThan(0);
  });

  it('filtra por categoría', () => {
    render(<CatalogPage />);
    const category = 'Vestidos';
    const expected = products.filter(p => p.category === category).length;
    const button = screen.getByRole('button', { name: category });
    fireEvent.click(button);
    const countText = `${expected} ${expected === 1 ? 'producto' : 'productos'}`;
    expect(screen.getByText(countText)).toBeInTheDocument();
  });

  it('no muestra errores en consola', () => {
    render(<CatalogPage />);
    expect(console.error).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();
  });
});
