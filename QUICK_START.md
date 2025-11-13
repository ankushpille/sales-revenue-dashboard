# ⚡ Quick Start Guide

Get the Sales Analytics Dashboard running in 5 minutes!

## 🚀 Super Quick Start (Windows)

1. **Double-click** `start-dev.bat`
2. Edit the `.env` files that are created
3. Restart the servers

## 🚀 Super Quick Start (Mac/Linux)

```bash
chmod +x start-dev.sh
./start-dev.sh
```

Then edit the `.env` files and restart.

## 📋 Manual Setup (5 Steps)

### 1. Install Dependencies

```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

### 2. Configure Environment

**Create `.env` in root:**
```env
REACT_APP_API_URL=http://localhost:5000
```

**Create `backend/.env`:**
```env
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/salesdb
NODE_ENV=development
```

### 3. Start Backend

```bash
cd backend
npm start
```

### 4. Start Frontend (New Terminal)

```bash
npm start
```

### 5. Upload Sample Data

1. Open http://localhost:3000
2. Upload `sample-data.csv`
3. View your dashboard!

## 🔧 MongoDB Setup (2 Minutes)

### Option A: MongoDB Atlas (Cloud - Easiest)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create a cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Paste in `backend/.env` as `MONGO_URI`

### Option B: Local MongoDB

```bash
# Install MongoDB locally
# Then use:
MONGO_URI=mongodb://localhost:27017/salesdb
```

## ✅ Verify Installation

### Check Backend:
```
http://localhost:5000/health
```
Should return: `{"status":"OK","timestamp":"..."}`

### Check Frontend:
```
http://localhost:3000
```
Should show the dashboard

## 🎯 Test with Sample Data

1. Use the included `sample-data.csv` file
2. Drag and drop it into the upload area
3. Wait for success message
4. Charts will populate automatically

## 🐛 Common Issues

### "Port already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### "MongoDB connection failed"
- Check your connection string
- Ensure MongoDB is running
- Check network connectivity
- Verify database user permissions

### "Module not found"
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next Steps

- Read [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions
- Check [README.md](README.md) for features and documentation
- Review [CHANGELOG.md](CHANGELOG.md) for recent changes

## 💡 Pro Tips

1. **Use nodemon for backend development:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Keep both terminals open** to see logs

3. **Check browser console** for frontend errors

4. **Check terminal** for backend errors

5. **Use MongoDB Compass** to view your data visually

## 🆘 Need Help?

1. Check the error message carefully
2. Review [SETUP_GUIDE.md](SETUP_GUIDE.md) troubleshooting section
3. Verify all prerequisites are installed
4. Ensure environment variables are set correctly

## 🎉 You're Ready!

Once you see both servers running and can access the dashboard, you're all set! Upload some data and start exploring the analytics.

Happy analyzing! 📊
