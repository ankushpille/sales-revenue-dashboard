const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

const {
  uploadSalesData,
  getTotalSalesRevenue,
  filterSales,
  getSalesTrend
} = require('../controllers/salesController.js');

router.post('/upload', upload.single('file'), uploadSalesData);
router.get('/totals', getTotalSalesRevenue);
router.get('/filter', filterSales);
router.get('/trend', getSalesTrend);

module.exports = router;