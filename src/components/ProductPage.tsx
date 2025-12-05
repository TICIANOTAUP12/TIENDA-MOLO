import { useState } from 'react';
import { X, ShoppingCart, Truck, CreditCard } from 'lucide-react';
import { Product } from '../data/products';
import { Button } from './ui/button';
import { useCart } from '../contexts/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductPageProps {
  product: Product;
  onClose: () => void;
}

export const ProductPage = ({ product, onClose }: ProductPageProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `¡Hola! Me interesa el producto:\n\n` +
      `🛍️ ${product.name}\n` +
      `💰 Precio: $${product.price.toLocaleString()}\n` +
      `📏 Talla: ${selectedSize}\n` +
      `🎨 Color: ${selectedColor}\n\n` +
      `¿Está disponible?`
    );
    window.open(`https://wa.me/5491234567890?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white max-w-5xl w-full rounded-lg shadow-2xl my-8">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between rounded-t-lg z-10">
          <h2 className="text-xl">Detalles del Producto</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Image Gallery */}
          <div>
            <div className="aspect-[3/4] overflow-hidden rounded-lg mb-4 bg-gray-100">
              <ImageWithFallback
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded overflow-hidden border-2 transition ${
                    selectedImage === index ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="flex-1">
              <h1 className="mb-2">{product.name}</h1>
              <p className="mb-6 text-2xl">${product.price.toLocaleString()}</p>

              <div className="mb-6">
                <p className="text-gray-700">{product.description}</p>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <label className="block mb-3">Talla</label>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded transition ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-white border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-8">
                <label className="block mb-3">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded transition ${
                        selectedColor === color
                          ? 'bg-black text-white border-black'
                          : 'bg-white border-gray-300 hover:border-black'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <Truck className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">Envíos a todo el país</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CreditCard className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">Todos los medios de pago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 sticky bottom-0 bg-white pt-4 border-t">
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Agregar al Carrito
              </Button>
              <Button
                onClick={handleWhatsAppOrder}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Comprar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
