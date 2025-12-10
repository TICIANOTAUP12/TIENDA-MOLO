import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Producto } from '@/services/api';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import type { Product as CatalogProduct } from '@/data/products';
import { openWhatsApp } from '../utils/whatsapp';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface ProductCardProps {
  producto?: Producto;
  product?: CatalogProduct;
  onWhatsAppClick?: (producto: Producto) => void;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ producto, product, onWhatsAppClick, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  useEffect(() => setMounted(true), []);

  const normalized = producto
    ? {
        id: producto.id,
        name: producto.nombre,
        description: producto.descripcion,
        price: producto.precio,
        image: producto?.imagenes?.[0]?.url_imagen,
        variantText:
          producto?.variantes && producto.variantes.length > 0
            ? `${producto.variantes[0].talla} - ${producto.variantes[0].color}`
            : undefined,
        sizes: Array.from(new Set(producto.variantes?.map((v: any) => v.talla) || [])),
        colors: Array.from(new Set(producto.variantes?.map((v: any) => v.color) || []))
      }
    : product
    ? {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product?.images?.[0],
        variantText:
          product?.sizes && product?.sizes.length > 0 && product?.colors && product.colors.length > 0
            ? `${product.sizes[0]} - ${product.colors[0]}`
            : undefined,
        sizes: product.sizes,
        colors: product.colors
      }
    : null;

  const handleWhatsAppClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (producto && onWhatsAppClick) {
      onWhatsAppClick(producto);
    } else if (normalized) {
      const message =
        `¡Hola! Me interesa el producto:\n\n` +
        `🛍️ ${normalized.name}\n` +
        `💰 Precio: $${normalized.price.toLocaleString('es-AR')}\n` +
        (normalized.sizes && normalized.sizes.length > 0 ? `📏 Talla: ${normalized.sizes[0]}\n` : '') +
        (normalized.colors && normalized.colors.length > 0 ? `🎨 Color: ${normalized.colors[0]}\n` : '') +
        `\n¿Está disponible?`;
      openWhatsApp(message);
    }
  };

  const baseMessage = () => {
    if (!normalized) return '';
    return (
      `¡Hola! Me interesa el producto:\n\n` +
      `🛍️ ${normalized.name}\n` +
      `💰 Precio: $${normalized.price.toLocaleString('es-AR')}\n` +
      (selectedSize ? `📏 Talla: ${selectedSize}\n` : '') +
      (selectedColor ? `🎨 Color: ${selectedColor}\n` : '') +
      `\n¿Está disponible?`
    );
  };

  useEffect(() => {
    if (!normalized) return;
    if (isOpen) {
      setSelectedSize(normalized.sizes && normalized.sizes.length > 0 ? normalized.sizes[0] : undefined);
      setSelectedColor(normalized.colors && normalized.colors.length > 0 ? normalized.colors[0] : undefined);
    }
  }, [isOpen, normalized]);


  return (
    <div>
      <Card
        className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={() => {
          setIsOpen(true);
          if (onClick) onClick();
        }}
      >
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        {normalized?.image ? (
          <img
            src={normalized.image}
            alt={normalized.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzEyNy45MSAxMDAgMTEwIDExNy45MSAxMTAgMTQwQzExMCAxNjIuMDkgMTI3LjkxIDE4MCAxNTAgMTgwQzE3Mi4wOSAxODAgMTkwIDE2Mi4wOSAxOTAgMTQwQzE5MCAxMTcuOTEgMTcyLjA5IDEwMCAxNTAgMTAwWk0xNTAgMTcwQzEzMy40MyAxNzAgMTIwIDE1Ni41NyAxMjAgMTQwQzEyMCAxMjMuNDMgMTMzLjQzIDExMCAxNTAgMTEwQzE2Ni41NyAxMTAgMTgwIDEyMy40MyAxODAgMTQwQzE4MCAxNTYuNTcgMTY2LjU3IDE3MCAxNTAgMTcwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">Sin imagen</span>
          </div>
        )}
      </div>
      
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold line-clamp-2">{normalized?.name}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm text-gray-600">
          {normalized?.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-gray-900">
            ${normalized?.price.toLocaleString('es-AR')}
          </span>
          {normalized?.variantText && (
            <span className="text-sm text-gray-500">
              {normalized.variantText}
            </span>
          )}
        </div>
        
        {producto?.variantes && producto.variantes.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Stock:</span>
            <span className={`font-medium ${
              producto.variantes.some((v: any) => v.stock > 0) 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {producto.variantes.some((v: any) => v.stock > 0) ? 'Disponible' : 'Sin stock'}
            </span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={(e) => handleWhatsAppClick(e)}
          className="w-full bg-green-500 hover:bg-green-600 text-white"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Consultar por WhatsApp
        </Button>
      </CardFooter>
      </Card>

      <Dialog open={!!(normalized && mounted && isOpen)} onOpenChange={(open: boolean) => setIsOpen(!!open)}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detalles del Producto</DialogTitle>
            <DialogDescription className="sr-only">Información y opciones del producto</DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
              {normalized?.image ? (
                <img src={normalized.image} alt={normalized?.name || 'Producto'} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-400">Sin imagen</span>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">{normalized?.name}</h3>
              <p className="text-xl font-semibold text-green-600">${normalized?.price.toLocaleString('es-AR')}</p>
              <p className="text-gray-700">{normalized?.description}</p>

              {normalized?.sizes && normalized.sizes.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Talla</p>
                  <div className="flex flex-wrap gap-2">
                    {normalized.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => { setSelectedSize(size); }}
                        className={`px-3 py-1 rounded border transition ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white border-gray-300 hover:border-black'}`}
                        type="button"
                        aria-pressed={selectedSize === size}
                        aria-label={`Seleccionar talla ${size}`}
                        title={`Seleccionar talla ${size}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {normalized?.colors && normalized.colors.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Color</p>
                  <div className="flex flex-wrap gap-2">
                    {normalized.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => { setSelectedColor(color); }}
                        className={`px-3 py-1 rounded border transition ${selectedColor === color ? 'bg-black text-white border-black' : 'bg-white border-gray-300 hover:border-black'}`}
                        type="button"
                        aria-pressed={selectedColor === color}
                        aria-label={`Seleccionar color ${color}`}
                        title={`Seleccionar color ${color}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-50 border rounded p-3 text-sm text-gray-700">
                {baseMessage()}
              </div>

              <DialogFooter>
                <Button onClick={() => openWhatsApp(baseMessage())} className="bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Enviar por WhatsApp
                </Button>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
