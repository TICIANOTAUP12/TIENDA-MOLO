import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { apiService, Producto, Categoria } from '@/services/api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ProductCatalogProps {
  onWhatsAppClick: (producto: Producto) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onWhatsAppClick }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoria, setSelectedCategoria] = useState<string>('');
  const [selectedTalla, setSelectedTalla] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [selectedCategoria, selectedTalla, selectedColor]);

  const cargarDatos = async () => {
    try {
      const [productosData, categoriasData] = await Promise.all([
        apiService.getProductos(),
        apiService.getCategorias()
      ]);
      setProductos(productosData.products);
      setCategorias(categoriasData.categorias);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await apiService.getProductos(
        selectedCategoria || undefined,
        selectedTalla || undefined,
        selectedColor || undefined
      );
      setProductos(data.products);
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const limpiarFiltros = () => {
    setSelectedCategoria('');
    setSelectedTalla('');
    setSelectedColor('');
  };

  // Obtener tallas y colores únicos de todos los productos
  const tallasUnicas = Array.from(new Set(
    productos.flatMap(p => p.variantes?.map(v => v.talla) || [])
  )).sort();

  const coloresUnicos = Array.from(new Set(
    productos.flatMap(p => p.variantes?.map(v => v.color) || [])
  )).sort();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Categoría</label>
            <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas las categorías</SelectItem>
                {categorias.map(categoria => (
                  <SelectItem key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Talla</label>
            <Select value={selectedTalla} onValueChange={setSelectedTalla}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las tallas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas las tallas</SelectItem>
                {tallasUnicas.map(talla => (
                  <SelectItem key={talla} value={talla}>
                    {talla}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los colores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos los colores</SelectItem>
                {coloresUnicos.map(color => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button 
              variant="outline" 
              onClick={limpiarFiltros}
              className="w-full"
            >
              Limpiar filtros
            </Button>
          </div>
        </div>
      </div>

      {/* Grid de productos */}
      {productos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron productos</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productos.map(producto => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onWhatsAppClick={onWhatsAppClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};