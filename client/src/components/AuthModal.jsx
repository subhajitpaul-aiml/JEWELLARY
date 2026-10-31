import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = () => {
  const {
    authModalOpen,
    authModalMode,
    setAuthModalOpen,
    setAuthModalMode,
    login,
    register,
    quickDemoLogin,
    loading,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (authModalMode === 'login') {
      const res = await login(email, password);
      if (!res.success) {
        setErrorMsg(res.message || 'Login failed');
      }
    } else {
      const res = await register(name, email, password, phone);
      if (!res.success) {
        setErrorMsg(res.message || 'Registration failed');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setAuthModalOpen(false)} />
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 z-10 animate-fadeIn">
          {/* Close button */}
          <button
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-5 right-5 p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition"
          >
            <X size={20} />
          </button>

          {/* Brand Monogram */}
          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-[#9B1139] to-[#C99757] flex items-center justify-center text-white shadow-md">
              <svg viewBox="0 0 100 100" className="w-7 h-7 fill-none stroke-white" strokeWidth="6">
                <polygon points="50,5 95,35 78,90 22,90 5,35" strokeLinecap="round" />
                <circle cx="50" cy="50" r="10" fill="#FFFFFF" />
              </svg>
            </div>
            <h2 className="font-serif-luxury text-2xl font-bold tracking-wide text-stone-900">
              {authModalMode === 'login' ? 'Welcome to Aurelia' : 'Join Aurelia Privé'}
            </h2>
            <p className="text-xs text-stone-500">
              {authModalMode === 'login'
                ? 'Sign in to access your wishlist, vault & bespoke orders'
                : 'Experience exclusive previews, lifetime guarantees & private consultations'}
            </p>
          </div>

          {/* Quick Demo Login Button for 1-Click Evaluation */}
          <div className="mb-5 p-3 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-amber-900">
              <Sparkles size={16} className="text-amber-600" />
              <div>
                <span className="font-semibold block">Quick Evaluator Sign-In</span>
                <span className="text-[11px] text-amber-700">Preloaded test customer profile</span>
              </div>
            </div>
            <button
              type="button"
              onClick={quickDemoLogin}
              className="px-3.5 py-1.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium text-xs rounded-xl transition shadow-xs"
            >
              1-Click Demo
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authModalMode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-3 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Priya Sharma"
                    className="w-full pl-10 pr-4 py-2.5 text-xs border border-stone-200 rounded-xl outline-none focus:border-[#9B1139]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-3 text-stone-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="priya@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs border border-stone-200 rounded-xl outline-none focus:border-[#9B1139]"
                />
              </div>
            </div>

            {authModalMode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-3 text-stone-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 text-xs border border-stone-200 rounded-xl outline-none focus:border-[#9B1139]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-3 text-stone-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-xs border border-stone-200 rounded-xl outline-none focus:border-[#9B1139]"
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded-lg font-medium">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#9B1139] to-[#7E0D2E] hover:from-[#7E0D2E] hover:to-[#5E0921] text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-md transition"
            >
              {loading ? 'Please wait...' : authModalMode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Toggle between Login and Register */}
          <div className="mt-5 text-center text-xs text-stone-600">
            {authModalMode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setAuthModalMode('register');
                  }}
                  className="text-[#9B1139] font-semibold hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setAuthModalMode('login');
                  }}
                  className="text-[#9B1139] font-semibold hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

