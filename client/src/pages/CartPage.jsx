import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  RotateCcw,
  Truck,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    originalTotal,
    mrpSavings,
    coupon,
    couponDiscount,
    finalTotal,
    applyCoupon,
    removeCoupon,
    deliveryPincode,
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponStatus, setCouponStatus] = useState({ text: '', type: '' });

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = await applyCoupon(couponCodeInput.trim());
    if (res.success) {
      setCouponStatus({ text: res.message, type: 'success' });
      setCouponCodeInput('');
    } else {
      setCouponStatus({ text: res.message, type: 'error' });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF8F5] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-sm">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#FAF4ED] text-[#9B1139] flex items-center justify-center">
            <ShoppingBag size={36} />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif-luxury text-3xl font-bold text-stone-900">
              Your Bag is Empty
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              You haven't added any luxury pieces yet. Explore our handcrafted gold and diamond collections.
            </p>
          </div>
          <Link
            to="/jewellery"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-[#9B1139] text-white text-xs uppercase tracking-widest font-semibold rounded-full shadow-md hover:shadow-xl transition-all"
          >
            <span>Start Shopping</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
            Shopping Bag{' '}
            <span className="text-sm font-sans font-normal text-stone-500">
              ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items)
            </span>
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Complimentary insured express shipping applied for pincode: <strong>{deliveryPincode}</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Cart Items List (Cols 1-8) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden divide-y divide-stone-100">
              {cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-24 h-24 object-contain rounded-2xl bg-[#FAF9F7] border border-stone-100 p-2 shrink-0"
                    />
                    <div className="space-y-1">
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="font-serif-luxury text-lg font-bold text-stone-900 hover:text-[#9B1139] transition-colors line-clamp-1"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-xs text-stone-500">
                        {item.selectedMetal} • Size: {item.selectedSize}
                      </p>
                      <p className="text-xs text-stone-500">
                        Purity: {item.product.purity || '14 KT'} | Clarity: {item.product.diamondClarity || 'FG-SI'}
                      </p>
                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="text-base font-bold text-stone-900">
                          ₹{item.product.price?.toLocaleString('en-IN')}
                        </span>
                        {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                          <span className="text-xs text-stone-400 line-through">
                            ₹{item.product.originalPrice?.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50 text-xs">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="px-3 py-1.5 hover:bg-stone-200 font-bold text-stone-600"
                      >
                        -
                      </button>
                      <span className="px-3 font-semibold text-stone-800">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="px-3 py-1.5 hover:bg-stone-200 font-bold text-stone-600"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-base font-bold text-stone-900">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-stone-400 hover:text-rose-600 text-xs flex items-center gap-1 mt-1 transition"
                      >
                        <Trash2 size={13} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Assurances Under Cart */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-stone-200 text-center space-y-1">
                <ShieldCheck size={20} className="mx-auto text-[#9B1139]" />
                <p className="text-xs font-bold text-stone-800">100% Certified Diamonds</p>
                <p className="text-[11px] text-stone-500">BIS Hallmark & IGI Certificate</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-stone-200 text-center space-y-1">
                <RotateCcw size={20} className="mx-auto text-[#9B1139]" />
                <p className="text-xs font-bold text-stone-800">15-Day Free Returns</p>
                <p className="text-[11px] text-stone-500">100% Money Back Guarantee</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-stone-200 text-center space-y-1">
                <Truck size={20} className="mx-auto text-[#9B1139]" />
                <p className="text-xs font-bold text-stone-800">Free Insured Transit</p>
                <p className="text-[11px] text-stone-500">Safe doorstep delivery</p>
              </div>
            </div>
          </div>

          {/* Right: Order Summary Card (Cols 9-12) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Coupon Card */}
            <div className="bg-white p-5 rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Tag size={15} className="text-[#9B1139]" />
                  Apply Coupon Code
                </span>
              </div>

              {coupon ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-emerald-800">{coupon.code}</span>
                    <p className="text-[11px] text-emerald-600">{coupon.description}</p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-rose-600 font-semibold text-xs"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    placeholder="Enter Coupon (LUXE20)"
                    className="flex-1 px-3.5 py-2 text-xs border border-stone-200 rounded-xl outline-none uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 hover:bg-[#9B1139] text-white text-xs font-semibold rounded-xl transition"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponStatus.text && (
                <p
                  className={`text-xs font-medium ${
                    couponStatus.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {couponStatus.text}
                </p>
              )}

              <div className="pt-2 flex flex-wrap gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => applyCoupon('LUXE20')}
                  className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-md font-mono"
                >
                  LUXE20 (20% Off)
                </button>
                <button
                  type="button"
                  onClick={() => applyCoupon('FIRSTBUY')}
                  className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-md font-mono"
                >
                  FIRSTBUY (₹2,000 Off)
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
              <h3 className="font-serif-luxury text-xl font-bold text-stone-900 pb-3 border-b border-stone-100">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Total MRP Value</span>
                  <span className="font-semibold text-stone-800">
                    ₹{originalTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {mrpSavings > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Atelier Discount</span>
                    <span>-₹{mrpSavings.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon ({coupon.code})</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span className="text-emerald-700 font-bold uppercase text-[10px]">
                    FREE
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Applicable GST (3%)</span>
                  <span>Included</span>
                </div>

                <div className="border-t border-stone-200 pt-3 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-stone-900">Total Amount</span>
                  <span className="text-2xl font-bold text-[#9B1139]">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-gradient-to-r from-[#9B1139] to-[#7B0D2D] hover:from-[#7B0D2D] hover:to-[#5E0921] text-white font-bold text-xs uppercase tracking-widest rounded-2xl shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

