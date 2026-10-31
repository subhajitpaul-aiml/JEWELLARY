const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  quantity: { type: Number, required: true, default: 1 },
  selectedSize: { type: String, default: 'Standard' },
  selectedMetal: { type: String, default: '14 KT Yellow Gold' },
  purity: { type: String, default: '14 KT' },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      landmark: { type: String },
    },
    paymentMethod: {
      type: String,
      required: true,
      default: 'UPI',
    },
    paymentDetails: {
      transactionId: { type: String },
      upiId: { type: String },
      status: { type: String, default: 'COMPLETED' },
    },
    itemsPrice: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    taxPrice: { type: Number, default: 0 },
    shippingPrice: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    couponApplied: { type: String, default: null },
    orderStatus: {
      type: String,
      enum: ['Confirmed', 'Processing', 'Crafting in Studio', 'Shipped', 'Delivered'],
      default: 'Confirmed',
    },
    estimatedDelivery: {
      type: String,
      default: () => {
        const d = new Date();
        d.setDate(d.getDate() + 4);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);

