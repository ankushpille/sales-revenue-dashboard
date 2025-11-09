const Sales = require("../models/Sales");
const csv = require("csv-parser");
const fs = require("fs");
const XLSX = require("xlsx");

// ================================
// ✅ 1. Upload CSV/Excel
// ================================
exports.uploadSalesData = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filepath = req.file.path;
    let jsonData = [];

    // Check file extension
    const ext = req.file.originalname.split(".").pop().toLowerCase();

    if (ext === "csv") {
      // ✅ Parse CSV
      fs.createReadStream(filepath)
        .pipe(csv())
        .on("data", (row) => {
          jsonData.push({
            date: row.date,
            product: row.product,
            category: row.category,
            region: row.region,
            quantity: Number(row.quantity),
            price: Number(row.price),
            revenue: Number(row.revenue),
          });
        })
        .on("end", async () => {
          await Sales.insertMany(jsonData);
          fs.unlinkSync(filepath);
          res.json({ message: "CSV inserted successfully", inserted: jsonData.length });
        });
    } else {
      // ✅ Parse Excel
      const workbook = XLSX.readFile(filepath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      jsonData = XLSX.utils.sheet_to_json(sheet);

      // Format data properly
      const formatted = jsonData.map((r) => ({
        date: r.date,
        product: r.product,
        category: r.category,
        region: r.region,
        quantity: Number(r.quantity),
        price: Number(r.price),
        revenue: Number(r.revenue),
      }));

      await Sales.insertMany(formatted);
      fs.unlinkSync(filepath);

      res.json({ message: "Excel inserted successfully", inserted: formatted.length });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Upload failed", error: err });
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
        },
      },
    ]);

    res.json(result[0] || { totalQuantity: 0, totalRevenue: 0 });
  } catch (err) {
    res.status(500).json({ message: "Error fetching totals" });
  }
};

// ================================
// ✅ 3. Filter Sales
// /api/sales/filter?product=Laptop&category=Electronics&region=East
// ================================
exports.filterSales = async (req, res) => {
  try {
    const { product, category, region } = req.query;

    const query = {};
    if (product) query.product = product;
    if (category) query.category = category;
    if (region) query.region = region;

    const data = await Sales.find(query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error filtering data" });
  }
};

// ================================
// ✅ 4. Sales Trend (Daily / Monthly)
// /api/sales/trend?type=daily OR monthly
// ================================
exports.getSalesTrend = async (req, res) => {
  try {
    const { type } = req.query;

    const groupBy =
      type === "monthly"
        ? { $substr: ["$date", 0, 7] } // YYYY-MM
        : "$date"; // Daily

    const result = await Sales.aggregate([
      {
        $group: {
          _id: groupBy,
          totalRevenue: { $sum: "$revenue" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // ✅ Convert into frontend-friendly format
    const formatted = result.map((item) => ({
      date: item._id,
      revenue: item.totalRevenue,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Error fetching trend" });
  }
};


exports.metadata = async (req, res) => {
  try {
    const categories = await Sales.distinct("category");
    const regions = await Sales.distinct("region");

    res.json({ categories, regions });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching metadata" });
  }
};
