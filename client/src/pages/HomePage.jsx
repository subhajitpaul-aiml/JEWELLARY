import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Truck,
  Award,
  ChevronRight,
  Star,
  Gem,
  Calendar,
  Gift,
  CheckCircle2,
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { mockProducts } from '../data/mockProducts';

export const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(mockProducts);
  const [activeTab, setActiveTab] = useState('bestsellers'); // 'bestsellers' | 'newArrivals' | 'solitaires'
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        }
      } catch (err) {
        // Mock fallback already loaded
      }
    };
    fetchProducts();
  }, []);

  const heroSlides = [
    {
      title: 'The Royal Solitaire Gala',
      subtitle: 'IGI & GIA Certified Solitaires with Flat 20% Off Diamond Making Charges',
      tag: 'NEW FESTIVE LAUNCH',
      ctaText: 'Explore Solitaires',
      link: '/category/Solitaires',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=85',
      badge: 'Certified Luxury',
    },
    {
      title: 'Celestial Starlight Diamond Bands',
      subtitle: 'Precision Handcrafted in 18KT Yellow & Rose Gold with Ethereal Sparkle',
      tag: 'BESTSELLER COLLECTION',
      ctaText: 'Shop Diamond Bands',
      link: '/category/Rings?subcategory=Bands',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1600&q=85',
      badge: 'Lifetime Buyback',
    },
    {
      title: 'Modern Diamond Mangalsutras',
      subtitle: 'Sacred Tradition Reimagined for the Contemporary Woman of Elegance',
      tag: 'BRIDAL & DAILYWEAR',
      ctaText: 'View Mangalsutras',
      link: '/category/Mangalsutras',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=85',
      badge: 'BIS 916 Hallmark',
    },
  ];

  // Auto carousel slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const bestsellers = products.filter((p) => p.isBestSeller).slice(0, 8);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 8);
  const solitaires = products.filter((p) => p.category === 'Solitaires' || p.subcategory === 'Solitaire').slice(0, 8);

  const displayedProducts =
    activeTab === 'bestsellers'
      ? bestsellers.length ? bestsellers : products.slice(0, 8)
      : activeTab === 'newArrivals'
      ? newArrivals.length ? newArrivals : products.slice(2, 10)
      : solitaires.length ? solitaires : products.slice(0, 8);

  const categoryTiles = [
    { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=80', count: '120+ Designs', path: '/category/Rings' },
    { name: 'Earrings', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=500&q=80', count: '145+ Designs', path: '/category/Earrings' },
    { name: 'Bangles', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=500&q=80', count: '65+ Designs', path: '/category/Bangles' },
    { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591475149-166e4d293282?auto=format&fit=crop&w=500&q=80', count: '80+ Designs', path: '/category/Bracelets' },
    { name: 'Solitaires', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=500&q=80', count: '45+ Designs', path: '/category/Solitaires' },
    { name: 'Mangalsutras', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=500&q=80', count: '55+ Designs', path: '/category/Mangalsutras' },
    { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=500&q=80', count: '90+ Designs', path: '/category/Necklaces' },
    { name: 'Pendants', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=80', count: '110+ Designs', path: '/category/Pendants' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* 1. Large Hero Promotional Banner Carousel */}
      <section className="relative overflow-hidden bg-stone-900 text-white min-h-[480px] sm:min-h-[580px] lg:min-h-[640px] flex items-center">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background image with luxury cinematic vignette */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center scale-105 animate-subtleZoom filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Slide Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex items-center">
              <div className="max-w-2xl space-y-4 sm:space-y-6 pt-12 pb-20">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2C799]/20 border border-[#E2C799]/40 backdrop-blur-md text-[#E2C799] text-xs font-semibold uppercase tracking-widest">
                  <Sparkles size={13} className="text-[#E2C799]" />
                  <span>{slide.tag}</span>
                </div>

                <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-base text-stone-300 font-light max-w-lg leading-relaxed">
                  {slide.subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to={slide.link}
                    className="px-8 py-3.5 bg-gradient-to-r from-[#C99757] to-[#E2C799] hover:from-[#B58544] hover:to-[#CFB385] text-stone-950 text-xs uppercase tracking-widest font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to="/jewellery"
                    className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-semibold rounded-full backdrop-blur-md border border-white/20 transition duration-300"
                  >
                    View All Designs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-8 bg-[#E2C799]' : 'w-2 bg-white/40'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Aurelia Guarantees Bar */}
      <section className="bg-white border-b border-stone-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF4ED] text-[#9B1139] flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-stone-900 uppercase tracking-wide">100% Certified</p>
              <p className="text-[11px] text-stone-500">BIS Hallmark & IGI Diamonds</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF4ED] text-[#9B1139] flex items-center justify-center">
              <RotateCcw size={20} />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-stone-900 uppercase tracking-wide">15-Day Free Returns</p>
              <p className="text-[11px] text-stone-500">No questions asked refund</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF4ED] text-[#9B1139] flex items-center justify-center">
              <Truck size={20} />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-stone-900 uppercase tracking-wide">Insured Express Shipping</p>
              <p className="text-[11px] text-stone-500">Free delivery across India</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF4ED] text-[#9B1139] flex items-center justify-center">
              <Award size={20} />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-stone-900 uppercase tracking-wide">Lifetime Exchange</p>
              <p className="text-[11px] text-stone-500">Guaranteed buyback policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop by Category (Arched / Circular Luxury Tiles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9B1139]">
            Curated For Every Occasion
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
            From iconic solitaires to delicate daily wearables in pure 14KT & 18KT gold.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categoryTiles.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className="group flex flex-col items-center text-center p-3 rounded-2xl bg-white border border-stone-200/80 hover:border-[#C99757] hover:shadow-lg transition-all duration-300"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-stone-100 group-hover:border-[#9B1139] p-1 transition-all duration-300">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="mt-3 text-xs font-bold text-stone-800 group-hover:text-[#9B1139] transition-colors">
                {cat.name}
              </h3>
              <span className="text-[10px] text-stone-400 mt-0.5">{cat.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Tabbed Product Showcase: Best Sellers & New Arrivals */}
      <section className="bg-white py-16 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9B1139]">
                Handpicked Brilliance
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
                Trending In The Atelier
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex p-1 bg-stone-100 rounded-xl space-x-1 self-start sm:self-auto text-xs font-semibold">
              <button
                onClick={() => setActiveTab('bestsellers')}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === 'bestsellers'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Best Sellers
              </button>
              <button
                onClick={() => setActiveTab('newArrivals')}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === 'newArrivals'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                New Arrivals
              </button>
              <button
                onClick={() => setActiveTab('solitaires')}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === 'solitaires'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Solitaires
              </button>
            </div>
          </div>

          {/* Product Grid (Matches screenshot 2 layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product._id || product.slug}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/jewellery"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-[#9B1139] text-white text-xs uppercase tracking-widest font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300"
            >
              <span>Explore All {products.length}+ Creations</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Promotional Feature Banners (Dual Split) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Promo Banner 1: Rings Under 25K */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 to-stone-800 text-white min-h-[320px] flex items-center p-8 sm:p-10 shadow-xl group">
            <img
              src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"
              alt="Diamond Rings"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="relative z-10 space-y-4 max-w-sm">
              <span className="inline-block px-3 py-1 bg-[#E2C799] text-stone-950 font-bold text-[10px] uppercase tracking-widest rounded-full">
                EVERYDAY SPARKLE
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold leading-tight">
                Diamond Rings Under ₹25,000
              </h3>
              <p className="text-xs text-stone-300">
                Featherlight solitaire bands and stackable rings designed for daily elegance.
              </p>
              <Link
                to="/category/Rings?maxPrice=25000"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#E2C799] hover:text-white uppercase tracking-wider transition"
              >
                <span>Shop Affordable Luxe</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Promo Banner 2: Royal Bridal Atelier */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#3D0C1E] to-[#60122E] text-white min-h-[320px] flex items-center p-8 sm:p-10 shadow-xl group">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
              alt="Bridal Heritage"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="relative z-10 space-y-4 max-w-sm">
              <span className="inline-block px-3 py-1 bg-[#E2C799] text-[#3D0C1E] font-bold text-[10px] uppercase tracking-widest rounded-full">
                BRIDAL HERITAGE
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold leading-tight">
                Royal Radiance Chokers & Sets
              </h3>
              <p className="text-xs text-stone-200">
                Handcrafted polki, brilliant diamonds, and south-sea pearls for the regal bride.
              </p>
              <Link
                to="/category/Collections"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#E2C799] hover:text-white uppercase tracking-wider transition"
              >
                <span>View Bridal Troussier</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. The Aurelia Diamond Guide & 4Cs Section */}
      <section className="bg-[#FAF5EF] py-16 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9B1139]">
              The Connoisseur's Guide
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
              Understanding The 4Cs of Diamonds
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto">
              Every natural diamond in our studio is personally inspected and certified by world-leading gemological institutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#FAF4ED] text-[#9B1139] flex items-center justify-center font-serif text-xl font-bold mb-4">
                1
              </div>
              <h4 className="font-bold text-stone-900 text-sm mb-1">Cut Quality</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Determines how light reflects from within the gem. We select only Excellent and Ideal cuts for optimal brilliance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#FAF4ED] text-[#9B1139] flex items-center justify-center font-serif text-xl font-bold mb-4">
                2
              </div>
              <h4 className="font-bold text-stone-900 text-sm mb-1">Clarity</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Refers to the purity of the diamond. We curate eye-clean diamonds rated VVS and VS with zero visible inclusions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#FAF4ED] text-[#9B1139] flex items-center justify-center font-serif text-xl font-bold mb-4">
                3
              </div>
              <h4 className="font-bold text-stone-900 text-sm mb-1">Color Grade</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                We utilize colorless to near-colorless diamonds (E to G color grade) providing pure icy white sparkle.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-[#FAF4ED] text-[#9B1139] flex items-center justify-center font-serif text-xl font-bold mb-4">
                4
              </div>
              <h4 className="font-bold text-stone-900 text-sm mb-1">Carat Weight</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Precise stone metric weight calibrated with exacting proportions to maximize face-up visual diameter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Client Reviews & Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9B1139]">
            Words of Adornment
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
            Treasured By Over 50,000+ Patrons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
            </div>
            <p className="text-xs text-stone-600 italic leading-relaxed">
              "The Aurelia Stella Solitaire exceeded all my expectations. The finish of the 18KT gold and the IGI certification gave me total peace of mind. Arrived beautifully in insured packaging in 2 days."
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-stone-900">Ananya Roy</p>
                <p className="text-[11px] text-stone-400">Bengaluru • Verified Buyer</p>
              </div>
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
            </div>
            <p className="text-xs text-stone-600 italic leading-relaxed">
              "Bought the Ananya diamond mangalsutra for our anniversary. The design is so sleek and modern that my wife wears it to office every single day. Exceptional craftsmanship!"
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-stone-900">Rohan Kapoor</p>
                <p className="text-[11px] text-stone-400">Mumbai • Verified Buyer</p>
              </div>
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
            </div>
            <p className="text-xs text-stone-600 italic leading-relaxed">
              "The tennis bracelet is an absolute showstopper. Every diamond is perfectly uniform and the safety clasp is very secure. Customer concierge on WhatsApp answered all questions within 5 minutes."
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-stone-900">Meera Deshmukh</p>
                <p className="text-[11px] text-stone-400">Pune • Verified Buyer</p>
              </div>
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

