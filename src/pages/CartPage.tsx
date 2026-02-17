import { useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { trackEvent } from '../lib/analytics';
import { formatPrice } from '../lib/currency';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  getTotal: () => number;
}

export const CartPage = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  getTotal,
}: CartPageProps) => {
  useEffect(() => {
    trackEvent({ event_type: 'page_view', event_data: { page: 'cart' } });
  }, []);

  const handleCheckout = () => {
    trackEvent({ event_type: 'checkout_initiated', event_data: { total: getTotal() } });
    onCheckout();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-12 text-center">
            <ShoppingBag className="h-24 w-24 text-slate-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
            <p className="text-slate-600 mb-8">
              Add some awesome gym wrist bands to get started!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div
                key={item.product.id}
                className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-6"
              >
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {item.product.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-2">{item.product.description}</p>
                  <p className="text-lg font-bold text-emerald-600">
                    {formatPrice(item.product.price)}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-2">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 hover:bg-slate-200 rounded transition-colors"
                    >
                      <Minus className="h-4 w-4 text-slate-600" />
                    </button>
                    <span className="w-8 text-center font-bold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 hover:bg-slate-200 rounded transition-colors"
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="h-4 w-4 text-slate-600" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-slate-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-semibold">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-slate-900">
                  <span>Total</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-bold transition-colors"
              >
                Proceed to Checkout
              </button>

              <div className="mt-6 space-y-2 text-sm text-slate-600">
                <p className="flex items-center">
                  <span className="mr-2">✓</span> Free shipping on all orders
                </p>
                <p className="flex items-center">
                  <span className="mr-2">✓</span> 30-day money-back guarantee
                </p>
                <p className="flex items-center">
                  <span className="mr-2">✓</span> Secure payment processing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
