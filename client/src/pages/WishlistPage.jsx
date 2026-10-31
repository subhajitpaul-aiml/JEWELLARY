import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF8F5] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-sm">
          <div className="w-20 h-20 mx-auto rounded-full bg-rose-50 text-[#9B1139] flex items-center justify-center">
            <Heart size={36} />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif-luxury text-3xl font-bold text-stone-900">
              Your Wishlist is Empty
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              Save your favorite gold and diamond creations here to view them anytime or share with someone special.
            </p>
          </div>
          <Link
            to="/jewellery"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-[#9B1139] text-white text-xs uppercase tracking-widest font-semibold rounded-full shadow-md hover:shadow-xl transition-all"
          >
            <span>Explore Designs</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
              My Wishlist{' '}
              <span className="text-sm font-sans font-normal text-stone-500">
                ({wishlist.length} Designs)
              </span>
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Your hand-curated selection of exquisite Aurelia fine jewellery.
            </p>
          </div>

          <Link
            to="/jewellery"
            className="text-xs font-semibold text-[#9B1139] hover:underline hidden sm:inline"
          >
            Continue Browsing
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id || item.slug}
              className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative pt-6 pb-2 px-4 bg-gradient-to-b from-[#FAF9F7] to-white">
                <button
                  onClick={() => removeFromWishlist(item._id || item.slug)}
                  className="absolute top-3 right-3 text-stone-400 hover:text-rose-600 p-1 transition"
                  title="Remove from Wishlist"
                >
                  <Trash2 size={16} />
                </button>

                <Link to={`/product/${item.slug}`} className="block">
                  <div className="w-full aspect-square flex items-center justify-center overflow-hidden">
                    <img
                      src={item.images?.[0] || item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                    />
                  </div>
                </Link>
              </div>

              <div className="p-4 pt-1 space-y-2 border-t border-stone-100 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold text-stone-900">
                      ₹{item.price?.toLocaleString('en-IN')}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-stone-400 line-through">
                        ₹{item.originalPrice?.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500">{item.metal} • {item.purity}</p>
                  <Link to={`/product/${item.slug}`}>
                    <h3 className="text-xs font-medium text-stone-800 line-clamp-1 group-hover:text-[#9B1139] transition">
                      {item.title}
                    </h3>
                  </Link>
                </div>

                <button
                  onClick={() => addToCart(item, 1, item.sizes?.[0] || '14', item.metal)}
                  className="w-full py-2.5 bg-stone-900 hover:bg-[#9B1139] text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <ShoppingBag size={14} />
                  <span>Move to Bag</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

