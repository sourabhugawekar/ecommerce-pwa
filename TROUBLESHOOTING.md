# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### 1. TypeScript Errors: "Cannot find module 'framer-motion'"

**Symptom**: TypeScript shows errors about missing modules

**Solution**:
```bash
cd client
npm install
```

**Verify**:
```bash
ls client/node_modules/framer-motion
ls client/node_modules/three
```

---

### 2. API Connection Failed / Products Not Loading

**Symptom**: Products don't show, console shows fetch errors

**Possible Causes**:

#### A. Backend server not running
```bash
# Terminal 1 - Start backend
cd server
npm start
```

#### B. MongoDB not connected
Check `server/.env`:
```env
MONGODB_URI=mongodb+srv://your-connection-string
# OR for local MongoDB
MONGODB_URI=mongodb://localhost:27017/babybliss
```

#### C. CORS issues
Update `server/server.js` if needed:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

#### D. Wrong API URL
Check `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

**Test API manually**:
```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/products
```

---

### 3. 3D Background Not Showing

**Symptom**: Hero section has no floating spheres

**Possible Causes**:

#### A. WebGL not supported
Visit: https://get.webgl.org/

#### B. Three.js not installed
```bash
cd client
npm install three @react-three/fiber @react-three/drei
```

#### C. Browser compatibility
Use Chrome/Edge/Firefox latest version

**Fallback**: The ErrorBoundary will silently hide 3D if it fails

---

### 4. Animations Not Working

**Symptom**: No smooth transitions, stagger effects missing

**Solution**:
```bash
cd client
npm install framer-motion
```

**Verify installation**:
```bash
npm list framer-motion
# Should show: framer-motion@10.16.16
```

---

### 5. Port Conflicts

**Symptom**: "Port already in use" error

**Backend (Port 5000)**:
```bash
# Find process using port
lsof -ti:5000

# Kill process (Mac/Linux)
kill -9 $(lsof -ti:5000)

# Or change port in server/.env
PORT=5001
```

**Frontend (Port 5173)**:
```bash
# Kill process
kill -9 $(lsof -ti:5173)

# Or change port in vite.config.ts
server: {
  port: 3000,
  // ...
}
```

---

### 6. Database Not Seeded

**Symptom**: No products showing even though API works

**Solution**:
```bash
cd server
npm run seed
```

**Expected Output**:
```
✅ Connected to MongoDB
🌱 Database seeded with 12 products
```

**Verify**:
```bash
curl http://localhost:5000/api/products | json_pp
# Should return array of 12 products
```

---

### 7. Service Worker Not Registering

**Symptom**: Console shows SW registration failed

**Solution**:

#### A. Check file exists
```bash
ls client/public/sw.js
```

#### B. Serve over HTTPS or localhost
Service workers require secure context

#### C. Clear old service workers
1. Open DevTools > Application > Service Workers
2. Click "Unregister"
3. Refresh page

---

### 8. Push Notifications Not Working

**Symptom**: "Enable Notifications" button doesn't work

**Solution**:

#### A. Check browser support
```javascript
if ('Notification' in window) {
  console.log('Notifications supported');
}
```

#### B. Check permissions
1. Browser settings > Site settings
2. Allow notifications for localhost

#### C. Service worker must be registered
Wait for SW to register before clicking button

---

### 9. Wishlist/Search Not Working

**Symptom**: Heart icon doesn't toggle, search doesn't filter

**Possible Causes**:

#### A. React state not updating
Check browser console for errors

#### B. Components not receiving props
Verify in React DevTools

**Quick Fix**:
```bash
# Clear cache and restart
cd client
rm -rf node_modules/.vite
npm run dev
```

---

### 10. Build Errors

**Symptom**: `npm run build` fails

**Common Fixes**:

#### A. Type errors
```bash
cd client
npm run build 2>&1 | grep error
```

#### B. Missing dependencies
```bash
npm install
```

#### C. Clear cache
```bash
rm -rf node_modules/.vite
rm -rf dist
npm run build
```

---

## Development Checklist

Before reporting issues, verify:

- [ ] Node.js v16+ installed: `node --version`
- [ ] Dependencies installed: `ls client/node_modules`
- [ ] Backend running: `curl http://localhost:5000/api/health`
- [ ] Database seeded: `curl http://localhost:5000/api/products`
- [ ] Frontend running: Browser at `http://localhost:5173`
- [ ] No console errors: Check browser DevTools
- [ ] Correct ports: 5000 (backend), 5173 (frontend)

---

## Quick Reset

If nothing works, try full reset:

```bash
# Stop all servers
# Ctrl+C in both terminals

# Clear everything
cd server
rm -rf node_modules package-lock.json
npm install

cd ../client
rm -rf node_modules package-lock.json .vite dist
npm install

# Restart
cd ../server
npm run seed
npm start

# New terminal
cd ../client
npm run dev
```

---

## Environment Setup Verification

Run the diagnostic script:
```bash
chmod +x test-setup.sh
./test-setup.sh
```

This will check:
- ✅ Node.js and npm versions
- ✅ MongoDB connection
- ✅ All dependencies installed
- ✅ Environment files configured
- ✅ Port availability
- ✅ API endpoint responding

---

## Still Having Issues?

1. **Check Browser Console**
   - F12 > Console tab
   - Look for red errors

2. **Check Server Logs**
   - Terminal where `npm start` is running
   - Look for error messages

3. **Check Network Tab**
   - F12 > Network tab
   - Refresh page
   - Look for failed requests (red)

4. **Verify File Structure**
   ```bash
   tree -L 2 -I node_modules
   ```

5. **Check Git Status**
   ```bash
   git status
   # Ensure no conflicts
   ```

---

## Browser-Specific Issues

### Chrome/Edge
- Works best, full support
- Enable DevTools > Experiments

### Firefox
- Good support
- May need to enable WebGL in about:config

### Safari
- Limited 3D support
- Some CSS features may differ

---

## Performance Issues

If app is slow:

1. **Disable 3D background temporarily**
   Comment out in `Hero.tsx`:
   ```tsx
   {/* <Canvas>...</Canvas> */}
   ```

2. **Reduce animation complexity**
   Lower stagger delays in components

3. **Check browser performance**
   DevTools > Performance > Record

4. **Clear browser cache**
   Ctrl+Shift+Delete

---

## Production Deployment Issues

See `DEPLOYMENT.md` for:
- Environment variables
- Build optimization
- Hosting configuration
- CDN setup

---

**Last Resort**: Delete everything and re-clone from Git
