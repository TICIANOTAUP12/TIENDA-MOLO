import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Producto, apiService } from '@/services/api';
import { MessageCircle, ShoppingCart, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductDetailProps {
  producto: Producto;
  onWhatsAppClick: (producto: Producto, variante?: any) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ producto, onWhatsAppClick }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTalla, setSelectedTalla] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [availableVariantes, setAvailableVariantes] = useState(producto.variantes || []);

  useEffect(() => {
    // Filtrar variantes disponibles basado en selecciones
    let filtered = producto.variantes || [];
    
    if (selectedTalla) {
      filtered = filtered.filter((v: any) => v.talla === selectedTalla);
    }
    
    if (selectedColor) {
      filtered = filtered.filter((v: any) => v.color === selectedColor);
    }
    
    setAvailableVariantes(filtered);
  }, [selectedTalla, selectedColor, producto.variantes]);

  useEffect(() => {
    // Establecer valores por defecto
    if (producto.variantes && producto.variantes.length > 0) {
      const tallas = Array.from(new Set(producto.variantes.map((v: any) => v.talla)));
      const colores = Array.from(new Set(producto.variantes.map((v: any) => v.color)));
      
      if (!selectedTalla && tallas.length > 0) {
        setSelectedTalla(tallas[0] as string);
      }
      
      if (!selectedColor && colores.length > 0) {
        setSelectedColor(colores[0] as string);
      }
    }
  }, [producto.variantes]);

  const handleWhatsAppClick = () => {
    const varianteSeleccionada = producto.variantes?.find(
      (v: any) => v.talla === selectedTalla && v.color === selectedColor
    );
    
    onWhatsAppClick(producto, varianteSeleccionada);
  };

  const getTallasDisponibles = () => {
    const tallas = Array.from(new Set(producto.variantes?.map((v: any) => v.talla) || []));
    return tallas.sort();
  };

  const getColoresDisponibles = () => {
    const colores = Array.from(new Set(producto.variantes?.map((v: any) => v.color) || []));
    return colores.sort();
  };

  const getVarianteSeleccionada = () => {
    return producto.variantes?.find((v: any) => v.talla === selectedTalla && v.color === selectedColor);
  };

  const varianteActual = getVarianteSeleccionada();
  const hayStock = varianteActual && varianteActual.stock > 0;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {producto.imagenes && producto.imagenes.length > 0 ? (
              <img
                src={producto.imagenes[selectedImage]?.url_imagen}
                alt={`${producto.nombre} - Imagen ${selectedImage + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzE3Ny45MSAxNTAgMTYwIDE2Ny45MSAxNjAgMTkwQzE2MCAyMTIuMDkgMTc3LjkxIDIzMCAyMDAgMjMwQzIyMi4wOSAyMzAgMjQwIDIxMi4wOSAyNDAgMTkwQzI0MCAxNjcuOTEgMjIyLjA5IDE1MCAyMDAgMTUwWk0yMDAgMjIwQzE4My40MyAyMjAgMTcwIDIwNi41NyAxNzAgMTkwQzE3MCAxNzMuNDMgMTgzLjQzIDE2MCAyMDAgMTYwQzIxNi41NyAxNjAgMjMwIDE3My40MyAyMzAgMTkwQzIzMCAyMDYuNTcgMjE2LjU3IDIyMCAyMDAgMjIwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-400 text-lg">Sin imagen</span>
              </div>
            )}
          </div>
          
          {/* Miniaturas */}
          {producto.imagenes && producto.imagenes.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {producto.imagenes.map((imagen: any, index: number) => (
                <button
                  key={imagen.id}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <img
                    src={imagen.url_imagen}
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{producto.nombre}</h1>
            <p className="text-xl font-semibold text-green-600 mb-4">
              ${producto.precio.toLocaleString('es-AR')}
            </p>
            <CardDescription className="text-base leading-relaxed">
              {producto.descripcion}
            </CardDescription>
          </div>

          {/* Selector de variantes */}
          {producto.variantes && producto.variantes.length > 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Talla
                </label>
                <Select value={selectedTalla} onValueChange={setSelectedTalla}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar talla" />
                  </SelectTrigger>
                  <SelectContent>
                    {getTallasDisponibles().map(talla => (
                      <SelectItem key={talla} value={talla}>
                        {talla}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar color" />
                  </SelectTrigger>
                  <SelectContent>
                    {getColoresDisponibles().map(color => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Información de stock */}
              {varianteActual && (
                <div className="flex items-center gap-2">
                  {varianteActual.stock > 0 ? (
                    <>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Stock disponible: {varianteActual.stock}
                      </Badge>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <Badge variant="destructive">
                        Sin stock
                      </Badge>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Botón de WhatsApp */}
          <Button
            onClick={handleWhatsAppClick}
            disabled={!hayStock}
            className={`w-full ${
              hayStock
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {hayStock ? 'Consultar por WhatsApp' : 'Sin stock disponible'}
          </Button>

          {/* Información adicional */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Información adicional</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>• Envíos a todo el país</p>
              <p>• Pago contra entrega disponible</p>
              <p>• Consultas por WhatsApp 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
