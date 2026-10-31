require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const seedProducts = require('../data/seedProducts');

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aurelia_jewels';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products.');

    // Insert seed products
    const insertedProducts = await Product.insertMany(seedProducts);
    console.log(`Successfully seeded ${insertedProducts.length} jewellery products!`);

    // Create a demo customer user if not exists
    const existingDemo = await User.findOne({ email: 'demo@aureliajewels.com' });
    if (!existingDemo) {
      await User.create({
        name: 'Priya Sharma',
        email: 'demo@aureliajewels.com',
        password: 'password123',
        phone: '+91 98765 43210',
        addresses: [
          {
            fullName: 'Priya Sharma',
            phone: '+91 98765 43210',
            street: '42, Boulevard Heights, Bandra West',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400050',
            landmark: 'Near Carter Road Promenade',
            isDefault: true,
          },
        ],
      });
      console.log('Created default demo user: demo@aureliajewels.com / password123');
    }

    process.exit(0);
  } catch (err) {
    console.error('Error during seeding:', err);
    process.exit(1);
  }
};

seedDB();

