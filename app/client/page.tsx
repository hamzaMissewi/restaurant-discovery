"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RestaurantCard from "@/components/RestaurantCard";
import { mockRestaurants } from "@/data/restaurants";
import { Clock, Filter, Heart, Search, ShoppingCart } from "lucide-react";
import { useState } from "react";



export default function ClientPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState(mockRestaurants);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = ["Tous", "Fast Food", "Restaurant", "Restaurant Traditionnel", "Poisson et Fruits de Mer", "Restaurant Gastronomique", "Pizza", "Cuisine Tunisienne", "Restaurant Populaire"];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterRestaurants(term, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterRestaurants(searchTerm, category);
  };

  const filterRestaurants = (term: string, category: string) => {
    let result = mockRestaurants;

    if (category !== "Tous") {
      result = result.filter(r => r.category === category);
    }

    if (term) {
      result = result.filter((r) =>
        r.name.toLowerCase().includes(term) ||
        r.specialties.some((s) => s.toLowerCase().includes(term)) ||
        r.address.toLowerCase().includes(term)
      );
    }

    setFiltered(result);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-linear-to-r from-yellow-200 to-orange-500 py-16">
          <div className="max-w-7xl mx-auto px-4 text-black">
            <div className="flex items-center mb-6">
              <ShoppingCart className="w-10 h-10 mr-3" />
              <h1 className="text-4xl font-bold">Espace Client</h1>
            </div>
            <p className="text-xl mb-8">
              Découvrez les meilleurs restaurants tunisiens et commandez vos plats préférés en quelques clics.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher restaurants, plats, adresses..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-11 pr-4 py-4 rounded-2xl text-gray-900 focus:outline-none "
              // focus:ring-white/30 focus:ring-4
              />
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white border-b sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4 overflow-x-auto">
              <Filter className="w-5 h-5 text-gray-600 shrink-0" />
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-2xl text-sm font-medium whitespace-nowrap transition ${selectedCategory === category
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-lg text-gray-700">
              {filtered.length} restaurant{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Livraison: 15-45 min</span>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun restaurant trouvé</h3>
              <p className="text-gray-500">Essayez de modifier vos filtres ou votre recherche</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((restaurant) => (
                <div key={restaurant.id} className="relative">
                  <button
                    onClick={() => toggleFavorite(restaurant.id)}
                    className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition"
                  >
                    <Heart
                      className={`w-5 h-5 ${favorites.includes(restaurant.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                        }`}
                    />
                  </button>
                  <RestaurantCard restaurant={restaurant} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="bg-white border-t">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                Mes favoris ({favorites.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockRestaurants
                  .filter(r => favorites.includes(r.id))
                  .map((restaurant) => (
                    <div key={restaurant.id} className="relative">
                      <button
                        onClick={() => toggleFavorite(restaurant.id)}
                        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition"
                      >
                        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                      </button>
                      <RestaurantCard restaurant={restaurant} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
