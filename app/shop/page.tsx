"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Store, Smartphone, QrCode, TrendingUp, Users, Clock, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ShopPage() {
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [formData, setFormData] = useState({
    restaurantName: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  });

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "29",
      features: [
        "Menu numérique illimité",
        "QR Code personnalisé",
        "Mise à jour en temps réel",
        "Support par email",
        "Analytics de base",
      ],
      highlighted: false,
    },
    {
      id: "professional",
      name: "Professional",
      price: "59",
      features: [
        "Tout le plan Starter",
        "Commandes en ligne",
        "Gestion des stocks",
        "Programme de fidélité",
        "Support prioritaire",
        "Analytics avancées",
        "Marketing tools",
      ],
      highlighted: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "99",
      features: [
        "Tout le plan Professional",
        "API personnalisée",
        "Intégrations avancées",
        "Dédicated account manager",
        "Formation personnalisée",
        "White label option",
      ],
      highlighted: false,
    },
  ];

  const stats = [
    { icon: Users, label: "Restaurants partenaires", value: "500+" },
    { icon: Smartphone, label: "Commandes mensuelles", value: "50K+" },
    { icon: TrendingUp, label: "Croissance moyenne", value: "+40%" },
    { icon: Clock, label: "Temps de réponse", value: "< 2min" },
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

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-6">
              <Store className="w-12 h-12 mr-3" />
              <h1 className="text-5xl font-bold">Espace Restaurant</h1>
            </div>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              La solution digitale complète qui transforme l'expérience client de votre établissement.
              Rejoignez les centaines de restaurants qui ont déjà modernisé leur service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-2xl text-lg transition flex items-center justify-center gap-2">
                Commencer gratuitement
                <ArrowRight className="w-5 h-5" />
              </button>
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
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Pourquoi FoodHub ?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <Smartphone className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Menu Numérique</h3>
                <p className="text-gray-600">
                  Remplacez vos menus papier par un menu numérique interactif,
                  facile à mettre à jour et accessible à tous vos clients.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <QrCode className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">QR Code</h3>
                <p className="text-gray-600">
                  Générez des QR codes personnalisés pour chaque table.
                  Vos clients scannent et accèdent instantanément à votre menu.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Mise à jour temps réel</h3>
                <p className="text-gray-600">
                  Modifiez vos prix, ajoutez des plats ou gérez les ruptures de stock
                  en temps réel, directement depuis votre dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Choisissez votre plan</h2>
            <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
              Des tarifs transparents adaptés à la taille de votre établissement.
              Sans engagement, annulez à tout moment.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-white rounded-3xl p-8 ${plan.highlighted
                    ? "ring-2 ring-purple-600 shadow-xl scale-105"
                    : "shadow-lg hover:shadow-xl"
                    } transition`}
                >
                  {plan.highlighted && (
                    <div className="bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full inline-block mb-4">
                      Plus populaire
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 ml-2">TND/mois</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-3 rounded-2xl font-semibold transition ${plan.highlighted
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                      }`}
                  >
                    {selectedPlan === plan.id ? "Sélectionné" : "Choisir ce plan"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Prêt à moderniser votre restaurant ?</h2>
            <p className="text-xl mb-8">
              Rejoignez des centaines de restaurateurs qui font confiance à FoodHub
              pour développer leur activité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-2xl text-lg transition">
                  Créer mon compte
                </button>
              </Link>
              <button className="border-2 border-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-4 rounded-2xl text-lg transition">
                Contacter le sales
              </button>
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
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
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
