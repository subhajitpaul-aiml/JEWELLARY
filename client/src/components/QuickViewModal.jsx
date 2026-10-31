import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '14');
  const [selectedMetal, setSelectedMetal] = useState(product?.metal || '14 KT Yellow Gold');
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const isWished = isInWishlist(product._id || product.slug);

  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize, selectedMetal);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-stone-200 z-10 animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition z-20"
          >
            <X size={20} />
          </button>

          {/* Left: Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-[#FAF9F7] rounded-2xl overflow-hidden border border-stone-200/80 p-4 flex items-center justify-center">
              <img
                src={product.images?.[selectedImgIdx] || product.images?.[0]}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImgIdx(i)}
                    className={`w-14 h-14 rounded-xl border-2 overflow-hidden transition ${
                      selectedImgIdx === i ? 'border-[#9B1139]' : 'border-stone-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Controls */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-[#9B1139] bg-rose-50 px-2.5 py-0.5 rounded-full">
                  {product.category} • {product.collectionName || 'Aurelia Signature'}
                </span>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="text-stone-400 hover:text-[#9B1139] p-1"
                >
                  <Heart size={20} className={isWished ? 'fill-[#9B1139] text-[#9B1139]' : ''} />
                </button>
              </div>

              <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                {product.title}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-stone-900">
                  ₹{product.price?.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-stone-400 line-through">
                    ₹{product.originalPrice?.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discountPercentage > 0 && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500">Price inclusive of all taxes & free transit insurance</p>

              {/* Purity & Metal details */}
              <div className="p-3 bg-stone-50 rounded-xl space-y-1 text-xs">
                <p>
                  <strong>Metal:</strong> {product.metal} ({product.purity})
                </p>
                <p>
                  <strong>Diamond Quality:</strong> {product.diamondClarity}
                </p>
                <p>
                  <strong>Weight:</strong> Gross {product.specifications?.grossWeight} | Diamond {product.specifications?.diamondWeight}
                </p>
              </div>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Select Size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                          selectedSize === s
                            ? 'border-[#9B1139] bg-[#FAF4ED] text-[#9B1139] font-bold'
                            : 'border-stone-200 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-900 hover:bg-[#9B1139] text-white shadow-md'
                }`}
              >
                {added ? (
                  <>
                    <Check size={16} />
                    Added to Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    Add to Bag
                  </>
                )}
              </button>

              <Link
                to={`/product/${product.slug}`}
                onClick={onClose}
                className="w-full py-2 text-center text-xs text-[#9B1139] font-medium hover:underline flex items-center justify-center gap-1"
              >
                <span>View Full Details & Specifications</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

