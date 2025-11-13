const Sales = require("../models/Sales");
const csv = require("csv-parser");
const fs = require("fs");
const XLSX = require("xlsx");

// ================================
// ✅ 1. Upload CSV/Excel
// ================================
exports.uploadSalesData = async (req, res) => {
  let filepath = null;
  
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    filepath = req.file.path;
    const ext = req.file.originalname.split(".").pop().toLowerCase();
    let jsonData = [];

    if (ext === "csv") {
      // Parse CSV
      await new Promise((resolve, reject) => {
        fs.createReadStream(filepath)
          .pipe(csv())
          .on("data", (row) => {
            jsonData.push({
              date: row.date,
              product: row.product,
              category: row.category,
              region: row.region,
              quantity: Number(row.quantity) || 0,
              price: Number(row.price) || 0,
              revenue: Number(row.revenue) || 0,
            });
          })
          .on("end", resolve)
          .on("error", reject);
      });
    } else if (ext === "xlsx" || ext === "xls") {
      // Parse Excel
      const workbook = XLSX.readFile(filepath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rawData = XLSX.utils.sheet_to_json(sheet);

      jsonData = rawData.map((r) => ({
        date: r.date,
        product: r.product,
        category: r.category,
        region: r.region,
        quantity: Number(r.quantity) || 0,
        price: Number(r.price) || 0,
        revenue: Number(r.revenue) || 0,
      }));
    } else {
      if (filepath && fs.existsSync(filepath)) fs.unlinkSync(filepath);
      return res.status(400).json({ message: "Invalid file format. Only CSV, XLSX, and XLS are supported." });
    }

    // Validate data
    const validData = jsonData.filter(item => 
      item.date && item.product && item.category && item.region
    );

    if (validData.length === 0) {
      if (filepath && fs.existsSync(filepath)) fs.unlinkSync(filepath);
      return res.status(400).json({ message: "No valid data found in file" });
    }

    // Insert data
    await Sales.insertMany(validData);
    
    // Clean up file
    if (filepath && fs.existsSync(filepath)) fs.unlinkSync(filepath);

    res.json({ 
      message: "File uploaded successfully", 
      inserted: validData.length,
      skipped: jsonData.length - validData.length
    });
  } catch (err) {
    console.error("Upload error:", err);
    
    // Clean up file on error
    if (filepath && fs.existsSync(filepath)) {
      try {
        fs.unlinkSync(filepath);
      } catch (unlinkErr) {
        console.error("Error deleting file:", unlinkErr);
      }
    }
    
    res.status(500).json({ 
      message: "Upload failed", 
      error: err.message 
    });
  }
};

// ================================
// ✅ 2. Get Total Sales & Revenue
// /api/sales/totals?start=2024-01-01&end=2024-01-31
// ================================
exports.getTotalSalesRevenue = async (req, res) => {
  try {
    const { start, end } = req.query;

    const query = {};
    if (start && end) {
      query.date = { $gte: start, $lte: end };
    }

    const result = await Sales.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$quantity" },
          totalRevenue: { $sum: "$revenue" },
          totalRecords: { $sum: 1 }
        },
      },
    ]);

    res.json(result[0] || { totalQuantity: 0, totalRevenue: 0, totalRecords: 0 });
  } catch (err) {
    console.error("Error fetching totals:", err);
    res.status(500).json({ message: "Error fetching totals", error: err.message });
  }
};

// ================================
// ✅ 3. Filter Sales
// /api/sales/filter?product=Laptop&category=Electronics&region=East&start=2024-01-01&end=2024-12-31
// ================================
exports.filterSales = async (req, res) => {
  try {
    const { product, category, region, start, end } = req.query;

    const query = {};
    if (product) query.product = product;
    if (category) query.category = category;
    if (region) query.region = region;
    if (start && end) query.date = { $gte: start, $lte: end };

    const data = await Sales.find(query).limit(1000).sort({ date: -1 });
    res.json(data);
  } catch (err) {
    console.error("Error filtering data:", err);
    res.status(500).json({ message: "Error filtering data", error: err.message });
  }
};

// ================================
// ✅ 4. Sales Trend (Daily / Monthly)
// /api/sales/trend?type=daily OR monthly
// ================================
exports.getSalesTrend = async (req, res) => {
  try {
    const { type = "monthly" } = req.query;

    const groupBy =
      type === "monthly"
        ? { $substr: ["$date", 0, 7] } // YYYY-MM
        : "$date"; // Daily

    const result = await Sales.aggregate([
      {
        $group: {
          _id: groupBy,
          totalRevenue: { $sum: "$revenue" },
          totalQuantity: { $sum: "$quantity" }
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formatted = result.map((item) => ({
      date: item._id,
      revenue: item.totalRevenue,
      quantity: item.totalQuantity
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching trend:", err);
    res.status(500).json({ message: "Error fetching trend", error: err.message });
  }
};

// ================================
// ✅ 5. Get Metadata (Categories & Regions)
// ================================
exports.metadata = async (req, res) => {
  try {
    const [categories, regions, products] = await Promise.all([
      Sales.distinct("category"),
      Sales.distinct("region"),
      Sales.distinct("product")
    ]);

    res.json({ 
      categories: categories.sort(), 
      regions: regions.sort(),
      products: products.sort()
    });
  } catch (err) {
    console.error("Error fetching metadata:", err);
    res.status(500).json({ message: "Error fetching metadata", error: err.message });
  }
};
