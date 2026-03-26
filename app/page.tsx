"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RestaurantCard from "@/components/RestaurantCard";
import { Restaurants } from "@/data/restaurants";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState(Restaurants);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const result = Restaurants.filter((r) =>
      r.name.toLowerCase().includes(term) ||
      r.specialties.some((s) => s.toLowerCase().includes(term))
    );
    setFiltered(result);
  };

  return (
    <>
      <Header />
      <Hero />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search + Filters */}
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
          <Button className="flex items-center gap-2 px-4 py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-medium">
            <Filter className="w-5 h-5" />
            Filtres
          </Button>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          {filtered.length} restaurant{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        {/* Révolutionnez votre restaurant section */}
        {/* <div className="mt-20 bg-linear-to-r from-red-600 to-rose-700 text-white rounded-3xl p-10 text-center"> */}
        <div className="mt-20 bg-linear-to-r from-purple-600 to-indigo-700 text-white rounded-3xl p-10 text-center">
          <h2 className="text-4xl font-bold mb-3">Révolutionnez votre restaurant</h2>
          <p className="max-w-xl mx-auto mb-10 text-lg">
            La solution digitale complète qui transforme l’expérience client de votre établissement. Moderne, simple et efficace.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {["Menu numérique", "QR Code", "Mise à jour temps réel"].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-left">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-2xl mb-4">📱</div>
                <h3 className="font-semibold text-xl">{item}</h3>
              </div>
            ))}
          </div>
          <a href="/shop" className="inline-block mt-10 bg-white text-red-600 px-10 py-4 rounded-2xl font-semibold hover:scale-105 transition">
            Devenir partenaire →
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}