'use client';

import { useEffect, useState } from 'react';

interface IceCreamFlavor {
  name: string;
  description: string;
  price: string;
  category: string;
  image?: string;
}

export default function Home() {
  const [iceCreamFlavors, setIceCreamFlavors] = useState<IceCreamFlavor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sheets');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        
        // Transform the data to match our expected format
        const transformedData = result.data.map((item: Record<string, string>) => ({
          name: item.choose_cup_cone || item['choose_cup/cone'] || item.name || item.flavor || item.title || 'Unknown',
          description: item.choose_scoops || item.description || item.desc || item.details || '',
          price: item.price || item.cost || '$0.00',
          category: item.category || item.type || 'Classic',
          image: item.image || '/ice-cream-placeholder.jpg'
        }));
        
        setIceCreamFlavors(transformedData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load menu data');
        // Fallback to default data if API fails
        setIceCreamFlavors([
          {
            name: "Vanilla Bean",
            description: "Classic vanilla with real vanilla bean specks",
            price: "$4.50",
            category: "Classic"
          },
          {
            name: "Chocolate Fudge",
            description: "Rich chocolate with fudge swirls",
            price: "$5.00",
            category: "Classic"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍦</div>
          <h2 className="text-2xl font-bold text-gray-900">Loading your ice cream menu...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="text-3xl mr-3">🍦</div>
              <h1 className="text-3xl font-bold text-gray-900">Sweet Scoops</h1>
            </div>
            <div className="text-sm text-gray-600">
              <p>Open Daily • 12PM - 10PM</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Artisan Ice Cream
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Handcrafted with love and the finest ingredients
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <span>🌱 All Natural</span>
            <span>🥛 Fresh Dairy</span>
            <span>🍯 Local Honey</span>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Flavors
          </h3>
          
          {error && (
            <div className="text-center mb-8 p-4 bg-yellow-100 border border-yellow-400 rounded">
              <p className="text-yellow-800">{error}</p>
              <p className="text-sm text-yellow-600 mt-2">Showing sample data</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {iceCreamFlavors.map((flavor, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                  <div className="text-6xl">🍦</div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold text-gray-900">{flavor.name}</h4>
                    <span className="text-lg font-bold text-purple-600">{flavor.price}</span>
                  </div>
                  <p className="text-gray-600 mb-3">{flavor.description}</p>
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {flavor.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Today&apos;s Specials
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-lg p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">🍓 Strawberry Delight</h4>
              <p className="text-gray-600 mb-4">Fresh strawberries with whipped cream and chocolate drizzle</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-red-600">$6.50</span>
                <span className="text-sm text-red-600 font-medium">Limited Time!</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">🌙 Midnight Cookie</h4>
              <p className="text-gray-600 mb-4">Dark chocolate with cookie pieces and caramel swirl</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-orange-600">$7.00</span>
                <span className="text-sm text-orange-600 font-medium">New Flavor!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Sweet Scoops</h4>
              <p className="text-gray-300">Handcrafted ice cream made with love and the finest ingredients.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Hours</h4>
              <p className="text-gray-300">Monday - Sunday</p>
              <p className="text-gray-300">12:00 PM - 10:00 PM</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Contact</h4>
              <p className="text-gray-300">123 Ice Cream Lane</p>
              <p className="text-gray-300">(555) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 Sweet Scoops. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
