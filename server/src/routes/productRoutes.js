const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const seedProducts = require('../data/seedProducts');

// Fallback in-memory filter
const filterSeedProducts = (req) => {
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
  } = req.query;

  let list = [...seedProducts];

  if (category && category !== 'All' && category !== 'all') {
    list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }
  if (subcategory) {
    list = list.filter((p) => p.subcategory?.toLowerCase().includes(subcategory.toLowerCase()));
  }
  if (metal) {
    list = list.filter((p) => p.metal?.toLowerCase().includes(metal.toLowerCase()));
  }
  if (gender && gender !== 'All') {
    list = list.filter((p) => p.gender === gender);
  }
  if (minPrice) {
    list = list.filter((p) => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    list = list.filter((p) => p.price <= Number(maxPrice));
  }
  if (featured === 'true') {
    list = list.filter((p) => p.isFeatured);
  }
  if (bestseller === 'true') {
    list = list.filter((p) => p.isBestSeller);
  }
  if (newArrival === 'true') {
    list = list.filter((p) => p.isNewArrival);
  }
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s) ||
        p.subcategory.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s)
    );
  }

  if (sort === 'price_asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === 'popular' || sort === 'bestseller') {
    list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
  } else if (sort === 'discount') {
    list.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
  }

  return list;
};

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
    if (!products || products.length === 0) {
      return res.json(filterSeedProducts(req));
    }
    res.json(products);
  } catch (error) {
    console.warn('DB query error, using seedProducts fallback:', error.message);
    res.json(filterSeedProducts(req));
  }
});

// GET /api/products/meta/categories - get all categories with count
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 }, sampleImage: { $first: '$images' } } },
      { $sort: { count: -1 } },
    ]);
    if (!categories || categories.length === 0) {
      throw new Error('No categories in DB');
    }
    res.json(categories);
  } catch (error) {
    const map = {};
    seedProducts.forEach((p) => {
      if (!map[p.category]) {
        map[p.category] = { _id: p.category, count: 0, sampleImage: p.images };
      }
      map[p.category].count++;
    });
    res.json(Object.values(map));
  }
});

// GET /api/products/slug/:slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      const found = seedProducts.find((p) => p.slug === req.params.slug);
      if (!found) return res.status(404).json({ message: 'Product not found' });
      const related = seedProducts.filter((p) => p.category === found.category && p.slug !== found.slug).slice(0, 4);
      return res.json({ product: found, related });
    }
    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(4);

    res.json({ product, related });
  } catch (error) {
    const found = seedProducts.find((p) => p.slug === req.params.slug);
    if (!found) return res.status(404).json({ message: 'Product not found' });
    const related = seedProducts.filter((p) => p.category === found.category && p.slug !== found.slug).slice(0, 4);
    res.json({ product: found, related });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      const found = seedProducts[0];
      return res.json({ product: found, related: seedProducts.slice(1, 5) });
    }
    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(4);

    res.json({ product, related });
  } catch (error) {
    const found = seedProducts[0];
    res.json({ product: found, related: seedProducts.slice(1, 5) });
  }
});

module.exports = router;
