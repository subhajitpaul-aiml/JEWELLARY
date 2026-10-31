import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('aurelia_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('aurelia_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = async (product) => {
    const exists = wishlist.some((item) => item._id === product._id || item.slug === product.slug);
    let updated;
    if (exists) {
      updated = wishlist.filter((item) => item._id !== product._id && item.slug !== product.slug);
    } else {
      updated = [...wishlist, product];
    }
    setWishlist(updated);

    // Sync with backend if logged in
    if (token && product._id) {
      try {
        await axios.post('/api/auth/wishlist/toggle', { productId: product._id });
      } catch (err) {
        console.warn('Backend wishlist sync error:', err.message);
      }
    }
  };

  const isInWishlist = (idOrSlug) => {
    return wishlist.some((item) => item._id === idOrSlug || item.slug === idOrSlug);
  };

  const removeFromWishlist = (idOrSlug) => {
    setWishlist((prev) => prev.filter((item) => item._id !== idOrSlug && item.slug !== idOrSlug));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

