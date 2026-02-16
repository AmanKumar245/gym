import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { trackEvent } from '../lib/analytics';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ProductsPageProps {
  onAddToCart: (product: Product) => void;
}

export const ProductsPage = ({ onAddToCart }: ProductsPageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackEvent({ event_type: 'page_view', event_data: { page: 'products' } });
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    trackEvent({
      event_type: 'add_to_cart',
      event_data: { product_id: product.id, product_name: product.name }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-xl text-slate-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Premium Gym Wrist Bands</h1>
          <p className="text-xl text-slate-300">
            Elevate your workout with professional-grade wrist bands
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};
