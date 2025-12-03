import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';
import Bundle from './models/Bundle.js';
import Tip from './models/Tip.js';
import Baby from './models/Baby.js';
import Order from './models/Order.js';

dotenv.config();

const products = [
  // CLOTHING (12 products)
  {
    name: 'Organic Cotton Onesie',
    category: 'clothing',
    price: 499,
    badge: 'Best Seller',
    tagline: 'Soft & comfortable for your baby',
    emoji: '👶',
    inStock: true
  },
  {
    name: 'Summer Romper (Pack of 3)',
    category: 'clothing',
    price: 999,
    badge: 'Value Pack',
    tagline: 'Breathable cotton blend',
    emoji: '👕',
    inStock: true
  },
  {
    name: 'Winter Fleece Jacket',
    category: 'clothing',
    price: 1299,
    badge: 'Warm',
    tagline: 'Cozy warmth for cold days',
    emoji: '🧥',
    inStock: true
  },
  {
    name: 'Cute Print Pajama Set',
    category: 'clothing',
    price: 799,
    badge: 'New',
    tagline: 'Sweet dreams guaranteed',
    emoji: '😴',
    inStock: true
  },
  {
    name: 'Baby Socks Collection (12 pairs)',
    category: 'clothing',
    price: 599,
    badge: 'Essential',
    tagline: 'Non-slip & stretchy',
    emoji: '🧦',
    inStock: true
  },
  {
    name: 'Raincoat with Hood',
    category: 'clothing',
    price: 899,
    badge: 'Waterproof',
    tagline: 'Splash-proof fun',
    emoji: '🌧️',
    inStock: true
  },
  {
    name: 'Cute Tutu Dress',
    category: 'clothing',
    price: 1199,
    badge: 'Princess',
    tagline: 'Perfect for parties',
    emoji: '👗',
    inStock: true
  },
  {
    name: 'Denim Overalls',
    category: 'clothing',
    price: 1099,
    badge: 'Trendy',
    tagline: 'Stylish & comfortable',
    emoji: '👖',
    inStock: true
  },
  {
    name: 'Sun Hat with Chin Strap',
    category: 'clothing',
    price: 399,
    badge: 'UV Protection',
    tagline: 'Safe outdoor play',
    emoji: '🎩',
    inStock: true
  },
  {
    name: 'Knitted Sweater',
    category: 'clothing',
    price: 949,
    badge: 'Handmade',
    tagline: 'Soft merino wool',
    emoji: '🧶',
    inStock: true
  },
  {
    name: 'Sports Shoes (First Steps)',
    category: 'clothing',
    price: 1399,
    badge: 'Premium',
    tagline: 'Perfect for walking',
    emoji: '👟',
    inStock: true
  },
  {
    name: 'Mittens & Beanie Set',
    category: 'clothing',
    price: 549,
    badge: 'Winter',
    tagline: 'Keep baby warm',
    emoji: '🧤',
    inStock: false
  },

  // DIAPERS & CARE (10 products)
  {
    name: 'Premium Diaper Pack (60pcs)',
    category: 'diapers-care',
    price: 899,
    badge: 'Popular',
    tagline: '12-hour protection guaranteed',
    emoji: '🩱',
    inStock: true
  },
  {
    name: 'Baby Wipes (6 Pack)',
    category: 'diapers-care',
    price: 399,
    badge: 'Essential',
    tagline: 'Extra soft & fragrance-free',
    emoji: '🧻',
    inStock: true
  },
  {
    name: 'Eco-Friendly Diapers (50pcs)',
    category: 'diapers-care',
    price: 1099,
    badge: 'Eco',
    tagline: 'Biodegradable & sustainable',
    emoji: '🌱',
    inStock: true
  },
  {
    name: 'Diaper Rash Cream',
    category: 'diapers-care',
    price: 299,
    badge: 'Soothing',
    tagline: 'Zinc oxide formula',
    emoji: '💊',
    inStock: true
  },
  {
    name: 'Changing Pad Mat',
    category: 'diapers-care',
    price: 699,
    badge: 'Waterproof',
    tagline: 'Easy to clean surface',
    emoji: '🛏️',
    inStock: true
  },
  {
    name: 'Diaper Bag Organizer',
    category: 'diapers-care',
    price: 1599,
    badge: 'Spacious',
    tagline: 'Multiple pockets',
    emoji: '🎒',
    inStock: true
  },
  {
    name: 'Baby Powder (Talc-Free)',
    category: 'diapers-care',
    price: 249,
    badge: 'Safe',
    tagline: 'Cornstarch based',
    emoji: '✨',
    inStock: true
  },
  {
    name: 'Wet Bag for Cloth Diapers',
    category: 'diapers-care',
    price: 449,
    badge: 'Reusable',
    tagline: 'Leak-proof zipper',
    emoji: '💧',
    inStock: true
  },
  {
    name: 'Diaper Pail with Odor Lock',
    category: 'diapers-care',
    price: 2499,
    badge: 'Premium',
    tagline: 'No more smell',
    emoji: '🗑️',
    inStock: true
  },
  {
    name: 'Travel Diaper Kit',
    category: 'diapers-care',
    price: 799,
    badge: 'Portable',
    tagline: 'Compact & convenient',
    emoji: '🧳',
    inStock: true
  },

  // FEEDING (12 products)
  {
    name: 'Baby Feeding Bottle Set',
    category: 'feeding',
    price: 649,
    badge: 'New',
    tagline: 'BPA-free & anti-colic design',
    emoji: '🍼',
    inStock: true
  },
  {
    name: 'Silicone Bib Set',
    category: 'feeding',
    price: 349,
    badge: 'Bestseller',
    tagline: 'Easy to clean & adjustable',
    emoji: '🍽️',
    inStock: true
  },
  {
    name: 'High Chair with Tray',
    category: 'feeding',
    price: 4999,
    badge: 'Essential',
    tagline: 'Adjustable height settings',
    emoji: '🪑',
    inStock: true
  },
  {
    name: 'Baby Food Maker',
    category: 'feeding',
    price: 3499,
    badge: 'Smart',
    tagline: 'Steam & blend in one',
    emoji: '🥗',
    inStock: true
  },
  {
    name: 'Silicone Spoon & Fork Set',
    category: 'feeding',
    price: 299,
    badge: 'Soft',
    tagline: 'Gentle on gums',
    emoji: '🥄',
    inStock: true
  },
  {
    name: 'Insulated Food Container',
    category: 'feeding',
    price: 799,
    badge: 'Thermal',
    tagline: 'Keeps food warm/cold',
    emoji: '🍱',
    inStock: true
  },
  {
    name: 'Sippy Cup (2 Pack)',
    category: 'feeding',
    price: 549,
    badge: 'Spill-Proof',
    tagline: 'Leak-free learning',
    emoji: '🥤',
    inStock: true
  },
  {
    name: 'Breast Pump (Electric)',
    category: 'feeding',
    price: 6999,
    badge: 'Hospital Grade',
    tagline: 'Quiet & efficient',
    emoji: '⚡',
    inStock: true
  },
  {
    name: 'Nursing Pillow',
    category: 'feeding',
    price: 1299,
    badge: 'Comfort',
    tagline: 'Ergonomic support',
    emoji: '🛋️',
    inStock: true
  },
  {
    name: 'Bottle Sterilizer',
    category: 'feeding',
    price: 2999,
    badge: 'Hygienic',
    tagline: 'UV sterilization',
    emoji: '🔬',
    inStock: true
  },
  {
    name: 'Baby Food Storage Containers',
    category: 'feeding',
    price: 599,
    badge: 'Freezer Safe',
    tagline: 'Portion control',
    emoji: '📦',
    inStock: true
  },
  {
    name: 'Bottle Warmer',
    category: 'feeding',
    price: 1899,
    badge: 'Fast',
    tagline: 'Perfect temperature',
    emoji: '🌡️',
    inStock: true
  },

  // TOYS (14 products)
  {
    name: 'Plush Teddy Bear',
    category: 'toys',
    price: 799,
    badge: 'Trending',
    tagline: 'Hypoallergenic & super cuddly',
    emoji: '🧸',
    inStock: true
  },
  {
    name: 'Stacking Rings Toy',
    category: 'toys',
    price: 599,
    badge: 'Educational',
    tagline: 'Develops motor skills',
    emoji: '🎯',
    inStock: true
  },
  {
    name: 'Musical Activity Cube',
    category: 'toys',
    price: 1499,
    badge: 'Interactive',
    tagline: 'Lights & sounds',
    emoji: '🎵',
    inStock: true
  },
  {
    name: 'Soft Building Blocks (50pcs)',
    category: 'toys',
    price: 1199,
    badge: 'Creative',
    tagline: 'Safe foam material',
    emoji: '🧱',
    inStock: true
  },
  {
    name: 'Baby Rattle Set',
    category: 'toys',
    price: 399,
    badge: 'Sensory',
    tagline: 'Colorful & engaging',
    emoji: '🔔',
    inStock: true
  },
  {
    name: 'Pull-Along Duck Toy',
    category: 'toys',
    price: 699,
    badge: 'Classic',
    tagline: 'Encourages walking',
    emoji: '🦆',
    inStock: true
  },
  {
    name: 'Baby Piano Mat',
    category: 'toys',
    price: 1299,
    badge: 'Musical',
    tagline: 'Touch & play',
    emoji: '🎹',
    inStock: true
  },
  {
    name: 'Teething Toys Set',
    category: 'toys',
    price: 449,
    badge: 'Relief',
    tagline: 'Soothe sore gums',
    emoji: '🦷',
    inStock: true
  },
  {
    name: 'Cloth Book Collection',
    category: 'toys',
    price: 649,
    badge: 'Learning',
    tagline: 'Crinkle & discover',
    emoji: '📚',
    inStock: true
  },
  {
    name: 'Baby Gym Play Mat',
    category: 'toys',
    price: 2499,
    badge: 'Activity',
    tagline: 'Tummy time fun',
    emoji: '🎪',
    inStock: true
  },
  {
    name: 'Wooden Puzzle Set',
    category: 'toys',
    price: 899,
    badge: 'Brain Dev',
    tagline: 'Shape recognition',
    emoji: '🧩',
    inStock: true
  },
  {
    name: 'Bath Toys (8 pieces)',
    category: 'toys',
    price: 549,
    badge: 'Fun',
    tagline: 'Make bath time exciting',
    emoji: '🐠',
    inStock: true
  },
  {
    name: 'Rolling Ball Track',
    category: 'toys',
    price: 1799,
    badge: 'STEM',
    tagline: 'Cause & effect learning',
    emoji: '⚽',
    inStock: true
  },
  {
    name: 'Stuffed Elephant Toy',
    category: 'toys',
    price: 949,
    badge: 'Cute',
    tagline: 'Best friend forever',
    emoji: '🐘',
    inStock: true
  },

  // NURSERY (12 products)
  {
    name: 'Baby Crib Mobile',
    category: 'nursery',
    price: 1299,
    badge: 'Premium',
    tagline: 'Soothing music & gentle motion',
    emoji: '🎵',
    inStock: true
  },
  {
    name: 'Night Light Projector',
    category: 'nursery',
    price: 1499,
    badge: 'Popular',
    tagline: 'Starry sky with music',
    emoji: '⭐',
    inStock: true
  },
  {
    name: 'Convertible Crib',
    category: 'nursery',
    price: 14999,
    badge: 'Premium',
    tagline: 'Grows with your baby',
    emoji: '🛏️',
    inStock: true
  },
  {
    name: 'Nursery Glider Chair',
    category: 'nursery',
    price: 12999,
    badge: 'Comfort',
    tagline: 'Smooth rocking motion',
    emoji: '🪑',
    inStock: true
  },
  {
    name: 'Crib Mattress (Organic)',
    category: 'nursery',
    price: 5999,
    badge: 'Safe',
    tagline: 'Hypoallergenic & firm',
    emoji: '🛌',
    inStock: true
  },
  {
    name: 'Baby Monitor with Camera',
    category: 'nursery',
    price: 7999,
    badge: 'Smart',
    tagline: 'HD video & 2-way audio',
    emoji: '📹',
    inStock: true
  },
  {
    name: 'Nursery Wall Decals',
    category: 'nursery',
    price: 799,
    badge: 'Decorative',
    tagline: 'Removable & reusable',
    emoji: '🎨',
    inStock: true
  },
  {
    name: 'Blackout Curtains',
    category: 'nursery',
    price: 2499,
    badge: 'Sleep',
    tagline: 'Total darkness for naps',
    emoji: '🌙',
    inStock: true
  },
  {
    name: 'Diaper Changing Table',
    category: 'nursery',
    price: 8999,
    badge: 'Organized',
    tagline: 'Storage shelves included',
    emoji: '🗄️',
    inStock: true
  },
  {
    name: 'White Noise Machine',
    category: 'nursery',
    price: 1999,
    badge: 'Soothing',
    tagline: '20 calming sounds',
    emoji: '🔊',
    inStock: true
  },
  {
    name: 'Nursery Bookshelf',
    category: 'nursery',
    price: 3999,
    badge: 'Storage',
    tagline: 'Display & organize',
    emoji: '📖',
    inStock: true
  },
  {
    name: 'Baby Swing Chair',
    category: 'nursery',
    price: 6999,
    badge: 'Comfort',
    tagline: 'Multiple swing speeds',
    emoji: '🪢',
    inStock: true
  },

  // BATH (10 products)
  {
    name: 'Gentle Bath Wash Set',
    category: 'bath',
    price: 549,
    badge: 'Organic',
    tagline: 'Tear-free & pH balanced',
    emoji: '🛁',
    inStock: true
  },
  {
    name: 'Hooded Baby Towel',
    category: 'bath',
    price: 699,
    badge: 'Soft',
    tagline: 'Ultra-absorbent bamboo fiber',
    emoji: '🧺',
    inStock: true
  },
  {
    name: 'Baby Bathtub (Foldable)',
    category: 'bath',
    price: 1999,
    badge: 'Space Saving',
    tagline: 'Easy storage',
    emoji: '🛁',
    inStock: true
  },
  {
    name: 'Baby Shampoo (Natural)',
    category: 'bath',
    price: 399,
    badge: 'Gentle',
    tagline: 'No harsh chemicals',
    emoji: '🧴',
    inStock: true
  },
  {
    name: 'Bath Thermometer',
    category: 'bath',
    price: 299,
    badge: 'Safety',
    tagline: 'Perfect water temperature',
    emoji: '🌡️',
    inStock: true
  },
  {
    name: 'Baby Washcloth Set (6pc)',
    category: 'bath',
    price: 449,
    badge: 'Soft',
    tagline: 'Extra gentle on skin',
    emoji: '🧽',
    inStock: true
  },
  {
    name: 'Bath Kneeler Pad',
    category: 'bath',
    price: 899,
    badge: 'Comfort',
    tagline: 'For parent\'s knees',
    emoji: '🦵',
    inStock: true
  },
  {
    name: 'Baby Lotion (Moisturizing)',
    category: 'bath',
    price: 499,
    badge: 'Hydrating',
    tagline: 'Vitamin E enriched',
    emoji: '🧴',
    inStock: true
  },
  {
    name: 'Bath Toy Organizer',
    category: 'bath',
    price: 599,
    badge: 'Storage',
    tagline: 'Mesh bag with suction',
    emoji: '🎒',
    inStock: true
  },
  {
    name: 'Baby Brush & Comb Set',
    category: 'bath',
    price: 349,
    badge: 'Grooming',
    tagline: 'Soft bristles',
    emoji: '💇',
    inStock: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/babybliss');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    await Bundle.deleteMany({});
    await Tip.deleteMany({});
    await Baby.deleteMany({});
    await Order.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert products
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Seeded ${insertedProducts.length} products`);

    // Create demo users
    const demoUser = new User({
      name: 'Demo User',
      email: 'user@demo.com',
      passwordHash: 'password123',
      role: 'user',
      phoneNumber: '+91 98765 43210'
    });
    await demoUser.save();

    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@demo.com',
      passwordHash: 'admin123',
      role: 'admin',
      phoneNumber: '+91 98765 00000'
    });
    await adminUser.save();
    console.log('✅ Created demo users');

    // Create baby profile for demo user
    const demoBaby = new Baby({
      userId: demoUser._id,
      babyName: 'Emma',
      dateOfBirth: new Date('2024-06-15'),
      gender: 'female',
      weight: 7.5,
      height: 65,
      skinType: 'sensitive',
      allergyNote: 'None known'
    });
    await demoBaby.save();
    console.log('✅ Created demo baby profile');

    // Create bundles
    const bundles = [
      {
        name: 'Newborn Starter Pack',
        description: 'Everything you need for your newborn baby',
        productIds: insertedProducts.slice(0, 6).map(p => p._id),
        originalPrice: 4000,
        bundlePrice: 3200,
        discount: 20,
        imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop',
        ageRange: '0-3 months',
        isActive: true
      },
      {
        name: 'Hospital Bag Essentials',
        description: 'Must-have items for the hospital',
        productIds: insertedProducts.slice(12, 18).map(p => p._id),
        originalPrice: 3500,
        bundlePrice: 2800,
        discount: 20,
        imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop',
        ageRange: '0-3 months',
        isActive: true
      },
      {
        name: 'Feeding Time Bundle',
        description: 'Complete feeding solution for your baby',
        productIds: insertedProducts.slice(24, 30).map(p => p._id),
        originalPrice: 5000,
        bundlePrice: 4000,
        discount: 20,
        imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784422?w=400&h=300&fit=crop',
        ageRange: '3-6 months',
        isActive: true
      },
      {
        name: 'Playtime Fun Pack',
        description: 'Educational and entertaining toys',
        productIds: insertedProducts.slice(36, 42).map(p => p._id),
        originalPrice: 4500,
        bundlePrice: 3600,
        discount: 20,
        imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=300&fit=crop',
        ageRange: '6-12 months',
        isActive: true
      }
    ];

    await Bundle.insertMany(bundles);
    console.log(`✅ Created ${bundles.length} bundles`);

    // Create parenting tips
    const tips = [
      {
        title: 'Skin-to-Skin Contact',
        body: 'Spend time doing skin-to-skin contact with your newborn. This helps regulate their temperature, heart rate, and promotes bonding.',
        ageRange: '0-3 months',
        category: 'health',
        isActive: true
      },
      {
        title: 'Tummy Time Benefits',
        body: 'Start tummy time early! It strengthens neck, shoulder, and arm muscles. Begin with 3-5 minutes, 2-3 times a day.',
        ageRange: '0-3 months',
        category: 'development',
        isActive: true
      },
      {
        title: 'Safe Sleep Practices',
        body: 'Always place your baby on their back to sleep. Keep the crib clear of blankets, pillows, and toys to reduce SIDS risk.',
        ageRange: 'all',
        category: 'safety',
        isActive: true
      },
      {
        title: 'Introducing Solid Foods',
        body: 'Around 6 months, start with single-ingredient purees like mashed banana or sweet potato. Watch for allergic reactions.',
        ageRange: '6-12 months',
        category: 'nutrition',
        isActive: true
      },
      {
        title: 'Establishing Sleep Routine',
        body: 'Create a consistent bedtime routine: bath, massage, story, and lullaby. This helps signal sleep time to your baby.',
        ageRange: '3-6 months',
        category: 'sleep',
        isActive: true
      },
      {
        title: 'Baby Massage',
        body: 'Gentle massage can soothe your baby, aid digestion, and improve sleep. Use baby-safe oil and gentle strokes.',
        ageRange: 'all',
        category: 'health',
        isActive: true
      },
      {
        title: 'Reading to Baby',
        body: 'It\'s never too early to read! Use colorful board books and engage with different voices to stimulate language development.',
        ageRange: 'all',
        category: 'development',
        isActive: true
      },
      {
        title: 'Diaper Rash Prevention',
        body: 'Change diapers frequently, clean gently, and let skin air dry. Apply barrier cream if needed. Choose breathable diapers.',
        ageRange: 'all',
        category: 'health',
        isActive: true
      },
      {
        title: 'Teething Relief',
        body: 'Offer cold teething rings, massage gums gently, and maintain good oral hygiene. Consult pediatrician if severe discomfort.',
        ageRange: '3-6 months',
        category: 'health',
        isActive: true
      },
      {
        title: 'Encouraging Crawling',
        body: 'Place toys just out of reach to motivate movement. Create a safe space for exploration and celebrate small achievements!',
        ageRange: '6-12 months',
        category: 'development',
        isActive: true
      }
    ];

    await Tip.insertMany(tips);
    console.log(`✅ Created ${tips.length} parenting tips`);

    // Create a demo order
    const demoOrder = new Order({
      userId: demoUser._id,
      items: [
        {
          productId: insertedProducts[0]._id,
          name: insertedProducts[0].name,
          price: insertedProducts[0].price,
          quantity: 2,
          imageUrl: insertedProducts[0].imageUrl
        },
        {
          productId: insertedProducts[12]._id,
          name: insertedProducts[12].name,
          price: insertedProducts[12].price,
          quantity: 1,
          imageUrl: insertedProducts[12].imageUrl
        }
      ],
      totalAmount: (insertedProducts[0].price * 2) + insertedProducts[12].price,
      status: 'delivered',
      shippingAddress: {
        fullName: 'Demo User',
        phone: '+91 98765 43210',
        addressLine1: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400001',
        country: 'India'
      },
      paymentMethod: 'demo-cod'
    });
    await demoOrder.save();
    console.log('✅ Created demo order');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📝 Demo Accounts:');
    console.log('   User: user@demo.com / password123');
    console.log('   Admin: admin@demo.com / admin123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
