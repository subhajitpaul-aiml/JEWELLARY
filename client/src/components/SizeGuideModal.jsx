import React, { useState } from 'react';
import { X, Ruler, CheckCircle } from 'lucide-react';

export const SizeGuideModal = ({ isOpen, onClose, category = 'Rings' }) => {
  const [tab, setTab] = useState('rings');

  if (!isOpen) return null;

  const ringSizes = [
    { inSize: '10', usSize: '5.25', mm: '15.7 mm', circum: '49.3 mm' },
    { inSize: '12', usSize: '6.0', mm: '16.5 mm', circum: '51.8 mm' },
    { inSize: '14', usSize: '6.75', mm: '17.2 mm', circum: '54.0 mm' },
    { inSize: '16', usSize: '7.5', mm: '17.8 mm', circum: '55.9 mm' },
    { inSize: '18', usSize: '8.25', mm: '18.5 mm', circum: '58.1 mm' },
    { inSize: '20', usSize: '9.0', mm: '19.1 mm', circum: '60.0 mm' },
    { inSize: '22', usSize: '9.75', mm: '19.7 mm', circum: '61.9 mm' },
  ];

  const bangleSizes = [
    { size: '2.2', innerDia: '54.0 mm', circum: '169.6 mm' },
    { size: '2.4', innerDia: '57.2 mm', circum: '179.6 mm' },
    { size: '2.6', innerDia: '60.3 mm', circum: '189.4 mm' },
    { size: '2.8', innerDia: '63.5 mm', circum: '199.4 mm' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 z-10 animate-fadeIn">
          <div className="flex justify-between items-center pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Ruler size={20} className="text-[#9B1139]" />
              <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                Aurelia Sizing Concierge
              </h3>
            </div>
            <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="flex border-b border-stone-200 mt-4">
            <button
              onClick={() => setTab('rings')}
              className={`py-2 px-4 text-xs font-semibold tracking-wider uppercase border-b-2 transition ${
                tab === 'rings'
                  ? 'border-[#9B1139] text-[#9B1139]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Ring Size Chart
            </button>
            <button
              onClick={() => setTab('bangles')}
              className={`py-2 px-4 text-xs font-semibold tracking-wider uppercase border-b-2 transition ${
                tab === 'bangles'
                  ? 'border-[#9B1139] text-[#9B1139]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Bangle Size Chart
            </button>
          </div>

          {tab === 'rings' ? (
            <div className="mt-4">
              <p className="text-xs text-stone-500 mb-3">
                Measure the internal diameter of a ring that fits you comfortably, or wrap a thin strip of paper around your knuckle:
              </p>
              <div className="overflow-x-auto rounded-xl border border-stone-200">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FAF8F5] text-stone-700 font-semibold border-b border-stone-200">
                    <tr>
                      <th className="p-2.5">Indian Size</th>
                      <th className="p-2.5">US / UK Size</th>
                      <th className="p-2.5">Inner Diameter</th>
                      <th className="p-2.5">Circumference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {ringSizes.map((r) => (
                      <tr key={r.inSize} className="hover:bg-amber-50/50">
                        <td className="p-2.5 font-bold text-stone-900">{r.inSize}</td>
                        <td className="p-2.5 text-stone-600">{r.usSize}</td>
                        <td className="p-2.5 text-stone-600 font-mono">{r.mm}</td>
                        <td className="p-2.5 text-stone-600 font-mono">{r.circum}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-xs text-stone-500 mb-3">
                Measure an existing bangle that fits comfortably across its widest inner diameter:
              </p>
              <div className="overflow-x-auto rounded-xl border border-stone-200">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FAF8F5] text-stone-700 font-semibold border-b border-stone-200">
                    <tr>
                      <th className="p-2.5">Bangle Size (Anna)</th>
                      <th className="p-2.5">Inner Diameter</th>
                      <th className="p-2.5">Inner Circumference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {bangleSizes.map((b) => (
                      <tr key={b.size} className="hover:bg-amber-50/50">
                        <td className="p-2.5 font-bold text-stone-900">{b.size}</td>
                        <td className="p-2.5 text-stone-600 font-mono">{b.innerDia}</td>
                        <td className="p-2.5 text-stone-600 font-mono">{b.circum}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-5 p-3 bg-stone-50 rounded-xl flex items-center gap-2.5 text-xs text-stone-600">
            <CheckCircle size={16} className="text-emerald-600 shrink-0" />
            <span>Unsure about size? We offer free 15-day resizing & lifetime exchange on all rings.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

