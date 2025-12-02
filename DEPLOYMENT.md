# 🚀 BabyBliss PWA - Deployment Guide

## ⚠️ Important Note

This is a **DEMO/ASSESSMENT** project. The deployment steps below are for educational purposes. For production deployment, additional security, authentication, and payment integration would be required.

---

## 🎯 Deployment Options

### Option 1: Cloud Platform (Recommended)
- Frontend: Vercel / Netlify
- Backend: Render / Railway / Heroku
- Database: MongoDB Atlas

### Option 2: VPS (Traditional)
- Server: DigitalOcean / AWS EC2 / Linode
- Frontend & Backend: Same server
- Database: MongoDB on same server or Atlas

### Option 3: Containerized
- Docker containers
- Docker Compose
- Kubernetes (for scale)

---

## 🌐 Option 1: Cloud Deployment

### Step 1: Deploy Database (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   ```
   https://www.mongodb.com/cloud/atlas
   ```

2. **Create Cluster**
   - Free tier (M0) is sufficient for demo
   - Choose closest region

3. **Setup Database User**
   - Create username/password
   - Note credentials

4. **Whitelist IP Addresses**
   - Add: 0.0.0.0/0 (allow from anywhere)
   - For production: Restrict to your server IPs

5. **Get Connection String**
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/babybliss
   ```

6. **Seed Database**
   ```bash
   # Update server/.env with Atlas URI
   MONGODB_URI=mongodb+srv://...
   
   # Run seed script
   cd server
   npm run seed
   ```

---

### Step 2: Deploy Backend (Render.com)

1. **Prepare Backend**
   ```bash
   cd server
   # Ensure package.json has start script
   "scripts": {
     "start": "node server.js",
     "dev": "node --watch server.js"
   }
   ```

2. **Create Render Account**
   ```
   https://render.com
   ```

3. **Create New Web Service**
   - Connect GitHub repository
   - Select `server` directory
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node

4. **Add Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://...
   PORT=10000
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Note the URL: `https://babybliss-api.onrender.com`

---

### Step 3: Deploy Frontend (Vercel)

1. **Prepare Frontend**
   ```bash
   cd client
   
   # Update .env.production
   VITE_API_URL=https://babybliss-api.onrender.com/api
   ```

2. **Build Locally (Test)**
   ```bash
   npm run build
   npm run preview
   ```

3. **Create Vercel Account**
   ```
   https://vercel.com
   ```

4. **Deploy via Vercel CLI**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Login
   vercel login
   
   # Deploy
   cd client
   vercel
   
   # Follow prompts
   # Set root directory to: client
   ```

5. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. **Add Environment Variables**
   ```
   VITE_API_URL=https://babybliss-api.onrender.com/api
   ```

7. **Deploy to Production**
   ```bash
   vercel --prod
   ```

   Your app is now live at: `https://babybliss.vercel.app`

---

## 🖥️ Option 2: VPS Deployment (DigitalOcean)

### Step 1: Create Droplet

1. **Create Account**
   ```
   https://www.digitalocean.com
   ```

2. **Create Droplet**
   - Ubuntu 22.04 LTS
   - Basic plan ($6/month)
   - Choose datacenter region
   - Add SSH key

3. **Access Server**
   ```bash
   ssh root@your_server_ip
   ```

### Step 2: Setup Server

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
apt update
apt install -y mongodb-org

# Start MongoDB
systemctl start mongod
systemctl enable mongod

# Install Nginx
apt install -y nginx

# Install PM2 (process manager)
npm install -g pm2
```

### Step 3: Deploy Application

```bash
# Clone repository
cd /var/www
git clone https://github.com/yourusername/babybliss.git
cd babybliss

# Setup Backend
cd server
npm install
npm run seed
pm2 start server.js --name babybliss-api
pm2 save
pm2 startup

# Setup Frontend
cd ../client
npm install
npm run build
```

### Step 4: Configure Nginx

```bash
# Create Nginx config
nano /etc/nginx/sites-available/babybliss

