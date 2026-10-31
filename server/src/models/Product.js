const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    subcategory: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    reviewsCount: {
      type: Number,
      default: 34,
    },
    images: {
      type: [String],
      required: true,
    },
    bannerBadge: {
      type: String,
      default: 'Trending',
    },
    metal: {
      type: String,
      required: true,
    },
    purity: {
      type: String,
      default: '14 KT',
    },
    diamondClarity: {
      type: String,
      default: 'FG-SI',
    },
    gender: {
      type: String,
      enum: ['Women', 'Men', 'Unisex', 'Kids'],
      default: 'Women',
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    fastDelivery: {
      type: Boolean,
      default: true,
    },
    specifications: {
      goldWeight: { type: String, default: '2.40 gms' },
      diamondWeight: { type: String, default: '0.18 ct' },
      diamondCount: { type: Number, default: 12 },
      grossWeight: { type: String, default: '2.55 gms' },
      height: { type: String, default: '18.5 mm' },
      width: { type: String, default: '14.2 mm' },
      certification: { type: String, default: 'BIS Hallmark & SGL/IGI Certified' },
    },
    sizes: {
      type: [String],
      default: ['10', '12', '14', '16', '18'],
    },
    collectionName: {
      type: String,
      default: 'Aurelia Signature',
    },
    tags: [String],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);

