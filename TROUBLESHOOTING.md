# 🔧 Troubleshooting Guide

## UI Not Showing Data

If you see the dashboard but no data is displayed, follow these steps:

### 1. Check Backend Connection

**Verify backend is running:**
```bash
# Open http://localhost:5000/health in your browser
# Should return: {"status":"OK","timestamp":"..."}
```

**If backend is not running:**
```bash
cd backend
npm start
```

### 2. Check MongoDB Connection

**Verify MongoDB is connected:**
- Check backend terminal for "✅ MongoDB Connected" message
- If you see "❌ MongoDB Connection Error", check your connection string in `backend/.env`

**Common MongoDB issues:**
- Wrong connection string
- Network connectivity issues
- Database user permissions
- MongoDB service not running (if local)

### 3. Upload Sample Data

**The dashboard needs data to display charts:**

1. Use the included `sample-data.csv` file
2. Click the upload area or drag and drop the file
3. Wait for "✅ Success!" message
4. Dashboard will automatically refresh with data

**If upload fails:**
- Check file format (CSV, XLSX, XLS only)
- Verify file size is under 10MB
- Check backend terminal for error messages
- Ensure `backend/uploads/` directory exists

### 4. Check Browser Console

**Open Developer Tools (F12) and check for errors:**

**Common errors:**
- `Failed to fetch` - Backend not running or wrong URL
- `Network Error` - CORS issue or backend unreachable
- `404 Not Found` - Wrong API endpoint

**Fix:**
- Verify `REACT_APP_API_URL` in `.env` is correct
- Ensure backend is running on port 5000
- Check CORS settings in `backend/app.js`

### 5. Clear Browser Cache

Sometimes cached data can cause issues:

1. Open Developer Tools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### 6. Check Environment Variables

**Frontend `.env`:**
```env
REACT_APP_API_URL=http://localhost:5000
```

**Backend `backend/.env`:**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

**After changing .env files:**
- Stop both servers (Ctrl+C)
- Restart both servers

### 7. Verify API Endpoints

**Test each endpoint manually:**

```bash
# Get totals
curl http://localhost:5000/api/sales/totals

# Get metadata
curl http://localhost:5000/api/sales/meta

# Get filtered data
curl http://localhost:5000/api/sales/filter

# Get trend data
curl http://localhost:5000/api/sales/trend?type=monthly
```

**Expected responses:**
- Should return JSON data
- If empty arrays, database has no data
- If error, check backend logs

### 8. Check Database

**Using MongoDB Compass:**
1. Connect to your MongoDB
2. Find the `sales` collection
3. Verify it has documents

**Using MongoDB Shell:**
```bash
mongo
use salesdb
db.sales.count()
db.sales.find().limit(5)
```

### 9. Reinstall Dependencies

**If nothing else works:**

```bash
# Frontend
rm -rf node_modules package-lock.json
npm install

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
cd ..
```

### 10. Check Ports

**Ensure ports are not in use:**

```bash
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Mac/Linux
lsof -ti:3000
lsof -ti:5000
```

**If ports are in use, kill the processes or change ports**

## Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"

**Solution:**
1. Check MongoDB Atlas cluster is running
2. Verify IP whitelist includes your IP (0.0.0.0/0 for development)
3. Check database user credentials
4. Test connection string in MongoDB Compass

### Issue: "CORS Error"

**Solution:**
1. Verify backend CORS is enabled in `backend/app.js`
2. Check `REACT_APP_API_URL` matches backend URL
3. Restart backend server

### Issue: "File upload fails"

**Solution:**
1. Check file format matches requirements
2. Verify `backend/uploads/` directory exists
3. Check file size is under 10MB
4. Review backend logs for specific error

### Issue: "Charts not rendering"

**Solution:**
1. Upload data first (dashboard shows welcome screen if no data)
2. Check browser console for errors
3. Verify data is being fetched (Network tab)
4. Clear browser cache

### Issue: "Filters not working"

**Solution:**
1. Ensure data exists in database
2. Check backend `/api/sales/filter` endpoint
3. Verify metadata endpoint returns categories/regions
4. Check browser console for errors

## Still Having Issues?

### Debug Checklist:

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] MongoDB connected successfully
- [ ] Environment variables set correctly
- [ ] Sample data uploaded
- [ ] No errors in browser console
- [ ] No errors in backend terminal
- [ ] Ports not blocked by firewall
- [ ] Dependencies installed correctly

### Get More Help:

1. Check all error messages carefully
2. Review backend terminal logs
3. Check browser console (F12)
4. Verify all prerequisites installed
5. Try the sample data file first
6. Test API endpoints manually

### Quick Reset:

```bash
# Stop all servers
# Delete node_modules in both frontend and backend
# Delete .env files
# Start fresh with setup guide

# Frontend
rm -rf node_modules package-lock.json
npm install
cp .env.example .env
# Edit .env

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
cp .env.example .env
# Edit .env
cd ..

# Start servers
cd backend && npm start &
npm start
```

## Success Indicators

✅ Backend shows: "✅ MongoDB Connected" and "✅ Server running on port 5000"
✅ Frontend opens at http://localhost:3000
✅ Welcome screen appears (if no data) or dashboard with charts (if data exists)
✅ File upload works and shows success message
✅ Charts populate after uploading data
✅ Filters work and update charts
✅ No errors in browser console or terminal

If all indicators are green, your dashboard is working perfectly! 🎉
