import { useEffect } from 'react';
import { CheckCircle, Shield, Zap, Heart } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export const BlogPage = () => {
  useEffect(() => {
    trackEvent({ event_type: 'page_view', event_data: { page: 'blog' } });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Why Choose Gym Wrist Bands?</h1>
          <p className="text-xl text-slate-300">
            Discover the benefits that will transform your workout experience
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="bg-white rounded-lg shadow-md p-8 mb-8">
          <img
            src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Gym workout"
            className="w-full h-96 object-cover rounded-lg mb-8"
          />

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              The Ultimate Guide to Gym Wrist Bands
            </h2>

            <p className="text-slate-700 mb-6 text-lg leading-relaxed">
              Whether you're a seasoned athlete or just starting your fitness journey, gym wrist
              bands are an essential accessory that can significantly enhance your workout
              performance. Here's why investing in quality wrist bands is a game-changer for your
              training routine.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-emerald-50 p-6 rounded-lg">
                <Shield className="h-12 w-12 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Superior Sweat Absorption
                </h3>
                <p className="text-slate-700">
                  Our premium cotton blend wicks away moisture instantly, keeping your hands dry
                  and your grip secure throughout intense training sessions.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <Zap className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Enhanced Performance
                </h3>
                <p className="text-slate-700">
                  Maintain perfect form and control with consistent grip stability. No more
                  slipping weights or interrupted sets due to sweaty palms.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <Heart className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Comfort & Durability</h3>
                <p className="text-slate-700">
                  Crafted from breathable, high-quality materials that last through countless
                  workouts while remaining soft and comfortable on your skin.
                </p>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <CheckCircle className="h-12 w-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Professional Choice</h3>
                <p className="text-slate-700">
                  Trusted by professional athletes and fitness enthusiasts worldwide for their
                  reliability and performance-enhancing benefits.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
              Why Our Wrist Bands Stand Out
            </h3>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  <strong>Premium Materials:</strong> Made with high-grade cotton and synthetic
                  blends for optimal moisture management
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  <strong>Perfect Fit:</strong> Elastic design ensures a secure, comfortable fit
                  for all wrist sizes
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  <strong>Long-Lasting:</strong> Maintains elasticity and absorbency through
                  hundreds of washes
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  <strong>Multi-Sport Versatility:</strong> Ideal for weightlifting, CrossFit,
                  tennis, basketball, and more
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
              Who Should Use Gym Wrist Bands?
            </h3>

            <p className="text-slate-700 mb-4 leading-relaxed">
              Gym wrist bands are beneficial for anyone engaged in physical activity:
            </p>

            <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700">
              <li>Weightlifters and powerlifters who need consistent grip during heavy lifts</li>
              <li>CrossFit athletes performing high-intensity interval training</li>
              <li>Tennis and racket sport players maintaining racket control</li>
              <li>Basketball players preventing sweat from affecting ball handling</li>
              <li>Runners who wipe sweat from their face during long runs</li>
              <li>Yoga and Pilates practitioners maintaining grip on mats and equipment</li>
            </ul>

            <div className="bg-slate-100 p-6 rounded-lg my-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">The Science Behind It</h3>
              <p className="text-slate-700 leading-relaxed">
                Studies show that maintaining a dry grip can improve workout efficiency by up to
                15%. When your hands are slippery with sweat, you unconsciously adjust your form
                and reduce weight to compensate, limiting your gains. Our wrist bands eliminate
                this problem, allowing you to focus entirely on your performance and push your
                limits safely.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">
              Investment in Your Performance
            </h3>

            <p className="text-slate-700 mb-6 leading-relaxed">
              At prices ranging from $9.99 to $15.99, our gym wrist bands offer exceptional value
              for a product that will enhance every single workout. Consider it an investment in
              your performance, safety, and comfort. With proper care, a quality pair of wrist
              bands can last for years, making them one of the most cost-effective fitness
              accessories available.
            </p>

            <div className="bg-emerald-600 text-white p-8 rounded-lg text-center my-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Elevate Your Workout?</h3>
              <p className="text-emerald-100 mb-6">
                Join thousands of athletes who trust our wrist bands for their training
              </p>
              <button
                onClick={() => {
                  trackEvent({ event_type: 'blog_cta_click', event_data: { location: 'bottom' } });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-bold hover:bg-emerald-50 transition-colors"
              >
                Shop Now
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
