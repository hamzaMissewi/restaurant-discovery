"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <Header />
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md p-10">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-white">Hamza Kmandy Food</h1>
                        <p className="text-xl text-white/90 mt-3">Espace réservé aux restaurants</p>
                        <p className="text-purple-400 mt-1">ou <Link href="/register" className="underline">créer un compte</Link></p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="text-white/70 text-sm">Adresse e-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:border-purple-500 outline-none"
                                placeholder="votre@email.com"
                            />
                        </div>

                        <div>
                            <label className="text-white/70 text-sm">Mot de passe</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:border-purple-500 outline-none"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-white/70">
                                <input type="checkbox" className="accent-purple-600" /> Se souvenir de moi
                            </label>
                            <a href="#" className="text-purple-400 hover:underline">Mot de passe oublié ?</a>
                        </div>

                        <button
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 rounded-2xl text-lg transition"
                        >
                            Connexion
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}