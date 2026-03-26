"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Users, Target, Award, MapPin, Mail, Phone } from "lucide-react";

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  const team = [
    {
      name: "Hamza TN",
      role: "Fondateur & CEO",
      // image: "/api/placeholder/200/200/hamza-tn",
      image: "/team/hamza.png",
      description: "Passionné par la technologie et la restauration, Hamza a lancé KmandyFood pour révolutionner l'expérience restaurant en Tunisie."
    },
    {
      name: "Sarah Ben Ali",
      role: "CTO",
      // image: "/api/placeholder/200/200/sarah-ben-ali",
      image: "/team/sarah.png",
      description: "Experte en développement web et mobile, Sarah supervise toute la partie technique de la plateforme."
    },
    // {
    //   name: "Mehdi Karray",
    //   role: "Head of Design",
    //   // image: "/api/placeholder/200/200/mehdi-karray",
    //   image: "/team/mehdi.png",
    //   description: "Créatif et orienté UX, Mehdi s'assure que KmandyFood offre la meilleure expérience possible aux utilisateurs."
    // }
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "Nous sommes passionnés par la restauration et la technologie, et nous mettons tout notre cœur dans chaque projet."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Nous croyons au pouvoir de la collaboration entre restaurateurs, clients et notre équipe pour créer une expérience exceptionnelle."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Nous innovons constamment pour offrir les solutions les plus modernes et efficaces à nos partenaires."
    },
    {
      icon: Award,
      title: "Qualité",
      description: "L'excellence est notre standard. Nous nous engageons à fournir des services de la plus haute qualité."
    }
  ];

  const milestones = [
    { year: "2024", event: "Lancement de KmandyFood en Tunisie" },
    { year: "2025", event: "100+ restaurants partenaires" },
    { year: "2026", event: "Expansion internationale prévue" }
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen">
        {/* Hero Section */}
        {/* <div className="bg-linear-to-r from-purple-600 to-indigo-700 text-white py-20"> */}
        <div className="bg-linear-to-r from-red-600 to-rose-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">À propos de KmandyFood</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Né en Tunisie, KmandyFood est la solution digitale qui transforme l'expérience restaurant pour des milliers de clients et de restaurateurs à travers le pays.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Notre Mission</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Rendre l'expérience restaurant plus simple, plus rapide et plus agréable
                  pour tout le monde. Nous connectons les clients avec les meilleurs restaurants
                  tout en aidant les restaurateurs à moderniser leur activité.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Grâce à notre technologie innovante, nous offrons une plateforme complète
                  qui répond aux besoins de la restauration moderne : menus numériques,
                  commandes en ligne, gestion des stocks et bien plus encore.
                </p>
              </div>
              <div className="bg-purple-100 rounded-3xl p-8 text-center">
                <div className="text-6xl mb-4">🇹🇳</div>
                <h3 className="text-2xl font-bold text-purple-800 mb-2">Fait en Tunisie</h3>
                <p className="text-purple-700">
                  Une solution 100% tunisienne pour la restauration tunisienne
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Nos Valeurs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Notre Équipe</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <div key={i} className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Notre Histoire</h2>
            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, i) => (
                <div key={i} className="flex items-center mb-8">
                  <div className="bg-purple-600 text-white px-4 py-2 rounded-2xl font-semibold min-w-[100px] text-center">
                    {milestone.year}
                  </div>
                  <div className="ml-6 flex-1">
                    <p className="text-lg text-gray-700">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-20 bg-linear-to-r from-purple-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Contactez-nous</h2>
                <p className="text-lg mb-8">
                  Une question ? Une suggestion ? Nous serions ravis de vous entendre.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    <span>contact@KmandyFood.tn</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <span>+216 71 234 567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    <span>Tunis, Tunisie</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
                <h3 className="text-xl font-semibold mb-6">Envoyez-nous un message</h3>

                {submitStatus === "success" && (
                  <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-2xl text-green-100">
                    Message envoyé avec succès! Nous vous répondrons dans les plus brefs délais.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-2xl text-red-100">
                    Une erreur est survenue. Veuillez réessayer plus tard.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Votre email"
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white"
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Votre message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white resize-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-black font-semibold py-3 rounded-2xl transition flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      "Envoyer"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
