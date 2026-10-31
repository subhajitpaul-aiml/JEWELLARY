import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X, Filter, Sparkles, Store } from 'lucide-react';

export const FilterSidebar = ({
  filters,
  setFilters,
  onClearAll,
  activeCount,
  availableCategories = [],
  totalResults = 0,
}) => {
  const [openSections, setOpenSections] = useState({
    price: true,
    metal: true,
    gender: true,
    productType: true,
    diamond: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const priceRanges = [
    { label: 'Under ₹10,000', min: 0, max: 10000, key: '0-10000' },
    { label: '₹10,001 - ₹20,000', min: 10001, max: 20000, key: '10001-20000' },
    { label: '₹20,001 - ₹30,000', min: 20001, max: 30000, key: '20001-30000' },
    { label: '₹30,001 - ₹50,000', min: 30001, max: 50000, key: '30001-50000' },
    { label: '₹50,001 - ₹1,00,000', min: 50001, max: 100000, key: '50001-100000' },
    { label: 'Above ₹1,00,000', min: 100001, max: 1000000, key: '100001+' },
  ];

  const metalOptions = [
    '14 KT Yellow Gold',
    '18 KT Yellow Gold',
    '14 KT Rose Gold',
    '18 KT Rose Gold',
    '18 KT White Gold',
    'Platinum 950',
    '925 Sterling Silver',
  ];

  const genderOptions = ['Women', 'Men', 'Unisex', 'Kids'];

  const diamondClarityOptions = ['FG-SI', 'GH-VS', 'VVS-EF', 'Uncut Polki'];

  const subcategoryOptions = [
    'Solitaire',
    'Bands',
    'Cocktail',
    'Studs',
    'Drops',
    'Hoops',
    'Jhumkis',
    'Tennis Bracelets',
    'Modern Minimalist',
    'Chokers',
    'Alphabet',
  ];

  const handlePriceSelect = (r) => {
    if (filters.priceRangeKey === r.key) {
      setFilters((prev) => ({ ...prev, priceRangeKey: null, minPrice: null, maxPrice: null }));
    } else {
      setFilters((prev) => ({ ...prev, priceRangeKey: r.key, minPrice: r.min, maxPrice: r.max }));
    }
  };

  const handleMetalToggle = (metal) => {
    setFilters((prev) => ({
      ...prev,
      metal: prev.metal === metal ? '' : metal,
    }));
  };

  const handleGenderToggle = (gender) => {
    setFilters((prev) => ({
      ...prev,
      gender: prev.gender === gender ? 'All' : gender,
    }));
  };

  const handleSubcategoryToggle = (sub) => {
    setFilters((prev) => ({
      ...prev,
      subcategory: prev.subcategory === sub ? '' : sub,
    }));
  };

  const handleDiamondToggle = (clarity) => {
    setFilters((prev) => ({
      ...prev,
      diamondClarity: prev.diamondClarity === clarity ? '' : clarity,
    }));
  };

  return (
    <aside className="w-full bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs space-y-6">
      {/* Header (Matches screenshot 2) */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-[#9B1139]" />
          <h3 className="font-semibold text-sm text-stone-900 tracking-wide uppercase">
            Filters {activeCount > 0 && `(${activeCount})`}
          </h3>
        </div>
        {activeCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs font-semibold text-[#9B1139] hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Active Filter Chips (Matches screenshot 2: "Earrings x", "Men x") */}
      {activeCount > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {filters.category && filters.category !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-800 border border-stone-200">
              {filters.category}
              <button
                onClick={() => setFilters((prev) => ({ ...prev, category: 'All' }))}
                className="hover:text-rose-600"
              >
                <X size={12} />
              </button>
            </span>
          )}

          {filters.subcategory && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-800 border border-stone-200">
              {filters.subcategory}
              <button
                onClick={() => setFilters((prev) => ({ ...prev, subcategory: '' }))}
                className="hover:text-rose-600"
              >
                <X size={12} />
              </button>
            </span>
          )}

          {filters.gender && filters.gender !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-800 border border-stone-200">
              {filters.gender}
              <button
                onClick={() => setFilters((prev) => ({ ...prev, gender: 'All' }))}
                className="hover:text-rose-600"
              >
                <X size={12} />
              </button>
            </span>
          )}

          {filters.metal && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-800 border border-stone-200">
              {filters.metal}
              <button
                onClick={() => setFilters((prev) => ({ ...prev, metal: '' }))}
                className="hover:text-rose-600"
              >
                <X size={12} />
              </button>
            </span>
          )}

          {filters.priceRangeKey && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-800 border border-stone-200">
              {priceRanges.find((r) => r.key === filters.priceRangeKey)?.label}
              <button
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    priceRangeKey: null,
                    minPrice: null,
                    maxPrice: null,
                  }))
                }
                className="hover:text-rose-600"
              >
                <X size={12} />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Store Pickup Toggle (Matches screenshot 2) */}
      <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200/80">
        <div className="flex items-center gap-2">
          <Store size={16} className="text-stone-600" />
          <span className="text-xs font-medium text-stone-800">Store Pickup</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={!!filters.storePickup}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, storePickup: e.target.checked }))
            }
            className="sr-only peer"
          />
          <div className="w-8 h-4 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#9B1139]" />
        </label>
      </div>

      {/* Accordion 1: Price (Matches screenshot 2) */}
      <div className="border-t border-stone-100 pt-4">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex justify-between items-center text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5"
        >
          <span>Price</span>
          {openSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSections.price && (
          <div className="space-y-2 mt-2">
            {priceRanges.map((r) => {
              const isChecked = filters.priceRangeKey === r.key;
              return (
                <label
                  key={r.key}
                  className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer hover:text-stone-900 select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handlePriceSelect(r)}
                    className="w-4 h-4 rounded text-[#9B1139] border-stone-300 focus:ring-[#9B1139] cursor-pointer"
                  />
                  <span>{r.label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion 2: Product Type / Subcategory */}
      <div className="border-t border-stone-100 pt-4">
        <button
          onClick={() => toggleSection('productType')}
          className="w-full flex justify-between items-center text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5"
        >
          <span>Product Type</span>
          {openSections.productType ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSections.productType && (
          <div className="space-y-1.5 mt-2 max-h-48 overflow-y-auto pr-1">
            {subcategoryOptions.map((sub) => {
              const isChecked = filters.subcategory === sub;
              return (
                <label
                  key={sub}
                  className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer hover:text-stone-900 select-none py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleSubcategoryToggle(sub)}
                    className="w-4 h-4 rounded text-[#9B1139] border-stone-300 focus:ring-[#9B1139] cursor-pointer"
                  />
                  <span>{sub}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion 3: Material & Metal */}
      <div className="border-t border-stone-100 pt-4">
        <button
          onClick={() => toggleSection('metal')}
          className="w-full flex justify-between items-center text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5"
        >
          <span>Metal & Purity</span>
          {openSections.metal ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSections.metal && (
          <div className="space-y-1.5 mt-2">
            {metalOptions.map((m) => {
              const isChecked = filters.metal === m;
              return (
                <label
                  key={m}
                  className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer hover:text-stone-900 select-none py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleMetalToggle(m)}
                    className="w-4 h-4 rounded text-[#9B1139] border-stone-300 focus:ring-[#9B1139] cursor-pointer"
                  />
                  <span>{m}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion 4: Gender */}
      <div className="border-t border-stone-100 pt-4">
        <button
          onClick={() => toggleSection('gender')}
          className="w-full flex justify-between items-center text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5"
        >
          <span>Gender</span>
          {openSections.gender ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSections.gender && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {genderOptions.map((g) => {
              const isSelected = filters.gender === g;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => handleGenderToggle(g)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                    isSelected
                      ? 'border-[#9B1139] bg-[#FAF4ED] text-[#9B1139] font-bold'
                      : 'border-stone-200 text-stone-700 hover:border-stone-400'
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion 5: Diamond Clarity */}
      <div className="border-t border-stone-100 pt-4">
        <button
          onClick={() => toggleSection('diamond')}
          className="w-full flex justify-between items-center text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5"
        >
          <span>Diamond Quality</span>
          {openSections.diamond ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSections.diamond && (
          <div className="space-y-1.5 mt-2">
            {diamondClarityOptions.map((d) => {
              const isChecked = filters.diamondClarity === d;
              return (
                <label
                  key={d}
                  className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer hover:text-stone-900 select-none py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleDiamondToggle(d)}
                    className="w-4 h-4 rounded text-[#9B1139] border-stone-300 focus:ring-[#9B1139] cursor-pointer"
                  />
                  <span>{d}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
};

