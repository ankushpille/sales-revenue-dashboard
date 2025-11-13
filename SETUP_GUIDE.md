# 🚀 Setup Guide - Sales Analytics Dashboard

This guide will help you set up and run the Sales Analytics Dashboard on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** - Choose one:
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud - Recommended for beginners)
  - [MongoDB Community Edition](https://www.mongodb.com/try/download/community) (Local installation)
- **Git** - [Download](https://git-scm.com/)

## 🔧 Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd sales-revenue-dashboard
```

### 2. Frontend Setup

```bash
# Install frontend dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `.env` and configure:
```env
REACT_APP_API_URL=http://localhost:5000
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `backend/.env` and configure:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

#### Getting MongoDB Connection String

**For MongoDB Atlas (Cloud):**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `<database>` with your database name (e.g., `salesdb`)

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/salesdb?retryWrites=true&w=majority
```

**For Local MongoDB:**
```
mongodb://localhost:27017/salesdb
```

### 4. Create Uploads Directory

```bash
# Make sure you're in the backend directory
mkdir -p uploads
```

## ▶️ Running the Application

### Option 1: Run Both Servers Separately (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Or for auto-restart on changes:
npm run dev
```

You should see:
```
✅ MongoDB Connected
✅ Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
# From project root
npm start
```

The browser will automatically open at `http://localhost:3000`

### Option 2: Quick Start Script

Create a file `start.sh` (Mac/Linux) or `start.bat` (Windows):

**start.sh:**
```bash
#!/bin/bash
cd backend && npm start &
npm start
```

**start.bat:**
```batch
start cmd /k "cd backend && npm start"
start cmd /k "npm start"
```

## 🧪 Testing the Application

### 1. Verify Backend is Running

Open your browser and go to:
```
http://localhost:5000/health
```

You should see:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Test File Upload

1. Open the dashboard at `http://localhost:3000`
2. Prepare a sample CSV file with this format:

```csv
date,product,category,region,quantity,price,revenue
2024-01-01,Laptop,Electronics,East,5,50000,250000
2024-01-02,Phone,Electronics,West,10,30000,300000
2024-01-03,Tablet,Electronics,North,8,25000,200000
```

3. Drag and drop the file or click to upload
4. Wait for success message
5. Charts should populate with data

## 🐛 Troubleshooting

### Backend Issues

**Problem: "MongoDB Connection Error"**
- Check your MongoDB connection string in `backend/.env`
- Ensure MongoDB service is running (if local)
- Check network connectivity (if using Atlas)
- Verify database user has correct permissions

**Problem: "Port 5000 already in use"**
```bash
# Find and kill the process using port 5000
# Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

Or change the port in `backend/.env`:
```env
PORT=5001
```
And update frontend `.env`:
```env
REACT_APP_API_URL=http://localhost:5001
```

**Problem: "Cannot find module"**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Frontend Issues

**Problem: "Module not found" errors**
```bash
# From project root
rm -rf node_modules package-lock.json
npm install
```

**Problem: "Failed to fetch" when uploading files**
- Ensure backend is running on port 5000
- Check CORS settings in `backend/app.js`
- Verify `REACT_APP_API_URL` in `.env`

**Problem: Charts not displaying**
- Check browser console for errors
- Verify data is being fetched (Network tab)
- Ensure MongoDB has data

### File Upload Issues

**Problem: "No file uploaded" error**
- Check file format (CSV, XLSX, XLS only)
- Verify file size is under 10MB
- Ensure `uploads` directory exists in backend

**Problem: "Invalid file format"**
- Verify CSV has correct headers: `date,product,category,region,quantity,price,revenue`
- Check for special characters or encoding issues
- Try saving as UTF-8 encoded CSV

## 📊 Sample Data

Create a file `sample-data.csv`:

```csv
date,product,category,region,quantity,price,revenue
2024-01-01,Laptop,Electronics,East,5,50000,250000
2024-01-02,Phone,Electronics,West,10,30000,300000
2024-01-03,Tablet,Electronics,North,8,25000,200000
2024-01-04,Monitor,Electronics,South,12,15000,180000
2024-01-05,Keyboard,Accessories,East,20,2000,40000
2024-01-06,Mouse,Accessories,West,25,1000,25000
2024-01-07,Headphones,Accessories,North,15,3000,45000
2024-01-08,Webcam,Electronics,South,10,5000,50000
2024-01-09,Speaker,Electronics,East,8,8000,64000
2024-01-10,Charger,Accessories,West,30,500,15000
```

## 🔐 Security Notes

- Never commit `.env` files to version control
- Use environment variables for sensitive data
- Change default MongoDB credentials
- Enable MongoDB authentication in production
- Use HTTPS in production
- Implement rate limiting for API endpoints

## 🚀 Production Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting service

3. Set environment variable:
```
REACT_APP_API_URL=https://your-backend-url.com
```

### Backend (Heroku/Railway)

1. Create a new app on your hosting platform

2. Set environment variables:
```
PORT=5000
MONGO_URI=your_production_mongodb_uri
NODE_ENV=production
```

3. Deploy using Git or CLI

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Material-UI](https://mui.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)

## 💡 Tips

- Use `npm run dev` in backend for auto-restart during development
- Install MongoDB Compass for easy database management
- Use Redux DevTools extension for debugging
- Check browser console for frontend errors
- Check terminal logs for backend errors

## 🆘 Getting Help

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review error messages carefully
3. Check browser console and terminal logs
4. Verify all dependencies are installed
5. Ensure environment variables are set correctly

## ✅ Verification Checklist

Before running the application, ensure:

- [ ] Node.js is installed (`node --version`)
- [ ] MongoDB is accessible
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] Environment files created and configured
- [ ] Uploads directory exists in backend
- [ ] Port 3000 and 5000 are available

Happy coding! 🎉
