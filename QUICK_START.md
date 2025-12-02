# 🚀 Quick Start Guide - BabyBliss PWA

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

---

## Step 1: Install Dependencies

### Option A: Automatic Installation (Recommended)
```bash
chmod +x install-and-run.sh
./install-and-run.sh
```

### Option B: Manual Installation
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

---

## Step 2: Setup MongoDB

### Option A: Local MongoDB
```bash
# Start MongoDB service
mongod
```

### Option B: MongoDB Atlas
Update `server/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/babybliss
PORT=5000
```

---

## Step 3: Seed Database
```bash
cd server
npm run seed
```

**Expected Output**:
```
✅ Connected to MongoDB
🌱 Database seeded with 12 products
```

---

## Step 4: Start Development Servers

### Terminal 1 - Backend API
```bash
cd server
npm start
```

**Expected Output**:
```
🚀 Server running on port 5000
✅ Connected to MongoDB
```

### Terminal 2 - Frontend Client
```bash
cd client
npm run dev
```

**Expected Output**:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## Step 5: Test the Application

### Open in Browser
Navigate to: `http://localhost:5173`

### Test Checklist
- ✅ Hero section loads with 3D background
- ✅ Categories animate on scroll
- ✅ Products load from API
- ✅ Search functionality works
- ✅ Add to cart shows badge
- ✅ Wishlist heart toggles
- ✅ Push notification works
- ✅ Header shadow appears on scroll
- ✅ Mobile menu opens smoothly

---

## Features to Test

### 🎨 Animations
1. **3D Background**: Scroll to top, see floating spheres
2. **Stagger Animations**: Watch categories appear sequentially
3. **Hover Effects**: Hover over products and categories
4. **Scroll Trigger**: Scroll down to see animations trigger

### 🎯 Functionality
1. **Search**: Type "organic" in search box
2. **Category Filter**: Click different category tabs
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Wishlist**: Click heart icon on products
5. **Push Notification**: Click "Enable Notifications" in hero

### 📱 PWA Features
1. **Install App**: Click install prompt (Chrome/Edge)
2. **Offline Mode**: Disconnect internet, reload page
3. **Service Worker**: Check DevTools > Application > Service Workers

---

## Troubleshooting

### Error: "Cannot find module 'framer-motion'"
**Solution**: Install client dependencies
```bash
cd client
npm install
```

### Error: "MongoDB connection failed"
**Solution**: 
1. Check MongoDB is running: `mongod`
2. Verify connection string in `server/.env`
3. For MongoDB Atlas, whitelist your IP

### Error: "Port 5000 already in use"
**Solution**: Change port in `server/.env`
```env
PORT=5001
```

### Animations not showing
**Solution**: 
1. Clear browser cache
2. Check console for errors
3. Ensure npm install completed successfully

### 3D Background not rendering
**Solution**:
1. Check WebGL support: Visit `https://get.webgl.org/`
2. Update graphics drivers
3. Try different browser (Chrome/Edge recommended)

---

## Development Commands

### Server
```bash
cd server

# Start development server
npm start

# Seed database
npm run seed

# Run tests (if available)
npm test
```

### Client
```bash
cd client

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## Environment Variables

### Server (.env)
```env
MONGODB_URI=mongodb://localhost:27017/babybliss
PORT=5000
NODE_ENV=development
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=Clothing` - Filter by category
- `GET /api/products/:id` - Get single product

### Test API
```bash
# Get all products
curl http://localhost:5000/api/products

# Get products in Clothing category
curl http://localhost:5000/api/products?category=Clothing
```

---

## Browser Support

### Recommended
- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+

### WebGL Required For
- 3D Background (Hero section)
- Falls back gracefully if not supported

---

## Performance Tips

### Development
- Use Chrome DevTools Performance tab
- Monitor FPS with "Show FPS Meter"
- Check bundle size: `npm run build -- --mode analyze`

### Production
- Run production build: `cd client && npm run build`
- Serve optimized bundle
- Enable gzip compression
- Use CDN for static assets

---

## Project Structure
```
ecommerce-pwa/
├── client/              # React + Vite frontend
│   ├── src/
│   │   ├── components/  # All React components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # API client
│   │   └── App.tsx      # Main app component
│   └── public/
│       ├── manifest.json # PWA manifest
│       └── sw.js        # Service worker
├── server/              # Express backend
│   ├── models/          # Mongoose models
│   ├── controllers/     # Route controllers
│   ├── routes/          # API routes
│   └── seed.js          # Database seeder
└── Documentation files
```

---

## Next Steps

1. ✅ Install and run the app
2. 📝 Read `ANIMATION_FEATURES.md` for animation details
3. 🎨 Customize colors in `tailwind.config.js`
4. 🚀 Deploy to production (see `DEPLOYMENT.md`)
5. 📊 Add analytics
6. 🔒 Implement authentication

---

## Quick Reference

| Task | Command |
|------|---------|
| Install all | `./install-and-run.sh` |
| Seed DB | `cd server && npm run seed` |
| Start backend | `cd server && npm start` |
| Start frontend | `cd client && npm run dev` |
| Build production | `cd client && npm run build` |
| View logs | Check terminal output |

---

## Support

- 📖 Documentation: See `/docs` folder
- 🐛 Issues: Check browser console
- 💬 Questions: Review `PROJECT_SUMMARY.md`

---

## Demo Features

This is a **demo PWA** showcasing:
- ✅ MERN stack architecture
- ✅ PWA capabilities (offline, installable)
- ✅ Modern animations (Framer Motion + Three.js)
- ✅ Responsive design (Tailwind CSS)
- ✅ Component library (shadcn/ui)
- ✅ Real-time search
- ✅ Interactive features (wishlist, cart)

**Not included** (for demo purposes):
- ❌ Payment processing
- ❌ User authentication
- ❌ Order management
- ❌ Admin dashboard

---

Enjoy building with BabyBliss! 🎉👶
