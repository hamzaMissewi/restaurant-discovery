import Link from "next/link";
import { User, Store } from "lucide-react";

export function Header0() {
    return (
        <header className="border-b bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-3xl font-bold text-red-600">FoodHub</Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="/">Accueil</Link>
                    <Link href="/about">À propos</Link>
                    <Link href="/shop">Espace Restaurant</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <button className="text-sm font-medium border border-gray-300 px-5 py-2 rounded-2xl hover:bg-gray-50">
                        Connexion
                    </button>
                    <button className="bg-red-600 text-white px-6 py-2 rounded-2xl font-medium">
                        Commander
                    </button>
                </div>
            </div>
        </header>
    );
}

export default function Header() {
    return (
        <header className="bg-white border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-purple-600">🌮 Kmandy Food</Link>

                <div className="flex items-center gap-3">
                    <Link href="/client" className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-2xl font-medium text-sm">
                        <User className="w-4 h-4" />
                        Client
                    </Link>
                    <Link href="/restaurant" className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-2xl font-medium text-sm">
                        <Store className="w-4 h-4" />
                        Restaurant
                    </Link>
                </div>
            </div>
        </header>
    );
}