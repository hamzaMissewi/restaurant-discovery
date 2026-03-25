"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push('/client/login');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Redirection...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />

      {/* Client Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bienvenue, {user.name}
          </h1>
          <p className="text-gray-600">
            Accédez à votre espace client pour gérer vos commandes
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-red-500">
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              Nouvelle Commande
            </h3>
            <p className="text-gray-600">
              Passez votre commande rapidement
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              Mes Commandes
            </h3>
            <p className="text-gray-600">
              Consultez l'historique
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Profil
            </h3>
            <p className="text-gray-600">
              Gérez vos informations
            </p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Commandes Récentes
          </h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <p className="text-gray-500 text-center">
                Aucune commande récente
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
