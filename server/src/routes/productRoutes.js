const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - query filter, sort & search
router.get('/', async (req, res) => {
  try {
    const {
      category,
      subcategory,
      metal,
      gender,
      minPrice,
      maxPrice,
      search,
      sort,
      featured,
      bestseller,
      newArrival,
      fastDelivery,
    } = req.query;

    const query = {};

    if (category && category !== 'All' && category !== 'all') {
      // Case-insensitive regex match for category
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (subcategory) {
      query.subcategory = { $regex: new RegExp(subcategory, 'i') };
    }

    if (metal) {
      query.metal = { $regex: new RegExp(metal, 'i') };
    }

    if (gender && gender !== 'All') {
      query.gender = gender;
    }

    if (fastDelivery === 'true') {
      query.fastDelivery = true;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (bestseller === 'true') {
      query.isBestSeller = true;
    }

    if (newArrival === 'true') {
      query.isNewArrival = true;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { title: searchRegex },
        { category: searchRegex },
        { subcategory: searchRegex },
        { collectionName: searchRegex },
        { description: searchRegex },
        { tags: { $in: [searchRegex] } },
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') {
      sortOption = { price: 1 };
    } else if (sort === 'price_desc') {
      sortOption = { price: -1 };
    } else if (sort === 'popular' || sort === 'bestseller') {
      sortOption = { reviewsCount: -1, rating: -1 };
    } else if (sort === 'discount') {
      sortOption = { discountPercentage: -1 };
    } else if (sort === 'latest') {
      sortOption = { createdAt: -1 };
    }

    const products = await Product.find(query).sort(sortOption);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/products/meta/categories - get all categories with count
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 }, sampleImage: { $first: '$images' } } },
      { $sort: { count: -1 } },
    ]);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/products/slug/:slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Also fetch related products from same category
    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(4);

    res.json({ product, related });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(4);

    res.json({ product, related });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

