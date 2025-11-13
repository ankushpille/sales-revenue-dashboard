# 📊 Sales Analytics Dashboard

A modern, full-stack sales analytics dashboard built with React, Redux, Material-UI, and Node.js. Features real-time data visualization, interactive charts, and advanced filtering capabilities.

## ✨ Features

- 📈 **Real-time Analytics** - Monitor sales performance with live data updates
- 📊 **Interactive Charts** - Beautiful visualizations using Recharts
  - Revenue trend line charts
  - Product-wise bar charts
  - Region-wise pie charts
- 🔍 **Advanced Filtering** - Filter by category, region, and date range
- 📁 **File Upload** - Support for CSV and Excel files with drag-and-drop
- 🎨 **Modern UI** - Glassmorphism design with smooth animations
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Performance Optimized** - Fast loading and smooth interactions

## 🛠️ Tech Stack

### Frontend
- React 19
- Redux Toolkit
- Material-UI (MUI)
- Recharts
- Framer Motion
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- Multer (file uploads)
- XLSX & CSV Parser

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd sales-revenue-dashboard
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
```

4. **Configure environment variables**

Create `.env` in the root directory:
```env
REACT_APP_API_URL=http://localhost:5000
```

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

### Running the Application

1. **Start the backend server**
```bash
cd backend
node server.js
```
Backend will run on http://localhost:5000

2. **Start the frontend (in a new terminal)**
```bash
npm start
```
Frontend will run on http://localhost:3000

## 📁 Project Structure

```
sales-revenue-dashboard/
├── backend/
│   ├── controllers/      # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── uploads/         # Temporary file storage
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
├── src/
│   ├── components/      # React components
│   │   ├── common/      # Reusable components
│   │   ├── FileUpload.jsx
│   │   ├── Filters.jsx
│   │   └── Charts/
│   ├── pages/           # Page components
│   ├── redux/           # Redux store & slices
│   ├── utils/           # Helper functions
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── chartHelpers.js
│   ├── App.js
│   └── index.js
└── public/
```

## 🎯 API Endpoints

### Sales Endpoints
- `POST /api/sales/upload` - Upload CSV/Excel file
- `GET /api/sales/totals` - Get total sales and revenue
- `GET /api/sales/filter` - Filter sales data
- `GET /api/sales/trend` - Get revenue trends (daily/monthly)
- `GET /api/sales/meta` - Get categories and regions

### Health Check
- `GET /health` - Server health status

## 📊 Data Format

### CSV/Excel File Format
```csv
date,product,category,region,quantity,price,revenue
2024-01-01,Laptop,Electronics,East,5,50000,250000
2024-01-02,Phone,Electronics,West,10,30000,300000
```

## 🎨 Key Features Explained

### File Upload
- Drag-and-drop support
- File validation (CSV, XLSX, XLS)
- Size limit: 10MB
- Real-time upload progress
- Automatic dashboard refresh

### Filtering
- Filter by category
- Filter by region
- Date range selection
- Real-time data updates
- Clear all filters option

### Charts
- **Revenue Line Chart**: Monthly revenue trends
- **Product Bar Chart**: Sales by product with scrollable view
- **Region Pie Chart**: Revenue distribution by region

## 🔧 Configuration

### Frontend Configuration
Edit `src/utils/constants.js` to customize:
- API endpoints
- Chart colors
- File upload limits
- Date formats

### Backend Configuration
Edit `backend/app.js` and `backend/server.js` for:
- CORS settings
- Port configuration
- Database connection
- File upload settings

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
```
Deploy the `build` folder to your hosting service (Vercel, Netlify, etc.)

### Backend Deployment
1. Set environment variables on your hosting platform
2. Ensure MongoDB is accessible
3. Deploy to Heroku, Railway, or similar services

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Material-UI for the component library
- Recharts for beautiful charts
- MongoDB for the database
- Create React App for the boilerplate
