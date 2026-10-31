import React, { useState } from 'react';
import { X, MapPin, CheckCircle, Truck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const PincodeModal = ({ isOpen, onClose }) => {
  const { deliveryPincode, setDeliveryPincode, setPincodeCity } = useCart();
  const [inputCode, setInputCode] = useState(deliveryPincode);
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const popularCities = [
    { city: 'Mumbai', pin: '400050', state: 'MH' },
    { city: 'New Delhi', pin: '110001', state: 'DL' },
    { city: 'Bengaluru', pin: '560001', state: 'KA' },
    { city: 'Chennai', pin: '600001', state: 'TN' },
    { city: 'Kolkata', pin: '700001', state: 'WB' },
    { city: 'Hyderabad', pin: '500001', state: 'TG' },
    { city: 'Pune', pin: '411001', state: 'MH' },
    { city: 'Ahmedabad', pin: '380001', state: 'GJ' },
  ];

  const handleSelectCity = (c) => {
    setDeliveryPincode(c.pin);
    setPincodeCity(`${c.city}, ${c.state}`);
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      onClose();
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCode.trim().length === 6) {
      setDeliveryPincode(inputCode.trim());
      setPincodeCity(`Pincode: ${inputCode.trim()}`);
      setConfirmed(true);
      setTimeout(() => {
        setConfirmed(false);
        onClose();
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-100 z-10 animate-fadeIn">
          <div className="flex justify-between items-center pb-4 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-[#9B1139]" />
              <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                Check Delivery & Stores
              </h3>
            </div>
            <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 rounded-full">
              <X size={20} />
            </button>
          </div>

          <p className="text-xs text-stone-500 mt-3">
            Enter your delivery postal pincode to see accurate delivery dates, COD availability, and nearby Aurelia ateliers.
          </p>

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input
              type="text"
              maxLength={6}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 6-digit Pincode"
              className="flex-1 px-4 py-2.5 text-sm border border-stone-200 rounded-xl outline-none focus:border-[#9B1139] tracking-widest font-mono"
            />
            <button
              type="submit"
              disabled={inputCode.length !== 6}
              className="px-5 py-2.5 bg-[#9B1139] hover:bg-[#7E0D2E] disabled:bg-stone-300 text-white font-semibold text-xs rounded-xl transition"
            >
              Verify
            </button>
          </form>

          {confirmed && (
            <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
              <CheckCircle size={16} className="text-emerald-600" />
              <span>Pincode saved! Express Insured Delivery available.</span>
            </div>
          )}

          <div className="mt-5">
            <p className="text-xs uppercase font-bold text-stone-400 tracking-wider mb-2.5">
              Popular Delivery Locations
            </p>
            <div className="grid grid-cols-2 gap-2">
              {popularCities.map((c) => (
                <button
                  key={c.pin}
                  onClick={() => handleSelectCity(c)}
                  className="flex items-center justify-between p-2.5 bg-stone-50 hover:bg-[#FAF4ED] hover:border-[#E2C799] border border-stone-200/80 rounded-xl text-left transition group text-xs"
                >
                  <span className="font-medium text-stone-800 group-hover:text-[#9B1139]">
                    {c.city}
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {c.pin}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-3 text-xs text-stone-500">
            <Truck size={18} className="text-[#9B1139] shrink-0" />
            <span>Complimentary Insured Shipping on all online orders across 19,000+ Indian pincodes.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

