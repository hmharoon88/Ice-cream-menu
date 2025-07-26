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

  useEffect(() => {
    // Static data that matches your Google Sheet
    const staticData: IceCreamFlavor[] = [
      { 
        name: "Pup cup", 
        description: "Single scoop", 
        price: "$4.99", 
        category: "Classic" 
      },
      { 
        name: "Waffle Cone", 
        description: "Double scoop", 
        price: "$6.99", 
        category: "Classic" 
      },
      { 
        name: "Rootbeer Float", 
        description: "Refreshing float", 
        price: "$7.99", 
        category: "Specialty" 
      },
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
      },
      { 
        name: "Strawberry", 
        description: "Fresh strawberry with real fruit pieces", 
        price: "$4.75", 
        category: "Fruit" 
      },
      { 
        name: "Mint Chocolate Chip", 
        description: "Cool mint with chocolate chips", 
        price: "$5.25", 
        category: "Classic" 
      },
      { 
        name: "Cookie Dough", 
        description: "Vanilla with cookie dough chunks", 
        price: "$5.50", 
        category: "Specialty" 
      },
      { 
        name: "Rocky Road", 
        description: "Chocolate with marshmallows and nuts", 
        price: "$5.75", 
        category: "Specialty" 
      }
    ];

    setIceCreamFlavors(staticData);
    setLoading(false);
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

  const categories = [...new Set(iceCreamFlavors.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">🍦</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Sweet Scoops</h1>
                <p className="text-gray-600">Artisan Ice Cream</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Today&apos;s Specials</p>
              <p className="text-lg font-semibold text-pink-600">Fresh Daily</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Sweet Scoops! 🍨
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Handcrafted ice cream made with love and the finest ingredients. 
            Each scoop is a little piece of happiness!
          </p>
        </div>

        {/* Menu by Categories */}
        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3">
                {category === 'Classic' ? '🥛' : 
                 category === 'Fruit' ? '🍓' : 
                 category === 'Specialty' ? '⭐' : '🍦'}
              </span>
              {category} Flavors
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {iceCreamFlavors
                .filter(item => item.category === category)
                .map((flavor, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-xl font-semibold text-gray-900">
                          {flavor.name}
                        </h4>
                        <span className="text-2xl font-bold text-pink-600">
                          {flavor.price}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {flavor.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                          {flavor.category}
                        </span>
                        <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                          Order Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Visit Us Today! 🏪</h3>
            <p className="text-gray-600 mb-6">
              Come experience the magic of our handcrafted ice cream. 
              Perfect for any occasion!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">📍</span>
                <span className="text-gray-700">123 Ice Cream Lane</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">🕒</span>
                <span className="text-gray-700">Open Daily 12PM-10PM</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">📞</span>
                <span className="text-gray-700">(555) ICE-CREAM</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
