import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('aurelia_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [coupon, setCoupon] = useState(() => {
    const saved = localStorage.getItem('aurelia_coupon');
    return saved ? JSON.parse(saved) : null;
  });
  const [deliveryPincode, setDeliveryPincode] = useState(() => {
    return localStorage.getItem('aurelia_pincode') || '400050';
  });
  const [pincodeCity, setPincodeCity] = useState('Mumbai, MH');

  useEffect(() => {
    localStorage.setItem('aurelia_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem('aurelia_coupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('aurelia_coupon');
    }
  }, [coupon]);

  useEffect(() => {
    localStorage.setItem('aurelia_pincode', deliveryPincode);
  }, [deliveryPincode]);

  const addToCart = (product, quantity = 1, selectedSize = '14', selectedMetal = '14 KT Yellow Gold') => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product._id === product._id &&
          item.selectedSize === selectedSize &&
          item.selectedMetal === selectedMetal
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem = {
          cartItemId: `${product._id}-${selectedSize}-${selectedMetal}-${Date.now()}`,
          product: {
            _id: product._id,
            title: product.title,
            slug: product.slug,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.images?.[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
            category: product.category,
            purity: product.purity,
            diamondClarity: product.diamondClarity,
          },
          quantity,
          selectedSize: selectedSize || 'Standard',
          selectedMetal: selectedMetal || product.metal || '14 KT Yellow Gold',
        };
        return [...prevItems, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
  };

  // Subtotal calculation
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const originalTotal = cartItems.reduce(
    (sum, item) => sum + (item.product.originalPrice || item.product.price) * item.quantity,
    0
  );

  const mrpSavings = Math.max(0, originalTotal - subtotal);

  // Apply Coupon
  const applyCoupon = async (code) => {
    try {
      const res = await axios.post('/api/coupons/apply', { code, cartTotal: subtotal });
      setCoupon(res.data);
      return { success: true, message: `Coupon ${code} applied successfully!` };
    } catch (error) {
      // Offline fallback coupons
      const codeUpper = code.toUpperCase().trim();
      if (codeUpper === 'LUXE20') {
        const discountAmount = Math.round(subtotal * 0.2);
        const couponData = { code: 'LUXE20', discountAmount, description: '20% Off Festive Discount' };
        setCoupon(couponData);
        return { success: true, message: '20% Festive Luxury Discount Applied!' };
      } else if (codeUpper === 'GOLD10') {
        const discountAmount = Math.round(subtotal * 0.1);
        const couponData = { code: 'GOLD10', discountAmount, description: '10% Off Fine Gold' };
        setCoupon(couponData);
        return { success: true, message: '10% Off Fine Gold Applied!' };
      } else if (codeUpper === 'FIRSTBUY') {
        const discountAmount = 2000;
        const couponData = { code: 'FIRSTBUY', discountAmount, description: 'Flat ₹2,000 Off for new members' };
        setCoupon(couponData);
        return { success: true, message: 'Flat ₹2,000 Off Applied!' };
      }
      return {
        success: false,
        message: error.response?.data?.message || 'Invalid coupon code. Try LUXE20 or FIRSTBUY',
      };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  // Discount calculation
  const couponDiscount = coupon?.discountAmount || 0;
  const taxableAmount = Math.max(0, subtotal - couponDiscount);
  const tax = Math.round(taxableAmount * 0.03); // 3% GST
  const shipping = 0; // Free insured shipping
  const finalTotal = taxableAmount + tax + shipping;

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        originalTotal,
        mrpSavings,
        coupon,
        couponDiscount,
        tax,
        shipping,
        finalTotal,
        applyCoupon,
        removeCoupon,
        totalItemsCount,
        deliveryPincode,
        setDeliveryPincode,
        pincodeCity,
        setPincodeCity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

