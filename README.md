# 📊 Sales Analytics Dashboard

A modern, full-stack sales analytics dashboard with real-time data visualization, interactive charts, and advanced filtering capabilities.

## ✨ Features

- 📈 **Real-time Analytics** - Monitor sales performance with live data
- 📊 **Interactive Charts** - Revenue trends, product sales, regional distribution
- 🔍 **Advanced Filtering** - Filter by category, region, and date range
- 📁 **File Upload** - Drag-and-drop Excel/CSV files
- 🎨 **Modern UI** - Clean, professional design
- 📱 **Responsive** - Works on all devices
- ⚡ **Fast** - Optimized performance

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. **Clone and install:**
```bash
git clone <repository-url>
cd sales-revenue-dashboard
npm install
cd backend && npm install && cd ..
```

2. **Configure environment:**

Create `.env` in root:
```env
REACT_APP_API_URL=http://localhost:5000
```

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

3. **Start servers:**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
npm start
```

4. **Upload data:**
- Open http://localhost:3000
- Download sample data from the dashboard
- Upload the Excel file
- View your analytics!

## 📁 File Format

Your Excel/CSV file should have these columns:

| Column | Type | Example |
|--------|------|---------|
| date | Text | 2024-01-01 |
| product | Text | Laptop |
| category | Text | Electronics |
| region | Text | East |
| quantity | Number | 5 |
| price | Number | 50000 |
| revenue | Number | 250000 |

**Supported formats:** .xlsx, .xls, .csv (max 10MB)

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Redux Toolkit
- Material-UI
- Recharts
- Framer Motion

**Backend:**
- Node.js
- Express
- MongoDB
- Multer

## 📊 API Endpoints

- `POST /api/sales/upload` - Upload file
- `GET /api/sales/totals` - Get totals
- `GET /api/sales/filter` - Filter data
- `GET /api/sales/trend` - Get trends
- `GET /api/sales/meta` - Get metadata

## 🔧 Troubleshooting

### Backend not connecting?
- Check MongoDB connection string in `backend/.env`
- Ensure MongoDB is running
- Verify port 5000 is available

### Upload failing?
- Check file format (Excel/CSV only)
- Verify file size under 10MB
- Ensure all required columns present

### Charts not showing?
- Upload data first
- Check browser console (F12)
- Verify backend is running

### Text not visible?
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)

## 📝 Usage

1. **Upload Data** - Drag and drop your Excel file
2. **View Summary** - See total sales and revenue
3. **Apply Filters** - Filter by category, region, dates
4. **Analyze Charts** - View trends and distributions
5. **Download Sample** - Get example data format

## 🎯 Features in Detail

### File Upload
- Drag-and-drop interface
- Real-time validation
- Progress indication
- Auto-scroll to results

### Charts
- **Revenue Trend** - Monthly revenue over time
- **Product Sales** - Sales by product
- **Regional Distribution** - Revenue by region

### Filters
- Category selection
- Region selection
- Date range picker
- Clear all option

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the build folder
```

### Backend (Heroku/Railway)
Set environment variables and deploy

## 📚 Project Structure

```
sales-revenue-dashboard/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
├── src/
│   ├── components/
│   │   ├── common/
│   │   └── [charts & filters]
│   ├── pages/
│   ├── redux/
│   ├── utils/
│   └── App.js
└── public/
    └── sample-data.xlsx
```

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License

## 🆘 Support

For issues or questions:
1. Check error messages
2. Review browser console
3. Verify environment variables
4. Check MongoDB connection

## ✅ Quick Checklist

- [ ] Node.js installed
- [ ] MongoDB accessible
- [ ] Dependencies installed
- [ ] Environment files configured
- [ ] Both servers running
- [ ] Sample data downloaded
- [ ] File uploaded successfully

---

**Built with ❤️ using React, Redux, Material-UI, Node.js, and MongoDB**
