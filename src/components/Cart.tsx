import { X, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../contexts/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = ({ isOpen, onClose }: CartProps) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message = '¡Hola! Me gustaría realizar el siguiente pedido:\n\n';
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   📏 Talla: ${item.selectedSize}\n`;
      message += `   🎨 Color: ${item.selectedColor}\n`;
      message += `   📦 Cantidad: ${item.quantity}\n`;
      message += `   💰 Precio: $${(item.price * item.quantity).toLocaleString()}\n\n`;
    });

    message += `💵 Total: $${getTotalPrice().toLocaleString()}\n\n`;
    message += '¿Pueden confirmar disponibilidad?';

    window.open(`https://wa.me/5491234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}>
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <h2>Carrito de Compras</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 pb-4 border-b">
                  <div className="w-20 h-20 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=fashion%20placeholder%20image%20clothing%20item&image_size=square';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {item.selectedSize} / {item.selectedColor}
                    </p>
                    <p className="mb-2">${item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t p-6">
            <div className="flex items-center justify-between mb-4">
              <span>Total:</span>
              <span className="text-2xl">${getTotalPrice().toLocaleString()}</span>
            </div>
            <Button
              onClick={handleWhatsAppCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white mb-3"
            >
              Finalizar por WhatsApp
            </Button>
            <Button
              onClick={clearCart}
              variant="outline"
              className="w-full"
            >
              Vaciar Carrito
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};