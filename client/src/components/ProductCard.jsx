import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product, onQuickView }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isWished = isInWishlist(product._id || product.slug);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes?.[0] || 'Standard', product.metal);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const currentImage = isHovered && product.images?.[1] ? product.images[1] : product.images?.[0];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl border border-stone-200/90 overflow-hidden hover:shadow-xl hover:border-[#E2C799] transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Bar on Card: Badge & Wishlist */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
        {product.bannerBadge ? (
          <span className="pointer-events-auto text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200/60 shadow-xs">
            {product.bannerBadge}
          </span>
        ) : (
          <span />
        )}

        <button
          onClick={handleToggleWishlist}
          className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs shadow-md border border-stone-100 flex items-center justify-center text-stone-500 hover:text-[#9B1139] hover:scale-110 active:scale-95 transition-all"
          title={isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            size={16}
            className={isWished ? 'fill-[#9B1139] text-[#9B1139]' : 'text-stone-600'}
          />
        </button>
      </div>

      {/* Product Image Link */}
      <Link to={`/product/${product.slug}`} className="block relative pt-10 pb-4 px-4 bg-gradient-to-b from-[#FDFCFB] to-white">
        <div className="w-full aspect-square flex items-center justify-center overflow-hidden">
          <img
            src={currentImage}
            alt={product.title}
            className="w-full h-full object-contain p-2 group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </div>

        {/* Quick View Overlay on Hover */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-stone-900/80 hover:bg-[#9B1139] text-white text-[11px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md backdrop-blur-xs"
          >
            <Eye size={12} />
            Quick View
          </button>
        )}
      </Link>

      {/* Product Information */}
      <div className="p-4 pt-2 border-t border-stone-100 bg-white flex flex-col justify-between flex-1">
        <div className="space-y-1.5">
          {/* Price & Strikethrough MRP (Matches screenshot 2) */}
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-stone-900 tracking-tight">
              ₹{product.price?.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-stone-400 line-through">
                ₹{product.originalPrice?.toLocaleString('en-IN')}
              </span>
            )}
            {product.discountPercentage > 0 && (
              <span className="text-[11px] font-semibold text-emerald-600">
                ({product.discountPercentage}% off)
              </span>
            )}
          </div>

          {/* Metal Purity & Diamond Clarity Spec (Matches screenshot 2: "14 KT • FG-SI") */}
          <p className="text-xs text-stone-500 font-medium tracking-wide">
            {product.purity || '14 KT'} • {product.diamondClarity || 'FG-SI'}
          </p>

          {/* Offer text */}
          <p className="text-[11px] text-[#9B1139] font-medium">
            Flat {product.discountPercentage || 20}% off on MRP
          </p>

          {/* Product Title */}
          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="text-xs text-stone-800 line-clamp-1 group-hover:text-[#9B1139] transition-colors font-medium">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Action Row: Check Delivery & Add to Bag */}
        <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <Link
            to={`/product/${product.slug}#delivery`}
            className="text-[11px] text-purple-900 hover:text-purple-700 font-medium underline underline-offset-2"
          >
            Check Delivery
          </Link>

          <button
            onClick={handleAddToCart}
            className={`px-3 py-1.5 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-all duration-200 ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-900 hover:bg-[#9B1139] text-white shadow-xs hover:shadow-md'
            }`}
          >
            {added ? (
              <>
                <Check size={12} />
                Added
              </>
            ) : (
              <>
                <ShoppingBag size={12} />
                Add to Bag
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

