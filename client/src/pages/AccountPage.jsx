import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  User,
  Package,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  LogOut,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AccountPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, setAuthModalOpen } = useAuth();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'profile'
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
    }
  }, [isAuthenticated, setAuthModalOpen]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      setLoadingOrders(true);
      try {
        const res = await axios.get('/api/orders/user/myorders');
        if (res.data && res.data.length > 0) {
          setOrders(res.data);
        } else {
          // Check local last order
          const last = localStorage.getItem('aurelia_last_order');
          if (last) setOrders([JSON.parse(last)]);
        }
      } catch (err) {
        const last = localStorage.getItem('aurelia_last_order');
        if (last) setOrders([JSON.parse(last)]);
      } finally {
        setLoadingOrders(false);
      }
    };

    if (isAuthenticated) {
      fetchUserOrders();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] bg-[#FAF8F5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-stone-200 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FAF4ED] text-[#9B1139] mx-auto flex items-center justify-center">
            <User size={32} />
          </div>
          <h2 className="font-serif-luxury text-2xl font-bold text-stone-900">Sign In to Aurelia Privé</h2>
          <p className="text-xs text-stone-500">Access your private jewellery orders, addresses & certificates</p>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="w-full py-3 bg-[#9B1139] hover:bg-[#7E0D2E] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition shadow-md"
          >
            Sign In / Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Card Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#9B1139] to-[#C99757] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
              {user?.name?.charAt(0) || 'P'}
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900">
                  {user?.name || 'Priya Sharma'}
                </h1>
                <span className="px-2.5 py-0.5 bg-amber-50 text-amber-900 text-[10px] font-bold uppercase tracking-wider rounded-full border border-amber-200">
                  Privé Member
                </span>
              </div>
              <p className="text-xs text-stone-500">{user?.email}</p>
              <p className="text-xs text-stone-500">{user?.phone || '+91 98765 43210'}</p>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-1.5 px-4 py-2 border border-stone-200 hover:border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-semibold rounded-xl transition"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 text-xs font-bold uppercase tracking-wider space-x-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 transition flex items-center gap-2 border-b-2 ${
              activeTab === 'orders'
                ? 'border-[#9B1139] text-[#9B1139]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Package size={15} />
            <span>Orders & Bespoke Tracking ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 transition flex items-center gap-2 border-b-2 ${
              activeTab === 'addresses'
                ? 'border-[#9B1139] text-[#9B1139]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <MapPin size={15} />
            <span>Saved Addresses</span>
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/90 shadow-xs space-y-3">
                <Package size={36} className="mx-auto text-stone-400" />
                <h3 className="font-serif-luxury text-xl font-bold text-stone-800">No Orders Yet</h3>
                <p className="text-xs text-stone-500">Your future heirloom jewelry orders will appear here.</p>
                <Link
                  to="/jewellery"
                  className="inline-block mt-3 px-6 py-2.5 bg-stone-900 hover:bg-[#9B1139] text-white text-xs font-semibold rounded-xl transition"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              orders.map((ord, idx) => (
                <div
                  key={ord._id || ord.orderNumber || idx}
                  className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-7 shadow-xs space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                        Order Number
                      </span>
                      <p className="text-sm font-bold text-stone-900 font-mono">
                        {ord.orderNumber}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-stone-400">Date</span>
                        <p className="font-medium text-stone-700">
                          {new Date(ord.createdAt || Date.now()).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-stone-400">Total</span>
                        <p className="font-bold text-[#9B1139]">
                          ₹{ord.totalPrice?.toLocaleString('en-IN')}
                        </p>
                      </div>

                      <span className="px-3 py-1 bg-purple-50 text-purple-900 font-bold text-[11px] rounded-full border border-purple-200">
                        {ord.orderStatus || 'Confirmed & In Studio'}
                      </span>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="p-4 bg-[#FAF9F7] rounded-2xl border border-stone-100">
                    <p className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <Clock size={14} className="text-[#9B1139]" />
                      Crafting & Delivery Milestones
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="space-y-1">
                        <div className="w-8 h-8 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <CheckCircle2 size={16} />
                        </div>
                        <p className="text-xs font-bold text-stone-900">Order Placed</p>
                        <p className="text-[10px] text-stone-400">Payment Verified</p>
                      </div>

                      <div className="space-y-1">
                        <div className="w-8 h-8 mx-auto rounded-full bg-[#9B1139] text-white flex items-center justify-center animate-pulse">
                          <Sparkles size={16} />
                        </div>
                        <p className="text-xs font-bold text-stone-900">Crafting in Studio</p>
                        <p className="text-[10px] text-stone-400">Master Goldsmith</p>
                      </div>

                      <div className="space-y-1 opacity-50">
                        <div className="w-8 h-8 mx-auto rounded-full bg-stone-300 text-stone-600 flex items-center justify-center">
                          <ShieldCheck size={16} />
                        </div>
                        <p className="text-xs font-bold text-stone-900">IGI Certification</p>
                        <p className="text-[10px] text-stone-400">Hallmark Stamping</p>
                      </div>

                      <div className="space-y-1 opacity-50">
                        <div className="w-8 h-8 mx-auto rounded-full bg-stone-300 text-stone-600 flex items-center justify-center">
                          <Package size={16} />
                        </div>
                        <p className="text-xs font-bold text-stone-900">Armored Transit</p>
                        <p className="text-[10px] text-stone-400">Insured Delivery</p>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  {ord.orderItems && (
                    <div className="divide-y divide-stone-100">
                      {ord.orderItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-4 py-3 first:pt-0">
                          <img
                            src={item.image || item.product?.image}
                            alt=""
                            className="w-14 h-14 object-contain rounded-xl bg-white border border-stone-100 p-1"
                          />
                          <div className="flex-1 text-xs">
                            <p className="font-semibold text-stone-900">{item.title}</p>
                            <p className="text-stone-500">
                              {item.selectedMetal} • Size: {item.selectedSize} • Qty: {item.quantity}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-stone-900">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border-2 border-[#9B1139] shadow-xs space-y-3 relative">
              <span className="px-2.5 py-0.5 bg-[#FAF4ED] text-[#9B1139] text-[10px] font-bold uppercase rounded-full">
                Primary Shipping Address
              </span>
              <div className="text-xs text-stone-700 space-y-1 pt-1">
                <p className="font-bold text-sm text-stone-900">Priya Sharma</p>
                <p>42, Boulevard Heights, Bandra West</p>
                <p>Near Carter Road Promenade</p>
                <p>Mumbai, Maharashtra - 400050</p>
                <p>Mobile: +91 98765 43210</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

