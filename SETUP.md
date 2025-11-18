# 🚀 Complete Setup Guide for SocialVibe

This guide will walk you through setting up SocialVibe from scratch.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/downloads)
- **Cloudinary Account** (free) - [Sign up](https://cloudinary.com/)
- **Redis** (optional, for production) - [Download](https://redis.io/download)

---

## Step 1: Get Cloudinary Credentials

1. Go to [Cloudinary](https://cloudinary.com/) and sign up
2. After login, go to your Dashboard
3. You'll see:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
4. Keep these handy for the next steps

---

## Step 2: MongoDB Setup

### Option A: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   # MongoDB runs as a service automatically after installation
   ```
3. Your connection string will be: `mongodb://localhost:27017/socialvibe`

### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (or use 0.0.0.0/0 for development)
5. Get your connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/socialvibe
   ```

---

## Step 3: Clone and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/socialvibe.git
cd socialvibe
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Create Backend .env File

Create a file named `.env` in the `backend` directory:

```bash
# In backend directory
touch .env
```

Add the following content (replace with your actual values):

```env
# Server
PORT=5000
NODE_ENV=development

# Database - Choose one:
# Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/socialvibe
# OR MongoDB Atlas:
# MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/socialvibe

# JWT Secrets - Generate random strings for production
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this_too
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Cloudinary - Get from your Cloudinary dashboard
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# Redis (Optional - leave empty for development)
REDIS_URL=
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# CORS
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

### 5. Create Frontend .env File

Create a file named `.env` in the `frontend` directory:

```bash
# In frontend directory
touch .env
```

Add the following:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## Step 4: Run the Application

### Terminal 1 - Start Backend

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected
✅ Server running on port 5000
✅ Socket.IO server started
```

### Terminal 2 - Start Frontend

```bash
cd frontend
npm run dev
```

You should see:
```
  VITE ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

---

## Step 5: Access the Application

1. Open your browser and go to: **http://localhost:5173**
2. You should see the SocialVibe login page
3. Click "Register" to create a new account
4. Complete your profile setup
5. Start using the app!

---

## 🔧 Troubleshooting

### Backend won't start

**Problem**: MongoDB connection error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**:
- Make sure MongoDB is running
- Check your MONGODB_URI in .env
- For local MongoDB: `brew services start mongodb-community` (macOS)

---

**Problem**: Cloudinary error
```
Error: Must supply cloud_name
```

**Solution**:
- Check your Cloudinary credentials in .env
- Make sure there are no extra spaces
- Verify the credentials on Cloudinary dashboard

---

**Problem**: Port 5000 already in use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution**:
```bash
# Find and kill the process using port 5000
# macOS/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

### Frontend won't start

**Problem**: Module not found errors

**Solution**:
```bash
cd frontend
rm -rf node_modules
npm install
```

---

**Problem**: API calls failing

**Solution**:
- Make sure backend is running
- Check VITE_API_URL in frontend/.env
- Check browser console for CORS errors
- Verify CORS_ORIGIN in backend/.env matches frontend URL

---

## 📝 Quick Tips

### Generate Secure JWT Secrets

```bash
# Generate random strings for JWT secrets
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Check if Services are Running

```bash
# Check if MongoDB is running
mongosh

# Check if backend is running
curl http://localhost:5000/health

# Check if Redis is running (optional)
redis-cli ping
```

---

## 🎉 Success!

If everything is working:
- ✅ Backend running on port 5000
- ✅ Frontend running on port 5173
- ✅ MongoDB connected
- ✅ Can register and login
- ✅ Can create posts, reels, stories
- ✅ Real-time messaging works

---

## 📚 Next Steps

- Read the [README.md](README.md) for feature list
- Check [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute
- Explore the codebase and start customizing!

---

## 🆘 Still Having Issues?

- Check the [Issues](https://github.com/YOUR_USERNAME/socialvibe/issues) page
- Create a new issue with details about your problem
- Include error messages and your environment details

---

**Happy Coding! 🚀**

