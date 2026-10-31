const express = require('express');
const router = express.Router();

const coupons = {
  LUXE20: { code: 'LUXE20', type: 'percentage', value: 20, description: '20% Off Festive Luxury Discount' },
  GOLD10: { code: 'GOLD10', type: 'percentage', value: 10, description: '10% Off Fine Gold Jewellery' },
  FESTIVE5000: { code: 'FESTIVE5000', type: 'flat', value: 5000, minOrder: 30000, description: 'Flat ₹5,000 Off on orders above ₹30,000' },
  FIRSTBUY: { code: 'FIRSTBUY', type: 'flat', value: 2000, minOrder: 15000, description: 'Flat ₹2,000 Off for new members' },
};

router.post('/apply', (req, res) => {
  const { code, cartTotal } = req.body;
  if (!code) {
    return res.status(400).json({ message: 'Coupon code required' });
  }

  const normalized = code.toUpperCase().trim();
  const coupon = coupons[normalized];

  if (!coupon) {
    return res.status(404).json({ message: 'Invalid coupon code. Try LUXE20 or FIRSTBUY' });
  }

  if (coupon.minOrder && cartTotal < coupon.minOrder) {
    return res.status(400).json({
      message: `Coupon ${coupon.code} requires a minimum order of ₹${coupon.minOrder.toLocaleString('en-IN')}`,
    });
  }

  let discountAmount = 0;
  if (coupon.type === 'percentage') {
    discountAmount = Math.round((cartTotal * coupon.value) / 100);
  } else {
    discountAmount = coupon.value;
  }

  res.json({
    valid: true,
    code: coupon.code,
    description: coupon.description,
    discountAmount,
  });
});

module.exports = router;

