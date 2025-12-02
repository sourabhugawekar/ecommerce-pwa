# BabyBliss PWA - Setup Guide

## Quick Start (3 Steps)

### Step 1: Start MongoDB
```bash
# Make sure MongoDB is running
mongod
# OR if installed as service:
sudo systemctl start mongod
```

### Step 2: Setup and Start Backend
```bash
cd server
npm install
npm run seed    # Seed database with demo products
npm run dev     # Start backend server on port 5000
```

### Step 3: Setup and Start Frontend (in new terminal)
```bash
cd client
npm install
npm run dev     # Start frontend on port 3000
```

## Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Testing PWA Features

### Test Push Notifications
1. Open http://localhost:3000
2. Click "Send Notification" button in hero section
3. Grant permission when prompted
4. You should see a notification!

### Test Offline Mode
1. Open Chrome DevTools (F12)
2. Go to Application tab → Service Workers
3. Check "Offline" checkbox
4. Refresh page - it should still work!

### Test Installation
1. Look for install icon in browser address bar
2. Click to install as standalone app
3. App will open in its own window

## Project Structure

```
server/
  ├── models/Product.js         # MongoDB product schema
  ├── controllers/              # Business logic
  ├── routes/productRoutes.js   # API endpoints
  ├── server.js                 # Express app
  └── seed.js                   # Sample data

client/
  ├── src/
  │   ├── components/           # React components
  │   │   ├── ui/              # shadcn/ui components
  │   │   ├── Header.tsx       # Top navigation
  │   │   ├── Hero.tsx         # Banner + notification button
  │   │   ├── CategoryGrid.tsx # Category cards
  │   │   ├── ProductGrid.tsx  # Product listing
  │   │   ├── ProductCard.tsx  # Individual product
  │   │   ├── Testimonials.tsx # Reviews
  │   │   └── Footer.tsx       # Bottom section
  │   ├── hooks/
  │   │   ├── useCart.ts       # Shopping cart logic
  │   │   └── useProducts.ts   # Product fetching
  │   ├── lib/
  │   │   ├── api.ts           # API calls
  │   │   └── utils.ts         # Utilities
  │   └── App.tsx              # Main component
  ├── public/
  │   ├── manifest.json        # PWA manifest
  │   ├── sw.js                # Service worker
  │   └── icons/               # App icons
  └── package.json
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products?category=clothing` - Filter by category
- `GET /api/products/:id` - Get single product
- `GET /api/health` - Health check

## Technologies Used

**Backend:**
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM

**Frontend:**
- React 18 + TypeScript
- Vite - Build tool
- Tailwind CSS - Styling
- shadcn/ui - Component library

**PWA:**
- Service Worker - Offline support
- Web App Manifest - Installability
- Notification API - Push notifications

## Common Issues

### MongoDB Connection Error
- Make sure MongoDB is running: `mongod`
- Check connection string in `server/.env`

### Port Already in Use
- Backend: Change PORT in `server/.env`
- Frontend: Change port in `client/vite.config.ts`

### Service Worker Not Registering
- Use HTTPS or localhost only
- Check browser console for errors
- Clear cache and reload

### Icons Not Showing
- Icons are SVG placeholders
- For production, use real PNG icons (72, 96, 128, 144, 152, 192, 384, 512 px)

## Demo Features

✅ Responsive design
✅ 12 sample products across 6 categories
✅ Shopping cart with badge
✅ Category filtering
✅ Offline support
✅ Push notifications
✅ Installable PWA
✅ Smooth animations
✅ Mobile-first design

## Important Note

⚠️ This is a DEMO for assessment purposes only
- No real payments
- No authentication
- Demo notifications only
- Sample data

Not for production e-commerce use.
