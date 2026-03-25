"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function ClientLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/client");
      } else {
        setError("Échec de la connexion. Veuillez vérifier vos identifiants.");
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Connexion Client
              </h2>
              <p className="text-gray-600 mb-8">
                Accédez à votre espace client pour commander vos plats préférés
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="•••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Connexion en cours...
                    </>
                  ) : (
                    "Se connecter"
                  )}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="text-center">
                <Link href="/client/forgot-password" className="text-sm text-red-600 hover:text-red-500">
                  Mot de passe oublié?
                </Link>
              </div>
            </form>

            {/* Social Login */}
            <div className="mt-6 border-t pt-6">
              <div className="text-center text-sm text-gray-600 mb-4">
                Ou connectez-vous avec
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <div className="w-5 h-5 text-blue-600" />
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <div className="w-5 h-5 text-blue-600" />
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
