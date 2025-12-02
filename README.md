# BabyBliss - E-commerce PWA for Baby Products 👶

A modern, full-stack Progressive Web App (PWA) built with the MERN stack, featuring baby products e-commerce functionality with offline support, push notifications, and **premium animations** powered by Framer Motion and Three.js.

## ✨ What's New - Enhanced UI

🎨 **Smooth Animations**: Framer Motion animations throughout  
🌐 **3D Background**: Three.js floating spheres in hero section  
🔍 **Live Search**: Real-time product filtering  
❤️ **Wishlist Feature**: Toggle favorites with heart icon  
📱 **Mobile Menu**: Smooth slide-in animations  
👀 **Scroll Effects**: Progressive animations on scroll  

See [ENHANCEMENTS_SUMMARY.md](ENHANCEMENTS_SUMMARY.md) for complete details.

## 🚀 Tech Stack

### Backend
- **Node.js** + **Express.js** - REST API server
- **MongoDB** + **Mongoose** - Database and ODM
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **Lucide React** - Icon library
- **Framer Motion** - Animation library ✨ NEW
- **Three.js** - 3D graphics ✨ NEW
- **@react-three/fiber** - React renderer for Three.js ✨ NEW
- **@react-three/drei** - Three.js helpers ✨ NEW

### PWA Features
- Service Worker for offline support
- Web App Manifest for installability
- Push Notifications API
- Cache-first strategy for assets

## 📁 Project Structure

```
ecommerce-pwa/
├── server/                 # Backend API
│   ├── models/            # MongoDB models
│   ├── controllers/       # Route controllers
│   ├── routes/           # API routes
│   ├── server.js         # Express app entry
│   ├── seed.js           # Database seeding
│   └── package.json
│
├── client/                # Frontend React app
│   ├── public/
│   │   ├── manifest.json # PWA manifest
│   │   ├── sw.js         # Service worker
│   │   └── icons/        # PWA icons
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── ui/       # shadcn/ui components
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── CategoryGrid.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Footer.tsx
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and API
│   │   ├── App.tsx       # Main app component
│   │   └── main.tsx      # Entry point
│   └── package.json
│
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- MongoDB installed and running locally or MongoDB Atlas account

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Configure Backend Environment
The `.env` file in the `server` directory is already configured:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/babybliss
NODE_ENV=development
```

### 3. Seed the Database
```bash
npm run seed
```

### 4. Install Frontend Dependencies
```bash
cd ../client
npm install
```

## 🚀 Running the Application

### Start Backend Server
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

### Start Frontend Development Server
In a new terminal:
```bash
cd client
npm run dev
# App runs on http://localhost:3000
```

### Access the Application
- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000/api

## 📱 PWA Features

### Service Worker
Provides offline support and caching

### Push Notifications
Test by clicking the **"Send Notification"** button

### Installation
Install as a standalone app on mobile and desktop

## 🎨 Features Implemented

✅ Responsive design (mobile-first)
✅ Product catalog with filtering
✅ Shopping cart functionality
✅ Push notifications
✅ Offline support
✅ Modern UI with shadcn/ui + Tailwind

## 🔒 Important Notes

⚠️ **This is a DEMO application for assessment purposes only**
- No real payment processing
- Local push notifications only
- Demo product data
- Not for actual e-commerce transactions

## 📚 Documentation

This project includes comprehensive documentation:

- **[SETUP.md](SETUP.md)** - Quick setup guide (5 min read)
- **[QUICKREF.md](QUICKREF.md)** - One-page cheat sheet
- **[GUIDE.md](GUIDE.md)** - Complete implementation guide
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Project overview
- **[FILE_STRUCTURE.md](FILE_STRUCTURE.md)** - Directory tree
- **[DEMO_SCRIPT.md](DEMO_SCRIPT.md)** - Demo walkthrough
- **[DOCS_INDEX.md](DOCS_INDEX.md)** - Documentation index

**Quick Start**: See [SETUP.md](SETUP.md) for 3-step installation

---

**Made with ❤️ for babies and their parents**