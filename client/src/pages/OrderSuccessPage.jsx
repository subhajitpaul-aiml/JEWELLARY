import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  CheckCircle2,
  Package,
  Calendar,
  Printer,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/orders/${orderId}`);
        if (res.data) setOrder(res.data);
      } catch (err) {
        // Fallback to local storage
        const saved = localStorage.getItem('aurelia_last_order');
        if (saved) {
          setOrder(JSON.parse(saved));
        } else {
          setOrder({
            orderNumber: orderId.startsWith('AUR-') ? orderId : `AUR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            totalPrice: 34999,
            orderStatus: 'Confirmed',
            shippingAddress: {
              fullName: 'Priya Sharma',
              phone: '+91 98765 43210',
              city: 'Mumbai',
              state: 'Maharashtra',
              pincode: '400050',
            },
          });
        }
      }
    };

    fetchOrder();
  }, [orderId]);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Success Banner */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/90 shadow-sm text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center animate-bounce">
            <CheckCircle2 size={42} />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9B1139]">
              Thank You For Your Patronage
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
              Order Confirmed & In Studio
            </h1>
            <p className="text-xs text-stone-500 font-mono pt-1">
              Order ID: <strong className="text-stone-800">{order?.orderNumber || orderId}</strong>
            </p>
          </div>

          <div className="inline-flex items-center gap-2 p-3 bg-amber-50 border border-amber-200/80 rounded-2xl text-xs text-amber-900">
            <Calendar size={16} className="text-amber-700" />
            <span>Estimated Insured Handover by <strong>{formattedDelivery}</strong></span>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-xs space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Package size={18} className="text-[#9B1139]" />
              <h2 className="font-serif-luxury text-xl font-bold text-stone-900">
                Order Summary
              </h2>
            </div>
            <button
              onClick={() => window.print()}
              className="text-xs font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 rounded-xl transition"
            >
              <Printer size={14} />
              Print Invoice
            </button>
          </div>

          {/* Items if available */}
          {order?.orderItems && order.orderItems.length > 0 && (
            <div className="space-y-3 divide-y divide-stone-100">
              {order.orderItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 pt-3 first:pt-0">
                  <img
                    src={item.image || item.product?.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain rounded-xl bg-[#FAF9F7] border border-stone-100 p-1"
                  />
                  <div className="flex-1 text-xs">
                    <p className="font-semibold text-stone-900">{item.title}</p>
                    <p className="text-stone-500">
                      {item.selectedMetal} • Size: {item.selectedSize}
                    </p>
                    <p className="text-stone-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-stone-900">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Delivery & Billing Address */}
          {order?.shippingAddress && (
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 text-xs text-stone-600 space-y-1">
              <p className="font-bold text-stone-800 flex items-center gap-1.5">
                <MapPin size={14} className="text-[#9B1139]" />
                Shipping Destination:
              </p>
              <p>{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
              <p>Contact: {order.shippingAddress.phone}</p>
            </div>
          )}

          {/* Trust guarantee */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-stone-500">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span>Includes 15-Day Inspection Period & Lifetime Atelier Exchange Guarantee</span>
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
            <Link
              to="/jewellery"
              className="flex-1 py-3.5 bg-stone-900 hover:bg-[#9B1139] text-white text-xs uppercase tracking-widest font-semibold rounded-2xl text-center transition shadow-md"
            >
              Continue Exploring Collection
            </Link>
            <Link
              to="/account#orders"
              className="py-3.5 px-6 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-2xl text-center transition"
            >
              View Order Tracking
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