# Add configuration:
server {
    listen 80;
    server_name your_domain.com;

    # Frontend
    location / {
        root /var/www/babybliss/client/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
ln -s /etc/nginx/sites-available/babybliss /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 5: Setup SSL (Let's Encrypt)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get certificate
certbot --nginx -d your_domain.com

# Auto-renewal
certbot renew --dry-run
```

---

## 🐳 Option 3: Docker Deployment

### Step 1: Create Dockerfiles

**Backend Dockerfile** (`server/Dockerfile`):
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

**Frontend Dockerfile** (`client/Dockerfile`):
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Step 2: Create Docker Compose

**docker-compose.yml**:
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    container_name: babybliss-db
    restart: always
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"

  backend:
    build: ./server
    container_name: babybliss-api
    restart: always
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/babybliss
      - PORT=5000
      - NODE_ENV=production
    ports:
      - "5000:5000"
    depends_on:
      - mongodb

  frontend:
    build: ./client
    container_name: babybliss-app
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongo-data:
```

### Step 3: Deploy with Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## ✅ Post-Deployment Checklist

### Testing
- [ ] Homepage loads correctly
- [ ] Products display from database
- [ ] Category filtering works
- [ ] Add to cart functionality
- [ ] Push notifications (if HTTPS)
- [ ] PWA installability
- [ ] Offline mode
- [ ] Service worker registration
- [ ] API endpoints responding
- [ ] Mobile responsiveness

### Performance
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Test loading speed
- [ ] Verify caching
- [ ] Check bundle sizes
- [ ] Test on slow 3G

### Security (Production Requirements)
- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] CORS configured properly
- [ ] Rate limiting added
- [ ] Input validation
- [ ] XSS protection
- [ ] CSRF protection

### Monitoring
- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics)
- [ ] Uptime monitoring
- [ ] Database backups
- [ ] Server logs

---

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://...
NODE_ENV=production
CORS_ORIGIN=https://your-domain.com
```

### Frontend (.env.production)
```env
VITE_API_URL=https://api.your-domain.com/api
```

---

## 📱 PWA Considerations

### HTTPS Required
PWAs require HTTPS for:
- Service Workers
- Push Notifications
- Installation

### Service Worker Scope
Ensure service worker is served from root:
```
https://your-domain.com/sw.js
```

### Manifest Updates
Update manifest.json:
```json
{
  "start_url": "https://your-domain.com/",
  "scope": "/"
}
```

---

## 🚨 Common Issues

### Issue: CORS Errors
**Solution**: Configure CORS in server.js
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
```

### Issue: Service Worker Not Registering
**Solution**: 
- Ensure HTTPS
- Check service worker path
- Clear cache

### Issue: API Not Responding
**Solution**:
- Check backend logs
- Verify environment variables
- Test database connection

### Issue: Build Fails
**Solution**:
- Clear node_modules
- Delete package-lock.json
- Reinstall dependencies

---

## 📊 Costs Estimate (Monthly)

### Free Tier (Demo)
- MongoDB Atlas: $0 (M0 cluster)
- Vercel: $0 (hobby plan)
- Render: $0 (free tier with sleep)
- **Total: $0/month**

### Paid Tier (Production)
- MongoDB Atlas: $9 (M10 cluster)
- Vercel: $20 (Pro plan)
- Render: $7 (Starter plan)
- **Total: ~$36/month**

### VPS Option
- DigitalOcean Droplet: $6-12/month
- Domain: $10-15/year
- **Total: ~$7-13/month**

---

## 🎯 Deployment Timeline

- MongoDB Atlas: 15 minutes
- Backend (Render): 10 minutes
- Frontend (Vercel): 10 minutes
- DNS Configuration: 24-48 hours
- SSL Certificate: 5 minutes
- Testing: 30 minutes

**Total: ~2-3 hours** (excluding DNS propagation)

---

## 📚 Resources

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)
- [Docker Docs](https://docs.docker.com/)
- [Nginx Docs](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/)

---

## ⚠️ Production Requirements Not Included

For real e-commerce deployment, you would need:

1. **Authentication System**
   - User registration/login
   - JWT tokens
   - Password hashing

2. **Payment Integration**
   - Stripe / Razorpay
   - PCI compliance
   - Secure checkout

3. **Email Service**
   - Order confirmations
   - Password reset
   - Notifications

4. **Admin Panel**
   - Product management
   - Order management
   - User management

5. **Advanced Features**
   - Product search (Algolia/Elasticsearch)
   - Image hosting (Cloudinary)
   - CDN (Cloudflare)
   - Database backup automation
   - Monitoring & alerts

---

**Remember**: This is a demo project. Real deployment requires additional security, scalability, and compliance measures!
