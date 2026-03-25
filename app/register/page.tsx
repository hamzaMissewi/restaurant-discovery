"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail, User, Building2 } from "lucide-react";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        institute: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    institute: formData.institute,
                }),
            });

            if (res.ok) {
                router.push("/login?message=Account created successfully. Please sign in.");
            } else {
                const data = await res.json();
                setError(data.error || "Failed to create account.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }

        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-900/50">
                        <span className="text-white font-black text-lg">FoodHub</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white">Create Account</h1>
                    <p className="text-slate-400 text-sm mt-1">FoodHub - Restaurant Management System</p>
                </div>

                {/* Card */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs font-medium text-slate-300 mb-1.5 block">Full Name</label>
                            <div className="relative">
                                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-9 pr-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-slate-300 mb-1.5 block">Email</label>
                            <div className="relative">
                                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-9 pr-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="your.email@cern.ch"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-slate-300 mb-1.5 block">Institute</label>
                            <div className="relative">
                                <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    value={formData.institute}
                                    onChange={e => setFormData({ ...formData, institute: e.target.value })}
                                    className="w-full pl-9 pr-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Your institute name"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-slate-300 mb-1.5 block">Password</label>
                            <div className="relative">
                                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-9 pr-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Create a password"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-slate-300 mb-1.5 block">Confirm Password</label>
                            <div className="relative">
                                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="w-full pl-9 pr-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Confirm your password"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-xs text-red-400 bg-red-900/20 border border-red-800/40 rounded-lg px-3 py-2">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                        >
                            {loading && <Loader2 size={14} className="animate-spin" />}
                            Create Account
                        </button>
                    </form>

                    <div className="mt-4 pt-4 border-t border-white/10 text-center">
                        <p className="text-xs text-slate-400">
                            Already have an account?{" "}
                            <a href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>

                <p className="text-center text-xs text-slate-600 mt-4">
                    {/* CERN CMS — Long Shutdown 3 · Restricted Access */}
                    Food Hub - Restaurant Management System · Restricted Access
                </p>
            </div>
        </div>
    );
}
