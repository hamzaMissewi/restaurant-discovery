"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
    const { user } = useAuth();
    const { state } = useCart();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Connectez-vous pour accéder à votre panier</h2>
                    <p className="text-gray-600 mb-4">Vous devez être connecté pour voir votre panier et passer commande.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>
                    
                    {state.itemCount === 0 ? (
                        <div className="text-center py-16">
                            <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
                            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Votre panier est vide</h2>
                            <p className="text-gray-500 mb-6">Ajoutez des délicieux plats de nos restaurants pour commencer!</p>
                            <button
                                onClick={() => router.push("/")}
                                className="bg-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
                            >
                                Explorer les restaurants
                            </button>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="space-y-4">
                                    {state.items.map((item) => (
                                        <div key={item.id} className="bg-gray-50 rounded-xl p-6 flex gap-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-24 h-24 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                                <p className="text-sm text-gray-600 mb-2">{item.restaurantName}</p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => {
                                                                if (item.quantity > 1) {
                                                                    // Update quantity logic will be handled by Cart component
                                                                }
                                                            }}
                                                            className="w-8 h-8 rounded-lg bg-white border hover:bg-gray-100 flex items-center justify-center"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                                                        <button
                                                            className="w-8 h-8 rounded-lg bg-white border hover:bg-gray-100 flex items-center justify-center"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xl font-bold text-purple-600">
                                                            {(item.price * item.quantity).toFixed(2)} TND
                                                        </p>
                                                        <p className="text-sm text-gray-500">{item.price.toFixed(2)} TND chacun</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="lg:col-span-1">
                                <div className="bg-purple-50 rounded-xl p-6 sticky top-24">
                                    <h3 className="text-lg font-semibold mb-4">Récapitulatif de la commande</h3>
                                    
                                    <div className="space-y-2 mb-6">
                                        <div className="flex justify-between">
                                            <span>Sous-total</span>
                                            <span>{state.total.toFixed(2)} TND</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Livraison</span>
                                            <span>5.00 TND</span>
                                        </div>
                                        <div className="flex justify-between font-semibold text-lg border-t pt-2">
                                            <span>Total</span>
                                            <span className="text-purple-600">{(state.total + 5).toFixed(2)} TND</span>
                                        </div>
                                    </div>
                                    
                                    <button
                                        onClick={() => {
                                            // This will trigger the Cart component checkout
                                            const event = new CustomEvent('checkout');
                                            window.dispatchEvent(event);
                                        }}
                                        className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
                                    >
                                        Procéder au paiement
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
            <Cart />
        </>
    );
}
