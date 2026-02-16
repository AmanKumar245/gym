import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, ShoppingCart, Eye, CreditCard } from 'lucide-react';
import { getEventCounts, trackEvent } from '../lib/analytics';

export const AnalyticsPage = () => {
  const [eventCounts, setEventCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackEvent({ event_type: 'page_view', event_data: { page: 'analytics' } });
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const counts = await getEventCounts();
      setEventCounts(counts);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'page_view':
        return <Eye className="h-6 w-6" />;
      case 'add_to_cart':
        return <ShoppingCart className="h-6 w-6" />;
      case 'checkout_initiated':
      case 'order_completed':
        return <CreditCard className="h-6 w-6" />;
      default:
        return <TrendingUp className="h-6 w-6" />;
    }
  };

  const getEventLabel = (eventType: string) => {
    return eventType
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case 'page_view':
        return 'bg-blue-500';
      case 'add_to_cart':
        return 'bg-emerald-500';
      case 'checkout_initiated':
        return 'bg-orange-500';
      case 'order_completed':
        return 'bg-purple-500';
      default:
        return 'bg-slate-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-xl text-slate-600">Loading analytics...</div>
      </div>
    );
  }

  const totalEvents = Object.values(eventCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="h-10 w-10 text-emerald-400" />
            <h1 className="text-4xl font-bold">Analytics Dashboard</h1>
          </div>
          <p className="text-xl text-slate-300">
            Track user interactions and site performance in real-time
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-5xl font-bold text-emerald-600 mb-2">{totalEvents}</div>
            <div className="text-slate-600 text-lg">Total Events Tracked</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(eventCounts).map(([eventType, count]) => (
            <div
              key={eventType}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${getEventColor(eventType)} text-white p-3 rounded-lg`}>
                  {getEventIcon(eventType)}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900">{count}</div>
                  <div className="text-sm text-slate-500">events</div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {getEventLabel(eventType)}
              </h3>
            </div>
          ))}
        </div>

        {Object.keys(eventCounts).length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <BarChart3 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Data Yet</h3>
            <p className="text-slate-600">
              Start browsing the site to see analytics data appear here
            </p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">About Analytics</h2>
          <div className="space-y-3 text-slate-700">
            <p>
              This dashboard tracks various user interactions across the website in real-time.
              All events are stored in the Supabase database and can be queried for deeper
              insights.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Tracked Events:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>
                  <strong>Page View:</strong> Counts every time a user visits a page
                </li>
                <li>
                  <strong>Add to Cart:</strong> Tracks when products are added to cart
                </li>
                <li>
                  <strong>Checkout Initiated:</strong> Counts checkout page visits
                </li>
                <li>
                  <strong>Order Completed:</strong> Tracks successful orders
                </li>
                <li>
                  <strong>Blog CTA Click:</strong> Monitors call-to-action interactions
                </li>
              </ul>
            </div>
            <p className="text-sm text-slate-600 mt-4">
              The analytics system uses Supabase's real-time capabilities to track and store
              events. You can extend this by adding more event types or creating custom queries
              to analyze user behavior patterns.
            </p>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mt-6">
          <h3 className="font-bold text-emerald-900 mb-2">API Information</h3>
          <p className="text-emerald-800 text-sm">
            All analytics data is accessible via the Supabase API. You can query the{' '}
            <code className="bg-emerald-100 px-2 py-1 rounded">analytics</code> table to get
            detailed information about each event, including timestamps and custom event data.
          </p>
        </div>
      </div>
    </div>
  );
};
