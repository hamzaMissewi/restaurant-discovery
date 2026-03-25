"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, MapPin, Clock, Star, Filter, Heart, ShoppingCart } from "lucide-react";
import RestaurantCard from "@/components/RestaurantCard";

// Use the same mock restaurants from the main page
const mockRestaurants = [
  {
    id: 1,
    name: "King Tacos",
    slug: "king-tacos",
    category: "Fast Food",
    rating: 5.0,
    reviews: 788,
    address: "Rue la République 56, Sayada, MONASTIR",
    specialties: ["Tacos", "Pizza", "Makloub", "Burger"],
    image: "/restaurants/tacos-burger.png",
    time: "15-25 min",
  },
  {
    id: 2,
    name: "Restaurant Africain Les Délices d'Afrique",
    slug: "restaurant-africain-delices-afrique",
    category: "Restaurant",
    rating: 5.0,
    reviews: 708,
    address: "2 rue Hedi nouira, EL MENZAH 1, TUNIS",
    specialties: ["Grillades", "Bowls", "Box", "Afro"],
    image: "/restaurants/africain-delices-afrique.png",
    time: "20-30 min",
  },
  {
    id: 3,
    name: "Café Chich Khan",
    slug: "cafe-chich-khan",
    category: "Restaurant Traditionnel",
    rating: 4.5,
    reviews: 1250,
    address: "Avenue Habib Bourguiba, Tunis",
    specialties: ["Couscous", "Tajine", "Brick", "Méchoui"],
    image: "/restaurants/chich-khan-coscous.png",
    time: "25-35 min",
  },
  {
    id: 4,
    name: "Restaurant Le Grand Bleu",
    slug: "restaurant-le-grand-bleu",
    category: "Poisson et Fruits de Mer",
    rating: 4.8,
    reviews: 892,
    address: "Port de La Goulette, Tunis",
    specialties: ["Poisson Grillé", "Calamars", "Fruits de Mer", "Paella"],
    image: "/restaurants/poisson-fruit-mer-goulette.png",
    time: "30-40 min",
  },
  {
    id: 5,
    name: "Dar El Jeld",
    slug: "dar-el-jeld",
    category: "Restaurant Gastronomique",
    rating: 4.9,
    reviews: 2100,
    address: "Medina de Tunis, 27, rue Tourbet El Bey",
    specialties: ["Cuisine Traditionnelle", "Couscous Royal", "Pâtisseries", "Thé à la Menthe"],
    image: "/restaurants/dar-el-jeld-couscous.png",
    time: "35-45 min",
  },
  {
    id: 6,
    name: "Pizza Mania",
    slug: "pizza-mania",
    category: "Pizza",
    rating: 4.2,
    reviews: 456,
    address: "Avenue Charles de Gaulle, El Menzah 6, Tunis",
    specialties: ["Pizza Italienne", "Pizza Tunisienne", "Pâtes", "Salades"],
    image: "/restaurants/pizza-mania.png",
    time: "20-30 min",
  },
  {
    id: 7,
    name: "Restaurant El Dar",
    slug: "restaurant-el-dar",
    category: "Cuisine Tunisienne",
    rating: 4.6,
    reviews: 678,
    address: "Rue Sidi Ben Arous, Medina, Tunis",
    specialties: ["Ojja", "Chakchouka", "Brik", "Lablabi"],
    image: "/restaurants/restaurant-el-dar-gamarth-coscous.png",
    time: "25-35 min",
  },
  {
    id: 8,
    name: "Chez Slah",
    slug: "chez-slah",
    category: "Restaurant Populaire",
    rating: 4.3,
    reviews: 934,
    address: "Bab Souika, Tunis",
    specialties: ["Sandwich Tunisien", "Frites", "Harissa", "Légumes Grillés"],
    image: "/restaurants/chez-slah-sandwich.png",
    time: "15-20 min",
  },
];

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
        <div className="bg-linear-to-r from-yellow-400 to-orange-500 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
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
                className="w-full pl-11 pr-4 py-4 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white border-b sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4 overflow-x-auto">
              <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-2xl text-sm font-medium whitespace-nowrap transition ${
                      selectedCategory === category
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
                      className={`w-5 h-5 ${
                        favorites.includes(restaurant.id) 
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
