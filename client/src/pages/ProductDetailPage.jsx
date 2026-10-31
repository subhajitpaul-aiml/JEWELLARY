import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  RotateCcw,
  Truck,
  Award,
  Ruler,
  Star,
  MapPin,
  Check,
  ArrowRight,
  Share2,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SizeGuideModal } from '../components/SizeGuideModal';
import { ProductCard } from '../components/ProductCard';
import { mockProducts } from '../data/mockProducts';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, deliveryPincode, setDeliveryPincode } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // User selections
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedMetal, setSelectedMetal] = useState('');
  const [selectedDiamondClarity, setSelectedDiamondClarity] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Modals & Accordions
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [priceBreakupOpen, setPriceBreakupOpen] = useState(true);
  const [specsOpen, setSpecsOpen] = useState(true);
  const [deliveryOpen, setDeliveryOpen] = useState(false);

  // Delivery check state
  const [inputPin, setInputPin] = useState(deliveryPincode || '400050');
  const [pinVerified, setPinVerified] = useState(true);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/products/slug/${slug}`);
        if (res.data?.product) {
          setProduct(res.data.product);
          setRelatedProducts(res.data.related || []);
          setSelectedSize(res.data.product.sizes?.[0] || '14');
          setSelectedMetal(res.data.product.metal || '14 KT Yellow Gold');
          setSelectedDiamondClarity(res.data.product.diamondClarity || 'FG-SI');
        }
      } catch (err) {
        // Fallback to mock product
        const found = mockProducts.find((p) => p.slug === slug) || mockProducts[0];
        setProduct(found);
        setRelatedProducts(mockProducts.filter((p) => p.slug !== slug).slice(0, 4));
        setSelectedSize(found.sizes?.[0] || '14');
        setSelectedMetal(found.metal || '14 KT Yellow Gold');
        setSelectedDiamondClarity(found.diamondClarity || 'FG-SI');
      } finally {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-[#9B1139] border-t-transparent animate-spin mx-auto" />
          <p className="font-serif-luxury text-lg text-stone-700">Loading Atelier Piece...</p>
        </div>
      </div>
    );
  }

  const isWished = isInWishlist(product._id || product.slug);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedMetal);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedMetal);
    navigate('/checkout');
  };

  const handleVerifyPincode = (e) => {
    e.preventDefault();
    if (inputPin.trim().length === 6) {
      setDeliveryPincode(inputPin.trim());
      setPinVerified(true);
    }
  };

  // Price breakdown simulation
  const goldComponentPrice = Math.round(product.price * 0.48);
  const diamondComponentPrice = Math.round(product.price * 0.38);
  const makingCharges = Math.round(product.price * 0.11);
  const gst = Math.round(product.price * 0.03);

  // Estimated delivery calculation (4 days from today)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const metalsList = [
    '14 KT Yellow Gold',
    '18 KT Yellow Gold',
    '18 KT Rose Gold',
    '18 KT White Gold',
    'Platinum 950',
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="text-xs text-stone-400 flex items-center space-x-1.5 truncate">
            <Link to="/" className="hover:text-stone-700">Home</Link>
            <span>&gt;</span>
            <Link to={`/category/${encodeURIComponent(product.category)}`} className="hover:text-stone-700">
              {product.category}
            </Link>
            <span>&gt;</span>
            <span className="text-stone-800 font-medium truncate">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image Gallery (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm p-6 sm:p-10 flex items-center justify-center">
              {product.bannerBadge && (
                <span className="absolute top-5 left-5 text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-purple-50 text-purple-900 border border-purple-200/60 shadow-xs z-10">
                  {product.bannerBadge}
                </span>
              )}

              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white shadow-md border border-stone-200/80 flex items-center justify-center text-stone-500 hover:text-[#9B1139] hover:scale-110 transition z-10"
                title={isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart size={20} className={isWished ? 'fill-[#9B1139] text-[#9B1139]' : ''} />
              </button>

              <img
                src={product.images?.[selectedImgIdx] || product.images?.[0]}
                alt={product.title}
                className="w-full h-full object-contain hover:scale-115 transition-transform duration-500 cursor-zoom-in"
              />
            </div>

            {/* Thumbnail Selectors */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 justify-center sm:justify-start overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImgIdx(i)}
                    className={`w-20 h-20 rounded-2xl bg-white p-2 border-2 overflow-hidden transition-all duration-200 ${
                      selectedImgIdx === i
                        ? 'border-[#9B1139] shadow-md scale-102'
                        : 'border-stone-200/80 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Assurances Under Images */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 text-center space-y-1">
                <ShieldCheck size={20} className="mx-auto text-[#9B1139]" />
                <p className="text-xs font-bold text-stone-800">100% Certified</p>
                <p className="text-[10px] text-stone-500">BIS Hallmark & IGI</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 text-center space-y-1">
                <RotateCcw size={20} className="mx-auto text-[#9B1139]" />
                <p className="text-xs font-bold text-stone-800">15-Day Return</p>
                <p className="text-[10px] text-stone-500">100% Full Refund</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 text-center space-y-1">
                <Award size={20} className="mx-auto text-[#9B1139]" />
                <p className="text-xs font-bold text-stone-800">Lifetime Buyback</p>
                <p className="text-[10px] text-stone-500">Exchange Guarantee</p>
              </div>
            </div>
          </div>

          {/* Right Column: Buying Details & Selection (Cols 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-[#9B1139]">
                  {product.category} • {product.collectionName || 'Aurelia Signature'}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full font-semibold">
                  <Star size={13} fill="currentColor" />
                  <span>{product.rating || '4.9'}</span>
                  <span className="text-stone-400">({product.reviewsCount || 42})</span>
                </div>
              </div>

              <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                {product.title}
              </h1>

              {/* Price Row */}
              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-stone-900 tracking-tight">
                  ₹{product.price?.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-base text-stone-400 line-through">
                    ₹{product.originalPrice?.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discountPercentage > 0 && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Save {product.discountPercentage}%
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500">
                (Inclusive of all taxes & free transit insurance)
              </p>
            </div>

            {/* Customization 1: Metal & Karat Selection */}
            <div className="space-y-2 pt-2 border-t border-stone-200/80">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-stone-800 uppercase tracking-wider">
                  Metal & Purity:
                </span>
                <span className="text-[#9B1139] font-medium">{selectedMetal}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {metalsList.map((metal) => (
                  <button
                    key={metal}
                    type="button"
                    onClick={() => setSelectedMetal(metal)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition ${
                      selectedMetal === metal
                        ? 'border-[#9B1139] bg-[#FAF4ED] text-[#9B1139] font-bold shadow-xs'
                        : 'border-stone-200 text-stone-700 hover:border-stone-400 bg-white'
                    }`}
                  >
                    {metal}
                  </button>
                ))}
              </div>
            </div>

            {/* Customization 2: Diamond Clarity Selection */}
            <div className="space-y-2 pt-2 border-t border-stone-200/80">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-stone-800 uppercase tracking-wider">
                  Diamond Quality:
                </span>
                <span className="text-[#9B1139] font-medium">{selectedDiamondClarity}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { grade: 'FG-SI', label: 'Very Good Clarity' },
                  { grade: 'GH-VS', label: 'Premium Clarity' },
                  { grade: 'VVS-EF', label: 'Finest Rare White' },
                ].map((d) => (
                  <button
                    key={d.grade}
                    type="button"
                    onClick={() => setSelectedDiamondClarity(d.grade)}
                    className={`p-2 rounded-xl text-center border transition ${
                      selectedDiamondClarity === d.grade
                        ? 'border-[#9B1139] bg-[#FAF4ED] text-[#9B1139] shadow-xs'
                        : 'border-stone-200 text-stone-700 hover:border-stone-400 bg-white'
                    }`}
                  >
                    <p className="text-xs font-bold">{d.grade}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">{d.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Customization 3: Size Selection & Sizing Guide */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-stone-200/80">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-800 uppercase tracking-wider">
                    Select Size:
                  </span>
                  <button
                    type="button"
                    onClick={() => setSizeModalOpen(true)}
                    className="text-[#9B1139] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Ruler size={13} />
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-10 px-3 py-2 rounded-xl text-xs font-medium border transition ${
                        selectedSize === s
                          ? 'border-[#9B1139] bg-[#FAF4ED] text-[#9B1139] font-bold shadow-xs'
                          : 'border-stone-200 text-stone-700 hover:border-stone-400 bg-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pincode & Delivery Checker (Matches screenshot 2 check delivery) */}
            <div id="delivery" className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800 flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#9B1139]" />
                  Check Delivery Date
                </span>
                {pinVerified && (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check size={13} /> Verified
                  </span>
                )}
              </div>

              <form onSubmit={handleVerifyPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={inputPin}
                  onChange={(e) => setInputPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl outline-none focus:border-[#9B1139] font-mono tracking-wider"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 hover:bg-[#9B1139] text-white text-xs font-semibold rounded-xl transition"
                >
                  Check
                </button>
              </form>

              {pinVerified && (
                <div className="pt-1 text-xs text-stone-600 space-y-0.5">
                  <p className="font-semibold text-stone-900">
                    Expected Delivery by <strong>{formattedDelivery}</strong>
                  </p>
                  <p className="text-[11px] text-emerald-700 font-medium">
                    ✓ Free Insured Delivery • Cash on Delivery Available
                  </p>
                </div>
              )}
            </div>

            {/* Action CTAs: Add to Cart & Buy Now */}
            <div className="space-y-3 pt-2">
              {addedNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-semibold text-emerald-800 flex items-center justify-center gap-2 animate-fadeIn">
                  <Check size={16} className="text-emerald-600" />
                  <span>Piece successfully added to your Shopping Bag!</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-3.5 px-4 bg-white hover:bg-stone-50 border-2 border-[#9B1139] text-[#9B1139] font-bold text-xs uppercase tracking-wider rounded-2xl transition shadow-xs flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-4 bg-gradient-to-r from-[#9B1139] to-[#7B0D2D] hover:from-[#7B0D2D] hover:to-[#5E0921] text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Buy Now</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Accordion 1: Product Specifications */}
            <div className="border-t border-stone-200 pt-4">
              <button
                onClick={() => setSpecsOpen(!specsOpen)}
                className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-wider text-stone-800"
              >
                <span>Product Specifications</span>
                {specsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {specsOpen && (
                <div className="mt-3 bg-white p-4 rounded-2xl border border-stone-200/80 divide-y divide-stone-100 text-xs">
                  <div className="py-1.5 flex justify-between">
                    <span className="text-stone-500">Gold Purity</span>
                    <span className="font-semibold text-stone-800">{product.purity}</span>
                  </div>
                  <div className="py-1.5 flex justify-between">
                    <span className="text-stone-500">Gross Weight</span>
                    <span className="font-semibold text-stone-800">{product.specifications?.grossWeight}</span>
                  </div>
                  <div className="py-1.5 flex justify-between">
                    <span className="text-stone-500">Gold Net Weight</span>
                    <span className="font-semibold text-stone-800">{product.specifications?.goldWeight}</span>
                  </div>
                  <div className="py-1.5 flex justify-between">
                    <span className="text-stone-500">Diamond Weight</span>
                    <span className="font-semibold text-stone-800">{product.specifications?.diamondWeight}</span>
                  </div>
                  <div className="py-1.5 flex justify-between">
                    <span className="text-stone-500">Diamond Count</span>
                    <span className="font-semibold text-stone-800">{product.specifications?.diamondCount} Stones</span>
                  </div>
                  <div className="py-1.5 flex justify-between">
                    <span className="text-stone-500">Certification</span>
                    <span className="font-semibold text-stone-800">{product.specifications?.certification}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Price Breakup */}
            <div className="border-t border-stone-200 pt-4">
              <button
                onClick={() => setPriceBreakupOpen(!priceBreakupOpen)}
                className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-wider text-stone-800"
              >
                <span>Transparent Price Breakup</span>
                {priceBreakupOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {priceBreakupOpen && (
                <div className="mt-3 bg-white p-4 rounded-2xl border border-stone-200/80 divide-y divide-stone-100 text-xs">
                  <div className="py-1.5 flex justify-between">
                    <span className="text-stone-500">Gold Value ({selectedMetal})</span>
                    <span className="font-medium text-stone-800">₹{goldComponentPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="py-1.5 flex justify-between">
                    <span className="text-stone-500">Diamond Value ({selectedDiamondClarity})</span>
                    <span className="font-medium text-stone-800">₹{diamondComponentPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="py-1.5 flex justify-between">
                    <span className="text-stone-500">Making Charges</span>
                    <span className="font-medium text-stone-800">₹{makingCharges.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="py-1.5 flex justify-between">
                    <span className="text-stone-500">GST (3%)</span>
                    <span className="font-medium text-stone-800">₹{gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="py-2 flex justify-between font-bold text-stone-900 border-t border-stone-200">
                    <span>Total Final Price</span>
                    <span className="text-[#9B1139]">₹{product.price?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-16 bg-white p-8 rounded-3xl border border-stone-200/90 shadow-xs">
          <h2 className="font-serif-luxury text-2xl font-bold text-stone-900 mb-4">
            About This Atelier Creation
          </h2>
          <p className="text-stone-600 leading-relaxed text-sm max-w-3xl">
            {product.description}
          </p>
        </div>

        {/* Related Products: Complete the Look */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9B1139]">
                Complementary Pieces
              </span>
              <h2 className="font-serif-luxury text-3xl font-bold text-stone-900">
                Complete The Look
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel._id || rel.slug} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sizing Modal */}
      <SizeGuideModal
        isOpen={sizeModalOpen}
        onClose={() => setSizeModalOpen(false)}
        category={product.category}
      />
    </div>
  );
};

