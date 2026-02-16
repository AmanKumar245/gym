import { ShoppingCart, Activity } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartItemCount: number;
}

export const Header = ({ currentPage, onNavigate, cartItemCount }: HeaderProps) => {
  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-emerald-400" />
            <h1
              className="text-2xl font-bold cursor-pointer hover:text-emerald-400 transition-colors"
              onClick={() => onNavigate('products')}
            >
              GymBand Pro
            </h1>
          </div>

          <nav className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate('products')}
              className={`hover:text-emerald-400 transition-colors ${
                currentPage === 'products' ? 'text-emerald-400' : ''
              }`}
            >
              Products
            </button>
            <button
              onClick={() => onNavigate('blog')}
              className={`hover:text-emerald-400 transition-colors ${
                currentPage === 'blog' ? 'text-emerald-400' : ''
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => onNavigate('analytics')}
              className={`hover:text-emerald-400 transition-colors ${
                currentPage === 'analytics' ? 'text-emerald-400' : ''
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => onNavigate('cart')}
              className={`relative hover:text-emerald-400 transition-colors ${
                currentPage === 'cart' ? 'text-emerald-400' : ''
              }`}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
