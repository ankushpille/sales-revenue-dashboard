const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = './uploads/';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.csv', '.xlsx', '.xls'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only CSV, XLSX, and XLS files are allowed.'));
  }
};

// Configure multer
const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Import controllers
const {
  uploadSalesData,
  getTotalSalesRevenue,
  filterSales,
  getSalesTrend,
  metadata
} = require('../controllers/salesController.js');

// Routes
router.post('/upload', upload.single('file'), uploadSalesData);
router.get('/totals', getTotalSalesRevenue);
router.get('/filter', filterSales);
router.get('/trend', getSalesTrend);
router.get('/meta', metadata);

module.exports = router;