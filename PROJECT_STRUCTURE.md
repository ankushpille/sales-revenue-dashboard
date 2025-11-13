# 📁 Project Structure

Complete overview of the Sales Analytics Dashboard file organization.

## 🌳 Directory Tree

```
sales-revenue-dashboard/
│
├── 📄 Configuration Files
│   ├── .env.example                    # Frontend environment template
│   ├── .gitignore                      # Git ignore rules
│   ├── package.json                    # Frontend dependencies
│   ├── package-lock.json              # Dependency lock file
│   └── start-dev.bat/sh               # Quick start scripts
│
├── 📚 Documentation
│   ├── README.md                       # Main project documentation
│   ├── SETUP_GUIDE.md                 # Detailed setup instructions
│   ├── QUICK_START.md                 # Quick start guide
│   ├── CHANGELOG.md                   # Version history
│   ├── REFACTORING_SUMMARY.md         # Refactoring details
│   └── PROJECT_STRUCTURE.md           # This file
│
├── 📊 Sample Data
│   └── sample-data.csv                # Example data file
│
├── 🎨 Frontend (src/)
│   │
│   ├── 📱 Components
│   │   ├── common/                    # Reusable components
│   │   │   ├── ChartCard.jsx         # Chart container wrapper
│   │   │   ├── EmptyState.jsx        # Empty state display
│   │   │   ├── ErrorBoundary.jsx     # Error handling wrapper
│   │   │   ├── LoadingSpinner.jsx    # Loading indicator
│   │   │   └── StatCard.jsx          # Statistics card
│   │   │
│   │   ├── FileUpload.jsx            # File upload with drag-drop
│   │   ├── Filters.jsx               # Advanced filtering
│   │   ├── ProductBarChart.jsx       # Product sales chart
│   │   ├── RegionPieChart.jsx        # Regional distribution
│   │   └── RevenueLineChart.jsx      # Revenue trend chart
│   │
│   ├── 📄 Pages
│   │   ├── Dashboard.jsx             # Main dashboard page
│   │   └── UploadPage.jsx            # Upload page (legacy)
│   │
│   ├── 🔄 Redux
│   │   ├── slices/
│   │   │   └── salesSlice.js         # Sales state management
│   │   └── store.js                  # Redux store configuration
│   │
│   ├── 🛠️ Utils
│   │   ├── constants.js              # App constants & config
│   │   ├── helpers.js                # Helper functions
│   │   └── chartHelpers.js           # Chart utilities
│   │
│   ├── 🎨 Styles
│   │   ├── App.css                   # App styles
│   │   └── index.css                 # Global styles & animations
│   │
│   ├── 📝 Entry Points
│   │   ├── App.js                    # Main App component
│   │   ├── index.js                  # React entry point
│   │   └── setupTests.js             # Test configuration
│   │
│   └── 📊 Assets
│       ├── logo.svg                  # App logo
│       └── reportWebVitals.js        # Performance monitoring
│
├── 🌐 Backend (backend/)
│   │
│   ├── 📋 Controllers
│   │   └── salesController.js        # Business logic
│   │       ├── uploadSalesData       # File upload handler
│   │       ├── getTotalSalesRevenue  # Totals aggregation
│   │       ├── filterSales           # Data filtering
│   │       ├── getSalesTrend         # Trend analysis
│   │       └── metadata              # Categories & regions
│   │
│   ├── 🗄️ Models
│   │   └── Sales.js                  # MongoDB schema
│   │       ├── date (String)         # Sale date
│   │       ├── product (String)      # Product name
│   │       ├── category (String)     # Product category
│   │       ├── region (String)       # Sales region
│   │       ├── quantity (Number)     # Units sold
│   │       ├── price (Number)        # Unit price
│   │       └── revenue (Number)      # Total revenue
│   │
│   ├── 🛣️ Routes
│   │   └── salesRoutes.js            # API endpoints
│   │       ├── POST /upload          # Upload CSV/Excel
│   │       ├── GET /totals           # Get totals
│   │       ├── GET /filter           # Filter data
│   │       ├── GET /trend            # Get trends
│   │       └── GET /meta             # Get metadata
│   │
│   ├── 📁 Uploads
│   │   └── .gitkeep                  # Temporary file storage
│   │
│   ├── ⚙️ Configuration
│   │   ├── .env.example              # Environment template
│   │   ├── .gitignore                # Backend git ignore
│   │   ├── package.json              # Backend dependencies
│   │   └── package-lock.json         # Dependency lock
│   │
│   └── 🚀 Entry Points
│       ├── app.js                    # Express app setup
│       └── server.js                 # Server entry point
│
└── 🌍 Public (public/)
    ├── index.html                    # HTML template
    ├── manifest.json                 # PWA manifest
    ├── robots.txt                    # SEO robots file
    ├── favicon.ico                   # App icon
    └── logo192.png, logo512.png      # PWA icons
```

