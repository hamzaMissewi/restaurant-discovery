"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, options?: Record<string, any>) => void;
  }
}

interface CookieConsentContextType {
  consent: "accept" | "decline" | null;
  hasConsented: boolean;
  acceptAnalytics: () => void;
  declineAnalytics: () => void;
  resetConsent: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<"accept" | "decline" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage first
    const savedConsent = localStorage.getItem('cookie-consent') as "accept" | "decline" | null;

    if (savedConsent) {
      setConsent(savedConsent);
      // Initialize analytics consent if previously accepted
      if (savedConsent === "accept" && typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted'
        });
      }
    }

    setIsLoading(false);
  }, []);

  const acceptAnalytics = async () => {
    const consentChoice = "accept";

    // Save to localStorage
    localStorage.setItem('cookie-consent', consentChoice);
    setConsent(consentChoice);

    // Update Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }

    // Save to database for logged-in users
    try {
      // Get user info from auth context or localStorage
      const userInfo = localStorage.getItem('user');
      if (userInfo) {
        const user = JSON.parse(userInfo);

        // Generate a simple user ID from email for demo (in production, use actual user ID)
        const userId = user.email.replace(/[^a-zA-Z0-9]/g, '_');

        await fetch('/api/cookie-consent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            consent: consentChoice,
            userId: userId,
            email: user.email,
            name: user.name
          }),
        });
      }
    } catch (error) {
      console.error('Failed to save consent to database:', error);
      // Don't show error to user as localStorage already saved
    }
  };

  const declineAnalytics = async () => {
    const consentChoice = "decline";

    // Save to localStorage
    localStorage.setItem('cookie-consent', consentChoice);
    setConsent(consentChoice);

    // Update Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }

    // Save to database for logged-in users
    try {
      const userInfo = localStorage.getItem('user');
      if (userInfo) {
        const user = JSON.parse(userInfo);
        const userId = user.email.replace(/[^a-zA-Z0-9]/g, '_');

        await fetch('/api/cookie-consent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            consent: consentChoice,
            userId: userId,
            email: user.email,
            name: user.name
          }),
        });
      }
    } catch (error) {
      console.error('Failed to save consent to database:', error);
      // Don't show error to user as localStorage already saved
    }
  };

  const resetConsent = () => {
    localStorage.removeItem('cookie-consent');
    setConsent(null);

    // Reset analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  };

  const hasConsented = consent !== null;

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasConsented,
        acceptAnalytics,
        declineAnalytics,
        resetConsent
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}
