"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RestaurantCard from "@/components/RestaurantCard";
import { mockRestaurants } from "@/data/restaurants";

export default function V2Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState(mockRestaurants);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const result = mockRestaurants.filter((r) =>
      r.name.toLowerCase().includes(term) ||
      r.specialties.some((s) => s.toLowerCase().includes(term))
    );
    setFiltered(result);
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl font-bold leading-none mb-6">
              Découvrez les meilleurs restaurants
            </h1>
            <p className="text-2xl text-gray-600 mb-10">
              Explorez une sélection exceptionnelle de restaurants Tunisiens et découvrez de nouvelles saveurs près de chez vous
            </p>
          </div>
          <div className="relative">
            <img
              src="/hero-image.png"
              alt="FoodHub Hero"
              className="rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher restaurants, plats..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-11 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-red-600 outline-none text-lg"
            />
          </div>
          <button className="flex items-center gap-2 px-8 bg-red-600 py-3 hover:bg-red-700 text-white rounded-2xl font-medium">
            <Filter className="w-5 h-5" />
            Filtres
          </button>
        </div>
      </div>

      {/* Restaurant Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <p className="text-sm text-gray-500 mb-6">
          {filtered.length} restaurant{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
