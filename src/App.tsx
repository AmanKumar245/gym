import { useState } from 'react';
import { Header } from './components/Header';
import { ProductsPage } from './pages/ProductsPage';
import { BlogPage } from './pages/BlogPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { useCart } from './hooks/useCart';
import { Product } from './types';

type Page = 'products' | 'blog' | 'cart' | 'checkout' | 'analytics';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('products');
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotal, getItemCount } =
    useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const handleBuyFromBlog = (product: Product) => {
    addToCart(product, 1);
    setCurrentPage('cart');
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
  };

  const handleOrderComplete = () => {
    clearCart();
    setCurrentPage('products');
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartItemCount={getItemCount()}
      />

      {currentPage === 'products' && <ProductsPage onAddToCart={handleAddToCart} />}

      {currentPage === 'blog' && <BlogPage onBuyFromBlog={handleBuyFromBlog} />}

      {currentPage === 'cart' && (
        <CartPage
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
          getTotal={getTotal}
        />
      )}

      {currentPage === 'checkout' && (
        <CheckoutPage cart={cart} getTotal={getTotal} onOrderComplete={handleOrderComplete} />
      )}

      {currentPage === 'analytics' && <AnalyticsPage />}
    </div>
  );
}

export default App;
