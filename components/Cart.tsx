"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";

interface RestaurantData {
  restaurantId: number;
  restaurantName: string;
  items: any[];
}

interface ItemsByRestaurant {
  [key: number]: RestaurantData;
}

export default function Cart() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      alert("Veuillez vous connecter pour passer commande");
      return;
    }

    if (state.items.length === 0) {
      alert("Votre panier est vide");
      return;
    }

    setIsProcessing(true);

    try {
      // Group items by restaurant
      const itemsByRestaurant: ItemsByRestaurant = state.items.reduce((acc, item) => {
        if (!acc[item.restaurantId]) {
          acc[item.restaurantId] = {
            restaurantId: item.restaurantId,
            restaurantName: item.restaurantName,
            items: []
          };
        }
        acc[item.restaurantId].items.push(item);
        return acc;
      }, {} as ItemsByRestaurant);

      // For now, we'll handle single restaurant checkout
      // In a real app, you might want to handle multiple restaurants separately
      const restaurantData = Object.values(itemsByRestaurant)[0];

      if (!restaurantData) {
        alert("Erreur: aucune donnée de restaurant trouvée");
        return;
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: restaurantData.items,
          restaurantId: restaurantData.restaurantId,
          restaurantName: restaurantData.restaurantName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId,
        });

        if (error) {
          console.error('Stripe redirect error:', error);
          alert('Erreur lors de la redirection vers le paiement. Veuillez réessayer.');
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Listen for checkout event from cart page
  useEffect(() => {
    const handleCheckoutEvent = () => {
      handleCheckout();
    };

    window.addEventListener('checkout', handleCheckoutEvent);

    return () => {
      window.removeEventListener('checkout', handleCheckoutEvent);
    };
  }, [handleCheckout]);

  if (!user) {
    return null; // Don't show cart for non-logged-in users
  }

  if (state.itemCount === 0) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        >
          <ShoppingCart className="w-6 h-6" />
        </button>

        {isOpen && (
          <div className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl p-6 border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Your Cart</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors relative"
      >
        <ShoppingCart className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
          {state.itemCount}
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 bg-white rounded-2xl shadow-2xl border max-h-96 overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Your Cart</h3>
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto p-6">
            {state.items.map((item) => (
              <div key={item.id} className="flex gap-4 mb-4 pb-4 border-b last:border-b-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.restaurantName}</p>
                  <p className="text-purple-600 font-semibold mt-1">
                    {item.price.toFixed(2)} TND
                  </p>
                </div>
                <div className="flex flex-col items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="text-xl font-bold text-purple-600">
                {state.total.toFixed(2)} TND
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Traitement en cours...' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
