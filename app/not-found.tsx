"use client";

import { Home, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                {/* 404 Animation */}
                <div className="relative mb-8">
                    <div className="text-9xl font-bold text-indigo-600/20">404</div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/50">
                            <Search className="w-10 h-10 text-white" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
                <p className="text-slate-400 mb-8 leading-relaxed">
                    The page you're looking for doesn't exist or has been moved.
                    {/* This could be due to a broken link or the page may have been relocated in our app. */}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Home
                    </Link>
                </div>

                {/* Help Section */}
                {/* <div className="mt-12 p-4 rounded-lg bg-white/5 border border-white/10">
                    <h2 className="text-sm font-semibold text-white mb-2">Need Help?</h2>
                    <p className="text-xs text-slate-400 mb-3">
                        If you believe this is an error, please contact the CMS LS3 support team.
                    </p>
                    <div className="flex flex-col gap-2 text-xs">
                        <a href="mailto:support@cern.ch" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                            support@cern.ch
                        </a>
                        <a href="https://cms.cern" className="text-indigo-400 hover:text-indigo-300 transition-colors" target="_blank" rel="noopener noreferrer">
                            CMS Portal →
                        </a>
                    </div>
                </div> */}

                {/* Footer */}
                <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-[10px] text-slate-500">
                        Hamza TN - FoodHub © 2026
                    </p>
                </div>
            </div>
        </div>
    );
}
