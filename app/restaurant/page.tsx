"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Store, ArrowRight, CheckCircle, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function RestaurantPage() {
  const [formData, setFormData] = useState({
    restaurantName: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  });

  const benefits = [
    {
      icon: Store,
      title: "Augmentez vos ventes",
      description: "Atteignez plus de clients avec notre plateforme digitale"
    },
    {
      icon: TrendingUp,
      title: "Optimisez votre gestion",
      description: "Menu numérique, commandes en ligne, gestion des stocks"
    },
    {
      icon: Star,
      title: "Améliorez votre réputation",
      description: "Avis clients, programme de fidélité, marketing intégré"
    }
  ];

  const stats = [
    { value: "+40%", label: "Augmentation moyenne des commandes" },
    { value: "50K+", label: "Clients actifs mensuels" },
    { value: "4.8★", label: "Note moyenne des partenaires" },
    { value: "24/7", label: "Support client" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-linear-to-br from-purple-50 to-white">
        {/* Hero Section */}
        <div className="bg-linear-to-r from-purple-600 to-indigo-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-6">
              <Store className="w-12 h-12 mr-3" />
              <h1 className="text-5xl font-bold">Espace Restaurant</h1>
            </div>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Rejoignez FoodHub et transformez votre restaurant en une expérience digitale moderne. 
              Des milliers de clients vous attendent déjà.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-2xl text-lg transition flex items-center justify-center gap-2">
                  S'inscrire maintenant
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <button className="border-2 border-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-4 rounded-2xl text-lg transition">
                Voir la démo
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Pourquoi FoodHub ?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition">
                  <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                    <benefit.icon className="w-7 h-7 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Registration Form Section */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Commencez votre voyage digital</h2>
            <p className="text-center text-gray-600 mb-12">
              Remplissez ce formulaire et notre équipe vous contactera dans les 24 heures.
            </p>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du restaurant *
                    </label>
                    <input
                      type="text"
                      name="restaurantName"
                      value={formData.restaurantName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:border-purple-600 focus:outline-none"
                      placeholder="Restaurant Example"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:border-purple-600 focus:outline-none"
                      placeholder="contact@restaurant.tn"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:border-purple-600 focus:outline-none"
                      placeholder="+216 XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:border-purple-600 focus:outline-none"
                      placeholder="Rue de la République, Tunis"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description de votre restaurant
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:border-purple-600 focus:outline-none resize-none"
                    placeholder="Décrivez votre cuisine, vos spécialités, votre ambiance..."
                  />
                </div>

                <div className="bg-purple-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-purple-900 mb-3">Ce que vous obtenez :</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-purple-800">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                      Menu numérique illimité
                    </li>
                    <li className="flex items-center gap-2 text-sm text-purple-800">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                      QR Code personnalisé
                    </li>
                    <li className="flex items-center gap-2 text-sm text-purple-800">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                      Support client 24/7
                    </li>
                    <li className="flex items-center gap-2 text-sm text-purple-800">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                      Analytics et rapports
                    </li>
                  </ul>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-2xl text-lg transition"
                >
                  Demander ma démo gratuite
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-linear-to-r from-purple-600 to-indigo-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Des questions ?</h2>
            <p className="text-lg mb-8">
              Notre équipe commerciale est là pour vous aider à choisir la solution parfaite pour votre restaurant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-2xl transition">
                Appeler maintenant
              </button>
              <button className="border-2 border-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-3 rounded-2xl transition">
                Planifier un appel
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
