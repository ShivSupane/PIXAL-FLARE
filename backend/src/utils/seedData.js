const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PhotographyService = require('../models/PhotographyService');
const AdditionalService = require('../models/AdditionalService');
const User = require('../models/User');

// Load env vars
dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGODB_URI);

// Sample photography services
const photographyServices = [
  {
    name: 'Wedding Photography - Standard Package',
    description: 'Complete coverage of your wedding day including ceremony and reception. Includes edited digital photos.',
    category: 'wedding',
    basePrice: 1500,
    duration: 6
  },
  {
    name: 'Wedding Photography - Premium Package',
    description: 'Extended coverage of your wedding day including preparation, ceremony, and reception. Includes edited digital photos and a photo album.',
    category: 'wedding',
    basePrice: 2500,
    duration: 10
  },
  {
    name: 'Baby Shower Photography',
    description: 'Capture all the special moments of your baby shower celebration.',
    category: 'baby shower',
    basePrice: 500,
    duration: 3
  },
  {
    name: 'Product Photography - Basic',
    description: 'Professional product photography for e-commerce or catalogs. Includes 10 products with 3 angles each.',
    category: 'product',
    basePrice: 400,
    duration: 4
  },
  {
    name: 'Event Coverage - Standard',
    description: 'Photography services for corporate events, parties, or gatherings.',
    category: 'event',
    basePrice: 800,
    duration: 4
  },
  {
    name: 'Portrait Session',
    description: 'Professional portrait photography session for individuals or families.',
    category: 'portrait',
    basePrice: 300,
    duration: 2
  }
];

// Sample additional services
const additionalServices = [
  {
    name: 'Drone Photography',
    description: 'Aerial photography to capture unique perspectives of your event.',
    price: 350
  },
  {
    name: 'Extra Hour Coverage',
    description: 'Additional hour of photography services.',
    price: 150
  },
  {
    name: 'Raw Files Delivery',
    description: 'Get all the unedited raw files from your session.',
    price: 200
  },
  {
    name: 'Printed Photo Album',
    description: 'Premium printed photo album with 30 pages of your best photos.',
    price: 300
  },
  {
    name: 'Second Photographer',
    description: 'Additional photographer to cover your event from different angles.',
    price: 400
  },
  {
    name: 'Express Delivery',
    description: 'Get your edited photos within 3 days.',
    price: 150
  }
];

// Sample admin user
const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin'
};

// Import data into DB
const importData = async () => {
  try {
    // Clear existing data
    await PhotographyService.deleteMany();
    await AdditionalService.deleteMany();
    
    // Check if admin user exists
    const adminExists = await User.findOne({ email: adminUser.email });
    if (!adminExists) {
      await User.create(adminUser);
      console.log('Admin user created');
    }

    // Import services
    await PhotographyService.insertMany(photographyServices);
    await AdditionalService.insertMany(additionalServices);

    console.log('Data imported successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await PhotographyService.deleteMany();
    await AdditionalService.deleteMany();

    console.log('Data destroyed successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Call the appropriate function based on command-line arguments
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please provide proper command: -i (import) or -d (delete)');
  process.exit();
} 