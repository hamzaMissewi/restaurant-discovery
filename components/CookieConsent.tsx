"use client";

import { useCookieConsent } from "@/contexts/CookieConsentContext";

export default function CookieConsent() {
  // const [isVisible, setIsVisible] = useState(false);
  //   const [choice, setChoice] = useState<"accept" | "decline" | null>(null);
  //   useEffect(() => {
  //     // Check if user has already made a choice
  //     const savedChoice = localStorage.getItem('cookie-consent');
  //     if (!savedChoice) {
  //       setIsVisible(true);
  //     } else {
  //       setChoice(savedChoice as "accept" | "decline");
  //     }
  //   }, []);
  //   const handleAccept = () => {
  //     const consentChoice = "accept";
  //     localStorage.setItem('cookie-consent', consentChoice);
  //     setChoice(consentChoice);
  //     setIsVisible(false);

  //     // Here you can initialize analytics or other tracking
  //     if (typeof window !== 'undefined' && window.gtag) {
  //       window.gtag('consent', 'update', {
  //         'analytics_storage': 'granted'
  //       });
  //     }
  //   };
  //   const handleDecline = () => {
  //     const consentChoice = "decline";
  //     localStorage.setItem('cookie-consent', consentChoice);
  //     setChoice(consentChoice);
  //     setIsVisible(false);

  //     // Disable analytics
  //     if (typeof window !== 'undefined' && window.gtag) {
  //       window.gtag('consent', 'update', {
  //         'analytics_storage': 'denied'
  //       });
  //     }
  //   };
  //   if (!isVisible) return null;
  const { hasConsented, acceptAnalytics, declineAnalytics } = useCookieConsent();

  // Don't show if user has already made a choice
  if (hasConsented) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-2xl p-6 shadow-2xl border border-gray-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm leading-relaxed">
              We use analytics cookies to understand product usage and improve the experience.
              You can change this choice later in browser storage settings.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={declineAnalytics}
              className="px-4 py-2 text-sm font-medium border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={acceptAnalytics}
              className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Accept analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
