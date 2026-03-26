import Link from "next/link";
import { User, Store, CreditCard, ShoppingCart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { usePathname } from "next/navigation";

export default function Header() {
    const { user, logout } = useAuth();
    const { state } = useCart();
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    return (
        <header className="bg-white border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex flex-col">
                    {isHomePage ? (
                        <span className="text-2xl font-bold text-purple-600">🌮 Food Hub</span>
                    ) : (
                        <Link href="/" className="text-2xl font-bold text-purple-600">🌮 Food Hub</Link>
                    )}
                    <span className="text-xs text-gray-600">Restaurant Management System</span>
                </div>

                <div className="flex items-center gap-3">
                    {user && (
                        <div className="hidden md:flex items-center gap-1 text-xs text-gray-600">
                            Bienvenue<span className="font-semibold text-black text-sm">{user.name}</span>
                        </div>
                    )}

                    <Link href="/about" className="lg:flex items-center gap-2 bg-blue-300 hover:bg-blue-400 text-black px-5 py-2 rounded-2xl font-medium text-sm text-nowrap hidden">À propos</Link>

                    {!user ? (
                        <>
                            <Link href="/register" className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-2xl font-medium text-sm">
                                <CreditCard className="w-4 h-4" />
                                S'inscrire
                            </Link>
                        </>
                    ) : (
                        <Link href="/client" className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-2xl font-medium text-sm">
                            <User className="w-4 h-4" />
                            Client
                        </Link>)}

                    <Link href="/restaurant" className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-2xl font-medium text-sm">
                        <Store className="w-4 h-4" />
                        Restaurant
                    </Link>
                    {user && (
                        <>
                            {pathname === "/client" &&
                                <Link href="/cart" className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-2xl font-medium text-sm relative">
                                    <ShoppingCart className="w-4 h-4" />
                                    Panier
                                    {state.itemCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                            {state.itemCount}
                                        </span>
                                    )}
                                </Link>
                            }
                            <button
                                onClick={logout}
                                className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-2xl font-medium text-sm"
                            >
                                Déconnexion
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header >
    );
}

export function Header0() {
    const { user } = useAuth();

    return (
        <header className="border-b bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-3xl font-bold text-red-600">KmandyFood</Link>

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