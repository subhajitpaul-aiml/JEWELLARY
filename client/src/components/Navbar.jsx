import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  MapPin,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  Phone,
  ShieldCheck,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { navigationCategories } from '../data/categoriesData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { mockProducts } from '../data/mockProducts';

export const Navbar = ({ onOpenPincodeModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItemsCount, subtotal, setIsCartOpen, deliveryPincode, pincodeCity } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout, setAuthModalOpen, setAuthModalMode } = useAuth();

  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const searchRef = useRef(null);
  const megaMenuTimeoutRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setSearchFocused(false);
  }, [location.pathname]);

  // Click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle live search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(`/api/products?search=${encodeURIComponent(searchQuery)}`);
        if (res.data && res.data.length > 0) {
          setSearchResults(res.data.slice(0, 5));
        } else {
          // Client-side fallback search
          const filtered = mockProducts.filter(
            (p) =>
              p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearchResults(filtered.slice(0, 5));
        }
      } catch (err) {
        const filtered = mockProducts.filter(
          (p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered.slice(0, 5));
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchFocused(false);
      navigate(`/jewellery?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleMouseEnter = (catName) => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setActiveMegaMenu(catName);
  };

  const handleMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  const currentMegaCategory = navigationCategories.find((c) => c.name === activeMegaMenu);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
      {/* 1. Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#4A1525] via-[#631834] to-[#4A1525] text-[#FDF8F0] text-xs py-2 px-4 font-normal tracking-wide flex justify-between items-center border-b border-[#5e1933]">
        <div className="hidden md:flex items-center space-x-6 text-[11px] opacity-90">
          <span className="flex items-center gap-1.5 hover:text-[#E2C799] transition cursor-pointer" onClick={onOpenPincodeModal}>
            <MapPin size={12} className="text-[#E2C799]" />
            Deliver to: <strong className="underline underline-offset-2">{pincodeCity || deliveryPincode}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-[#E2C799]" />
            100% Certified Diamond & Gold • 15-Day Free Returns
          </span>
        </div>

        <div className="mx-auto md:mx-0 flex items-center gap-2 font-medium">
          <Sparkles size={13} className="text-[#E2C799] animate-pulse" />
          <span>FESTIVE LUXE: Flat 20% Off on Diamond Making Charges</span>
          <span className="hidden sm:inline bg-[#E2C799] text-[#4A1525] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ml-1">
            CODE: LUXE20
          </span>
        </div>

        <div className="hidden lg:flex items-center space-x-4 text-[11px]">
          <Link to="/contact" className="hover:text-[#E2C799] transition">24x7 Concierge</Link>
          <span>•</span>
          <span className="hover:text-[#E2C799] transition cursor-pointer">IN (₹)</span>
        </div>
      </div>

      {/* 2. Main Brand Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-stone-700 hover:text-stone-900 focus:outline-none"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9B1139] to-[#C99757] flex items-center justify-center shadow-md shadow-[#9B1139]/20 group-hover:rotate-12 transition-transform duration-300">
            <svg viewBox="0 0 100 100" className="w-6 h-6 fill-none stroke-white" strokeWidth="6">
              <polygon points="50,5 95,35 78,90 22,90 5,35" strokeLinecap="round" strokeLinejoin="round" />
              <polygon points="50,24 75,42 66,76 34,76 25,42" fill="#FAF5EF" fillOpacity="0.4" />
              <circle cx="50" cy="50" r="8" fill="#FFFFFF" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif-luxury text-2xl sm:text-3xl tracking-[0.22em] font-semibold text-[#1F1916] leading-none group-hover:text-[#9B1139] transition-colors">
              AURELIA
            </span>
            <span className="text-[9px] uppercase tracking-[0.38em] text-[#8C6D42] font-semibold mt-1">
              Fine Jewellery
            </span>
          </div>
        </Link>

        {/* Search Bar (Matches CaratLane style "Search for 'Necklaces under ₹25K'") */}
        <div ref={searchRef} className="relative flex-1 max-w-xl mx-2 hidden sm:block">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="absolute left-3.5 text-stone-400 pointer-events-none" size={17} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="Search for 'Solitaire Rings', 'Necklaces under ₹25K'..."
              className="w-full pl-10 pr-10 py-2.5 bg-stone-50/80 hover:bg-stone-100/80 focus:bg-white text-sm text-stone-800 placeholder-stone-400 border border-stone-200 focus:border-[#C99757] rounded-full outline-none transition-all duration-200 shadow-inner focus:shadow-md"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 text-stone-400 hover:text-stone-600"
              >
                <X size={15} />
              </button>
            )}
          </form>

          {/* Live Search Autocomplete Dropdown */}
          {searchFocused && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-50 transition-all animate-fadeIn">
              {searchResults.length > 0 ? (
                <div>
                  <div className="px-4 py-2.5 bg-stone-50 border-b border-stone-100 flex justify-between items-center text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    <span>Matching Creations ({searchResults.length})</span>
                    <span className="text-[#9B1139] cursor-pointer hover:underline" onClick={handleSearchSubmit}>
                      View All
                    </span>
                  </div>
                  <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto">
                    {searchResults.map((item) => (
                      <Link
                        key={item._id || item.slug}
                        to={`/product/${item.slug}`}
                        onClick={() => setSearchFocused(false)}
                        className="flex items-center gap-3.5 p-3 hover:bg-stone-50 transition group"
                      >
                        <img
                          src={item.images?.[0]}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded-lg border border-stone-200 group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-stone-800 truncate group-hover:text-[#9B1139] transition-colors">
                            {item.title}
                          </p>
                          <p className="text-xs text-stone-500">
                            {item.category} • {item.metal}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-stone-900">
                            ₹{item.price?.toLocaleString('en-IN')}
                          </span>
                          {item.originalPrice && (
                            <span className="block text-xs text-stone-400 line-through">
                              ₹{item.originalPrice?.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : searchQuery ? (
                <div className="p-6 text-center text-sm text-stone-500">
                  <p>No jewellery found matching "{searchQuery}"</p>
                  <p className="text-xs text-stone-400 mt-1">Try searching for 'Rings', 'Earrings', or 'Diamond'</p>
                </div>
              ) : (
                <div className="p-4">
                  <p className="text-xs uppercase font-semibold text-stone-400 mb-2 tracking-wider">Trending Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Solitaire Rings', 'Diamond Studs', 'Tennis Bracelets', 'Mangalsutra', 'Couple Bands', 'Gold Choker'].map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                          navigate(`/jewellery?search=${encodeURIComponent(term)}`);
                          setSearchFocused(false);
                        }}
                        className="px-3 py-1.5 text-xs bg-stone-100 hover:bg-[#FAF4ED] hover:text-[#9B1139] text-stone-700 rounded-full transition"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Shortcuts: Treasure Chest / Vault, Store Locator, Wishlist, Bag, Account */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Treasure Chest / Vault 10+1 */}
          <Link
            to="/vault-plan"
            className="hidden xl:flex items-center gap-1.5 text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100/80 px-2.5 py-1.5 rounded-full border border-amber-200 transition"
          >
            <Sparkles size={13} className="text-amber-600" />
            <span>Gold Vault</span>
            <span className="bg-amber-600 text-white text-[9px] px-1.5 py-0.2 rounded font-bold">10+1</span>
          </Link>

          {/* Store Locator */}
          <Link
            to="/stores"
            className="hidden md:flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 transition"
          >
            <Compass size={16} className="text-stone-500" />
            <span>Stores</span>
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative p-2 text-stone-700 hover:text-[#9B1139] hover:bg-stone-100/70 rounded-full transition"
            title="Your Wishlist"
          >
            <Heart size={21} className={wishlistCount > 0 ? 'fill-[#9B1139] text-[#9B1139]' : ''} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#9B1139] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart / Shopping Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-stone-700 hover:text-[#9B1139] hover:bg-stone-100/70 rounded-full transition flex items-center"
            title="Shopping Bag"
          >
            <ShoppingBag size={21} />
            {totalItemsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#9B1139] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* User Account / Profile */}
          <div className="relative">
            {isAuthenticated ? (
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-medium text-stone-700 hover:text-[#9B1139] p-1.5 rounded-full hover:bg-stone-100 transition"
              >
                <div className="w-7 h-7 rounded-full bg-[#FAF4ED] text-[#9B1139] border border-[#E2C799] flex items-center justify-center font-bold text-xs">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline max-w-[80px] truncate">{user.name?.split(' ')[0]}</span>
                <ChevronDown size={13} className="text-stone-400" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setAuthModalOpen(true);
                }}
                className="flex items-center gap-1 p-2 text-stone-700 hover:text-[#9B1139] hover:bg-stone-100 rounded-full transition"
                title="Account Login"
              >
                <User size={21} />
                <span className="hidden md:inline text-xs font-medium text-stone-700">Login</span>
              </button>
            )}

            {/* User Dropdown */}
            {userDropdownOpen && isAuthenticated && (
              <div
                onMouseLeave={() => setUserDropdownOpen(false)}
                className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-fadeIn"
              >
                <div className="px-4 py-2 border-b border-stone-100">
                  <p className="text-xs text-stone-400">Signed in as</p>
                  <p className="text-sm font-semibold text-stone-800 truncate">{user.name}</p>
                  <p className="text-xs text-stone-500 truncate">{user.email}</p>
                </div>
                <Link
                  to="/account"
                  onClick={() => setUserDropdownOpen(false)}
                  className="block px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 transition"
                >
                  My Profile & Addresses
                </Link>
                <Link
                  to="/account#orders"
                  onClick={() => setUserDropdownOpen(false)}
                  className="block px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 transition"
                >
                  Orders & Tracking
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setUserDropdownOpen(false)}
                  className="block px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 transition"
                >
                  My Wishlist ({wishlistCount})
                </Link>
                <div className="border-t border-stone-100 mt-1 pt-1">
                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Primary Navigation Categories Bar (CaratLane layout with Mega-Menu) */}
      <nav className="border-t border-stone-100 hidden lg:block bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <ul className="flex items-center space-x-1 xl:space-x-2 py-0 text-[13px] font-medium text-stone-700">
            {navigationCategories.map((cat) => {
              const isActive = activeMegaMenu === cat.name;
              return (
                <li
                  key={cat.name}
                  onMouseEnter={() => handleMouseEnter(cat.name)}
                  onMouseLeave={handleMouseLeave}
                  className="relative py-2.5"
                >
                  <Link
                    to={cat.path}
                    className={`px-2.5 py-1 rounded-md transition-all duration-150 inline-flex items-center gap-1 ${
                      isActive
                        ? 'text-[#9B1139] font-semibold bg-[#FAF4ED]'
                        : 'hover:text-[#9B1139]'
                    }`}
                  >
                    {cat.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Enter Pincode Pill (CaratLane screenshot 1 & 2 right button) */}
          <button
            onClick={onOpenPincodeModal}
            className="flex items-center gap-1.5 text-xs text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200/80 px-3 py-1.5 rounded-full transition shadow-xs"
          >
            <MapPin size={12} className="text-purple-600" />
            <span>Pincode: <strong>{deliveryPincode}</strong></span>
          </button>
        </div>

        {/* 4. Luxury Mega-Menu Dropdown Panel (Matches Screenshot 3) */}
        {activeMegaMenu && currentMegaCategory && (
          <div
            onMouseEnter={() => {
              if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
            className="absolute left-0 right-0 top-full bg-[#FAF9F6] border-t border-b border-stone-200 shadow-2xl z-40 transition-all animate-fadeIn"
          >
            <div className="max-w-7xl mx-auto px-8 py-7 grid grid-cols-12 gap-8">
              {/* Column 1: Shop Styles */}
              <div className="col-span-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3.5">
                  Shop Styles
                </h4>
                <ul className="space-y-2 text-xs">
                  {currentMegaCategory.styles.map((style) => (
                    <li key={style}>
                      <Link
                        to={`/category/${encodeURIComponent(currentMegaCategory.name)}?subcategory=${encodeURIComponent(style)}`}
                        className="text-stone-700 hover:text-[#9B1139] hover:translate-x-1 inline-block transition-transform duration-150"
                      >
                        {style}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Curated By */}
              <div className="col-span-3 border-r border-stone-200/80 pr-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3.5">
                  Curated By
                </h4>
                <ul className="space-y-2 text-xs">
                  {currentMegaCategory.curated.map((item) => (
                    <li key={item}>
                      <Link
                        to={`/category/${encodeURIComponent(currentMegaCategory.name)}?filter=${encodeURIComponent(item)}`}
                        className="text-stone-700 hover:text-[#9B1139] hover:translate-x-1 inline-block transition-transform duration-150"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-2">
                    <Link
                      to={currentMegaCategory.path}
                      className="text-[#9B1139] font-semibold text-xs inline-flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      View All {currentMegaCategory.name} <ArrowRight size={12} />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Columns 3 & 4: Visual Promotional Cards (Matching Screenshot 3) */}
              <div className="col-span-6 grid grid-cols-2 gap-4">
                {currentMegaCategory.promoCards.map((promo, idx) => (
                  <Link
                    key={idx}
                    to={promo.link}
                    className="group relative overflow-hidden rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow-lg transition-all duration-300 block"
                  >
                    <div className="h-44 overflow-hidden bg-stone-100">
                      <img
                        src={promo.image}
                        alt={promo.title}
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 text-center bg-white">
                      <h5 className="font-semibold text-xs tracking-wider text-stone-900 group-hover:text-[#9B1139] transition-colors uppercase">
                        {promo.title}
                      </h5>
                      <p className="text-[11px] text-stone-500 truncate mt-0.5">
                        {promo.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            <div className="p-4 border-b border-stone-200 flex justify-between items-center bg-[#FAF8F5]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#9B1139] text-white flex items-center justify-center font-serif text-sm">
                  A
                </div>
                <span className="font-serif-luxury font-bold tracking-widest text-lg">AURELIA</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-stone-500 hover:text-stone-800">
                <X size={20} />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="p-4 border-b border-stone-100">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-2.5 text-stone-400" size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search rings, necklaces..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-100 rounded-full outline-none focus:ring-1 focus:ring-[#9B1139]"
                />
              </form>
            </div>

            {/* Mobile Categories Accordion */}
            <div className="py-2 flex-1">
              <p className="px-4 py-2 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Categories</p>
              {navigationCategories.map((cat) => (
                <div key={cat.name} className="border-b border-stone-50">
                  <Link
                    to={cat.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex justify-between items-center px-4 py-3 text-sm font-medium text-stone-800 hover:bg-stone-50"
                  >
                    <span>{cat.name}</span>
                    <ArrowRight size={14} className="text-stone-400" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile Bottom Links */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-2 text-xs">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPincodeModal();
                }}
                className="w-full text-left flex items-center gap-2 py-2 text-stone-700"
              >
                <MapPin size={16} className="text-[#9B1139]" />
                Deliver to: <strong>{deliveryPincode}</strong>
              </button>
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 text-rose-600 font-medium"
                >
                  Log Out ({user.name})
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalMode('login');
                    setAuthModalOpen(true);
                  }}
                  className="w-full py-2.5 bg-[#9B1139] text-white text-center rounded-xl font-medium shadow-sm"
                >
                  Sign In / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

