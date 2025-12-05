import { products } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  onProductClick: (productId: string) => void;
}

export const ProductGrid = ({ onProductClick }: ProductGridProps) => {
  return (
    <section id="catalog" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Nuestra Colección</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre piezas únicas diseñadas con pasión y dedicación
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