## 📦 Key Directories Explained

### `/src/components/`
Reusable React components organized by feature:
- **common/** - Shared UI components used across the app
- **Charts** - Data visualization components
- **FileUpload** - File handling component
- **Filters** - Data filtering component

### `/src/utils/`
Utility functions and constants:
- **constants.js** - Configuration values, API endpoints, colors
- **helpers.js** - General utility functions (formatting, validation)
- **chartHelpers.js** - Chart-specific data transformations

### `/src/redux/`
State management:
- **store.js** - Redux store configuration
- **slices/** - Redux Toolkit slices for different features

### `/backend/controllers/`
Business logic layer:
- Handles API requests
- Processes data
- Interacts with database
- Returns responses

### `/backend/models/`
Data models:
- MongoDB schemas
- Data validation
- Database indexes

### `/backend/routes/`
API routing:
- Endpoint definitions
- Middleware configuration
- Request validation

## 🔗 Data Flow

```
User Action
    ↓
React Component
    ↓
Redux Action (if needed)
    ↓
API Call (Axios)
    ↓
Express Route
    ↓
Controller
    ↓
MongoDB Model
    ↓
Database
    ↓
Response
    ↓
Redux State Update
    ↓
Component Re-render
    ↓
UI Update
```

## 📊 Component Hierarchy

```
App
└── Dashboard
    ├── Header (Avatar, Title, Chips)
    ├── FileUpload Card
    │   └── FileUpload Component
    ├── Summary Cards
    │   ├── StatCard (Total Sales)
    │   └── StatCard (Total Revenue)
    ├── Filters Card
    │   └── Filters Component
    └── Chart Cards
        ├── ChartCard (Revenue Trend)
        │   └── RevenueLineChart
        ├── ChartCard (Product Sales)
        │   └── ProductBarChart
        └── ChartCard (Regional Distribution)
            └── RegionPieChart
```

## 🎯 File Naming Conventions

### Components
- **PascalCase** for component files: `StatCard.jsx`
- **camelCase** for utility files: `chartHelpers.js`
- **UPPERCASE** for constants: `CHART_COLORS`

### Backend
- **camelCase** for files: `salesController.js`
- **PascalCase** for models: `Sales.js`
- **camelCase** for routes: `salesRoutes.js`

## 📝 Code Organization Principles

1. **Separation of Concerns**
   - UI components separate from business logic
   - API calls in Redux actions
   - Utilities in dedicated files

2. **Reusability**
   - Common components in `/common/`
   - Shared utilities in `/utils/`
   - Consistent patterns

3. **Maintainability**
   - Clear file structure
   - Logical grouping
   - Comprehensive documentation

4. **Scalability**
   - Modular architecture
   - Easy to add new features
   - Clear extension points

## 🔍 Finding Things

### "Where do I find...?"

**API endpoints?**
→ `backend/routes/salesRoutes.js`

**Business logic?**
→ `backend/controllers/salesController.js`

**Database schema?**
→ `backend/models/Sales.js`

**Chart components?**
→ `src/components/ProductBarChart.jsx`, etc.

**Utility functions?**
→ `src/utils/helpers.js`

**Constants & config?**
→ `src/utils/constants.js`

**Redux state?**
→ `src/redux/slices/salesSlice.js`

**Styling?**
→ `src/index.css` (global), component files (local)

**Environment config?**
→ `.env` (frontend), `backend/.env` (backend)

## 🎨 Styling Architecture

```
Global Styles (index.css)
├── CSS Variables
├── Animations
├── Utility Classes
└── Base Styles

Component Styles (inline sx prop)
├── Material-UI theme
├── Responsive breakpoints
└── Component-specific styles
```

## 🔐 Environment Variables

### Frontend (`.env`)
```
REACT_APP_API_URL=http://localhost:5000
```

### Backend (`backend/.env`)
```
PORT=5000
MONGO_URI=mongodb://...
NODE_ENV=development
```

## 📚 Documentation Files

- **README.md** - Project overview, features, tech stack
- **SETUP_GUIDE.md** - Detailed installation and troubleshooting
- **QUICK_START.md** - Fast setup for experienced developers
- **CHANGELOG.md** - Version history and changes
- **REFACTORING_SUMMARY.md** - Detailed refactoring notes
- **PROJECT_STRUCTURE.md** - This file

## 🚀 Entry Points

### Development
- **Frontend:** `npm start` → `src/index.js`
- **Backend:** `npm start` → `backend/server.js`

### Production
- **Frontend:** `npm run build` → optimized build
- **Backend:** `node backend/server.js`

## 🧪 Testing Structure (Future)

```
tests/
├── unit/
│   ├── utils/
│   └── components/
├── integration/
│   └── api/
└── e2e/
    └── flows/
```

This structure provides a clear, organized, and scalable foundation for the Sales Analytics Dashboard.
