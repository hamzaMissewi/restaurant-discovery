"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface QRCodeProps {
  address: string;
  restaurantName: string;
  size?: number;
}

export default function QRCodeAddress({ address, restaurantName, size = 200 }: QRCodeProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        // Create Google Maps URL for the address
        const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}`;
        
        // Generate QR code
        const url = await QRCode.toDataURL(mapUrl, {
          width: size,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });
        
        setQrCodeUrl(url);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQRCode();
  }, [address, size]);

  if (!qrCodeUrl) {
    return (
      <div className="flex items-center justify-center w-[200px] h-[200px] border-2 border-dashed border-gray-300 rounded-lg">
        <span className="text-gray-500">Loading QR Code...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative">
        <img 
          src={qrCodeUrl} 
          alt={`QR Code for ${restaurantName} location`}
          className="rounded-lg shadow-lg"
          style={{ width: size, height: size }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white p-1 rounded">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-purple-600"
            >
              <path 
                d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" 
                fill="currentColor"
              />
              <circle cx="12" cy="10" r="3" fill="white" />
            </svg>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-700">Scan for directions</p>
        <p className="text-xs text-gray-500 mt-1">Opens in Google Maps</p>
      </div>
    </div>
  );
}
