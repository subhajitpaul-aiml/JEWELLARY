import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Filter, SlidersHorizontal, ChevronDown, Sparkles, MapPin, Search } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { QuickViewModal } from '../components/QuickViewModal';
import { mockProducts } from '../data/mockProducts';
import { useCart } from '../context/CartContext';

export const ProductListingPage = () => {
  const { categoryName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { deliveryPincode } = useCart();

  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Parse filters from URL or default
  const [filters, setFilters] = useState({
    category: categoryName || searchParams.get('category') || 'All',
    subcategory: searchParams.get('subcategory') || '',
    metal: searchParams.get('metal') || '',
    gender: searchParams.get('gender') || 'All',
    diamondClarity: searchParams.get('diamondClarity') || '',
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null,
    priceRangeKey: null,
    storePickup: false,
    search: searchParams.get('search') || '',
  });

  const [sortBy, setSortBy] = useState('latest'); // 'latest' | 'price_asc' | 'price_desc' | 'popular' | 'discount'

  // Update category when route parameter changes
  useEffect(() => {
    if (categoryName) {
      setFilters((prev) => ({ ...prev, category: decodeURIComponent(categoryName) }));
    }
  }, [categoryName]);

  // Update search when searchParam changes
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam !== null) {
      setFilters((prev) => ({ ...prev, search: searchParam }));
    }
    const subParam = searchParams.get('subcategory');
    if (subParam !== null) {
      setFilters((prev) => ({ ...prev, subcategory: subParam }));
    }
    const maxParam = searchParams.get('maxPrice');
    if (maxParam) {
      setFilters((prev) => ({ ...prev, maxPrice: Number(maxParam) }));
    }
  }, [searchParams]);

  // Fetch products from backend
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.category && filters.category !== 'All') params.append('category', filters.category);
        if (filters.subcategory) params.append('subcategory', filters.subcategory);
        if (filters.metal) params.append('metal', filters.metal);
        if (filters.gender && filters.gender !== 'All') params.append('gender', filters.gender);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.search) params.append('search', filters.search);
        if (sortBy) params.append('sort', sortBy);

        const res = await axios.get(`/api/products?${params.toString()}`);
        if (res.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.warn('Backend fetch failed, applying client-side filter fallback:', err);
        // Client-side fallback filter
        let filtered = [...mockProducts];

        if (filters.category && filters.category !== 'All') {
          filtered = filtered.filter(
            (p) => p.category.toLowerCase() === filters.category.toLowerCase()
          );
        }

        if (filters.subcategory) {
          filtered = filtered.filter((p) =>
            p.subcategory?.toLowerCase().includes(filters.subcategory.toLowerCase())
          );
        }

        if (filters.metal) {
          filtered = filtered.filter((p) =>
            p.metal?.toLowerCase().includes(filters.metal.toLowerCase())
          );
        }

        if (filters.gender && filters.gender !== 'All') {
          filtered = filtered.filter(
            (p) => p.gender?.toLowerCase() === filters.gender.toLowerCase()
          );
        }

        if (filters.diamondClarity) {
          filtered = filtered.filter(
            (p) => p.diamondClarity === filters.diamondClarity
          );
        }

        if (filters.minPrice !== null) {
          filtered = filtered.filter((p) => p.price >= filters.minPrice);
        }

        if (filters.maxPrice !== null) {
          filtered = filtered.filter((p) => p.price <= filters.maxPrice);
        }

        if (filters.search) {
          const s = filters.search.toLowerCase();
          filtered = filtered.filter(
            (p) =>
              p.title.toLowerCase().includes(s) ||
              p.category.toLowerCase().includes(s) ||
              p.description.toLowerCase().includes(s)
          );
        }

        // Sorting
        if (sortBy === 'price_asc') {
          filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_desc') {
          filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'popular') {
          filtered.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
        } else if (sortBy === 'discount') {
          filtered.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
        }

        setProducts(filtered);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [filters, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category && filters.category !== 'All') count++;
    if (filters.subcategory) count++;
    if (filters.metal) count++;
    if (filters.gender && filters.gender !== 'All') count++;
    if (filters.diamondClarity) count++;
    if (filters.priceRangeKey || filters.minPrice || filters.maxPrice) count++;
    if (filters.storePickup) count++;
    return count;
  }, [filters]);

  const handleClearAll = () => {
    setFilters({
      category: 'All',
      subcategory: '',
      metal: '',
      gender: 'All',
      diamondClarity: '',
      minPrice: null,
      maxPrice: null,
      priceRangeKey: null,
      storePickup: false,
      search: '',
    });
    setSearchParams({});
  };

  const pageTitle = filters.search
    ? `Search: "${filters.search}"`
    : filters.category && filters.category !== 'All'
    ? `${filters.category}`
    : 'Jewellery Collection';

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-20">
      {/* 1. Breadcrumbs and Header Banner (Matching Screenshot 2) */}
      <div className="bg-white border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          {/* Breadcrumbs */}
          <nav className="text-xs text-stone-400 flex items-center space-x-1.5 mb-2">
            <Link to="/" className="hover:text-stone-700">Home</Link>
            <span>&gt;</span>
            <Link to="/jewellery" className="hover:text-stone-700">Jewellery</Link>
            {filters.category && filters.category !== 'All' && (
              <>
                <span>&gt;</span>
                <span className="text-stone-800 font-medium">{filters.category}</span>
              </>
            )}
            {filters.subcategory && (
              <>
                <span>&gt;</span>
                <span className="text-stone-800 font-medium">{filters.subcategory}</span>
              </>
            )}
          </nav>

          {/* Heading with Design Count (Matches screenshot 2: "Jewellery (45 Designs)") */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                {pageTitle}{' '}
                <span className="text-sm font-sans font-normal text-stone-500">
                  ({products.length} Designs)
                </span>
              </h1>
            </div>

            {/* Sort Dropdown (Matches screenshot 2: "Sort By Latest v") */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl"
              >
                <SlidersHorizontal size={14} />
                <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              </button>

              <div className="relative flex items-center gap-2 text-xs">
                <span className="text-stone-500 font-medium hidden sm:inline">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-stone-200 text-stone-800 text-xs font-semibold rounded-xl px-3 py-2 pr-8 outline-none focus:border-[#9B1139] cursor-pointer shadow-xs appearance-none"
                >
                  <option value="latest">Sort By: Latest</option>
                  <option value="popular">Sort By: Popularity</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 text-stone-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid: Filter Sidebar + Product Grid (Matches Screenshot 2) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Filter Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-36">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onClearAll={handleClearAll}
              activeCount={activeFilterCount}
              totalResults={products.length}
            />
          </div>

          {/* Right Product Grid (Desktop 3 columns, matches screenshot 2 layout) */}
          <div className="lg:col-span-9">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 border border-stone-200 animate-pulse space-y-4">
                    <div className="w-full aspect-square bg-stone-100 rounded-xl" />
                    <div className="h-4 bg-stone-100 rounded w-2/3" />
                    <div className="h-3 bg-stone-100 rounded w-1/2" />
                    <div className="h-8 bg-stone-100 rounded" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-xs space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 text-[#9B1139] flex items-center justify-center">
                  <Search size={32} />
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-stone-900">
                  No matching designs found
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Try relaxing your price filters or removing specific metal/style constraints to see more handcrafted pieces.
                </p>
                <button
                  onClick={handleClearAll}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-[#9B1139] text-white text-xs font-semibold rounded-full uppercase tracking-wider transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product._id || product.slug}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif-luxury text-xl font-bold">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="text-stone-400">
                Close
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onClearAll={handleClearAll}
              activeCount={activeFilterCount}
              totalResults={products.length}
            />
            <div className="mt-4 pt-4 border-t border-stone-200">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#9B1139] text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-md"
              >
                Apply Filters ({products.length} Designs)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

