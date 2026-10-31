import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    coupon,
    couponDiscount,
    finalTotal,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponMsg, setCouponMsg] = useState({ text: '', type: '' });

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = await applyCoupon(couponCodeInput.trim());
    if (res.success) {
      setCouponMsg({ text: res.message, type: 'success' });
      setCouponCodeInput('');
    } else {
      setCouponMsg({ text: res.message, type: 'error' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#9B1139]" />
              <h2 className="font-serif-luxury text-xl font-bold tracking-wide text-stone-900">
                Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/50 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-stone-100">
            {cartItems.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF4ED] text-[#9B1139] flex items-center justify-center">
                  <ShoppingBag size={32} />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-xl font-semibold text-stone-800">Your bag is empty</h3>
                  <p className="text-xs text-stone-500 mt-1">Discover handcrafted fine jewellery creations</p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/jewellery');
                  }}
                  className="mt-4 px-6 py-2.5 bg-stone-900 hover:bg-[#9B1139] text-white text-xs font-semibold rounded-full uppercase tracking-wider transition shadow-md"
                >
                  Explore Jewellery
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.cartItemId} className="flex gap-4 pt-4 first:pt-0">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-20 h-20 object-contain rounded-xl border border-stone-100 bg-[#FAF9F7] p-1.5"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link
                            to={`/product/${item.product.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="text-xs font-semibold text-stone-800 hover:text-[#9B1139] line-clamp-1"
                          >
                            {item.product.title}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-stone-400 hover:text-rose-600 p-1"
                            title="Remove"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          {item.selectedMetal} • Size: {item.selectedSize}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50 text-xs">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="px-2.5 py-1 hover:bg-stone-200 text-stone-600 font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 font-medium text-stone-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="px-2.5 py-1 hover:bg-stone-200 text-stone-600 font-bold"
                          >
                            +
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <span className="text-xs font-bold text-stone-900">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#FAF8F5] space-y-4">
              {/* Coupon Code Section */}
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                {coupon ? (
                  <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                      <Tag size={13} />
                      {coupon.code} applied (-₹{couponDiscount.toLocaleString('en-IN')})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-400 hover:text-rose-600 font-medium text-[11px]"
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
                      placeholder="Coupon Code (e.g. LUXE20)"
                      className="flex-1 px-3 py-1.5 text-xs border border-stone-200 rounded-lg outline-none uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-stone-800 hover:bg-[#9B1139] text-white text-xs font-semibold rounded-lg transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMsg.text && (
                  <p
                    className={`text-[10px] mt-1.5 font-medium ${
                      couponMsg.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {couponMsg.text}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon Savings</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Express Delivery</span>
                  <span className="text-emerald-700 font-semibold uppercase text-[10px]">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (3%)</span>
                  <span>Included</span>
                </div>
                <div className="border-t border-stone-200 pt-2 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-stone-900">Total Payable</span>
                  <span className="text-base font-bold text-[#9B1139]">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Security info */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>100% Certified Diamonds • 15-Day Return Policy</span>
              </div>

              {/* Checkout & View Bag Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#9B1139] to-[#7B0D2D] hover:from-[#7B0D2D] hover:to-[#5E0921] text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs rounded-xl transition"
                >
                  View Full Bag Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

