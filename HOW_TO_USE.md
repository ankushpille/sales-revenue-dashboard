# 📊 How to Use Sales Analytics Dashboard

## Quick Start (3 Simple Steps)

### Step 1: Start the Servers

**Backend:**
```bash
cd backend
npm start
```
Wait for "✅ MongoDB Connected" message.

**Frontend (new terminal):**
```bash
npm start
```
Browser opens automatically at http://localhost:3000

### Step 2: Download Sample Data

1. Click **"📥 Download Sample Data"** button on welcome screen
2. OR download from the upload section
3. File will be saved as `sample-sales-data.csv`

### Step 3: Upload Data

1. **Drag and drop** the CSV file into the upload area
2. OR **click** the upload area to browse
3. Wait for "✅ Success!" message
4. Dashboard automatically refreshes with your data!

## Dashboard Features

### 📈 Charts You'll See

1. **Monthly Revenue Trend** - Line chart showing revenue over time
2. **Product-wise Sales** - Bar chart of sales by product
3. **Region-wise Distribution** - Pie chart of regional revenue

### 🔍 Filtering Data

Use the filters to analyze specific data:
- **Category** - Filter by product category
- **Region** - Filter by sales region  
- **Date Range** - Select start and end dates
- Click **"Apply Filters"** to update charts
- Click **"Clear All"** to reset

### 📊 Summary Cards

Top cards show:
- **Total Sales** - Total units sold
- **Total Revenue** - Total money earned

## File Format

Your CSV/Excel file should have these columns:

```csv
date,product,category,region,quantity,price,revenue
2024-01-01,Laptop,Electronics,East,5,50000,250000
```

**Required Columns:**
- `date` - Sale date (YYYY-MM-DD)
- `product` - Product name
- `category` - Product category
- `region` - Sales region
- `quantity` - Units sold
- `price` - Unit price
- `revenue` - Total revenue

## Tips for Best Experience

### ✅ DO:
- Use the sample data first to see how it works
- Upload CSV or Excel files (.csv, .xlsx, .xls)
- Keep files under 10MB
- Use proper date format (YYYY-MM-DD)
- Check that all required columns are present

### ❌ DON'T:
- Upload files larger than 10MB
- Use incorrect date formats
- Skip required columns
- Upload files with special characters in names

## Common Actions

### Upload New Data
1. Scroll to "Upload Sales Data" section
2. Drag & drop or click to select file
3. Wait for success message

### Filter Data
1. Scroll to "Advanced Filters" section
2. Select category, region, or date range
3. Click "Apply Filters"
4. Charts update automatically

### Reset View
1. Click "Clear All" in filters section
2. All data will be shown again

### Download Sample
1. Click "📥 Download Sample" button
2. File downloads to your computer
3. Edit with your own data
4. Upload back to dashboard

## Troubleshooting

### No Data Showing?
- Make sure backend is running (check terminal)
- Upload the sample data file
- Check browser console for errors (F12)

### Upload Failed?
- Check file format (CSV, XLSX, XLS only)
- Verify file size is under 10MB
- Ensure all required columns are present
- Check file has data rows (not just headers)

### Charts Not Updating?
- Click "Apply Filters" button
- Try "Clear All" and reapply filters
- Refresh the page (F5)

### Backend Not Connected?
- Check backend terminal for errors
- Verify MongoDB is connected
- Check `.env` file has correct MongoDB URI
- Restart backend server

## Need Help?

1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed help
2. Review [SETUP_GUIDE.md](SETUP_GUIDE.md) for installation issues
3. Check error messages in browser console (F12)
4. Verify backend terminal shows no errors

## Pro Tips 💡

1. **Start with sample data** - See how everything works first
2. **Edit sample data** - Modify it with your own information
3. **Use filters** - Analyze specific segments of your data
4. **Check date formats** - Use YYYY-MM-DD format
5. **Keep backups** - Save your original data files

## What Makes This Dashboard Great

✨ **Easy to Use** - Drag and drop files
📊 **Beautiful Charts** - Interactive visualizations
🔍 **Smart Filters** - Analyze your data easily
📱 **Responsive** - Works on all devices
⚡ **Fast** - Real-time updates
🎨 **Modern Design** - Professional look

## Getting Started Checklist

- [ ] Backend server running
- [ ] Frontend server running
- [ ] Downloaded sample data
- [ ] Uploaded sample data
- [ ] Explored all charts
- [ ] Tried filtering data
- [ ] Ready to use your own data!

---

**Enjoy analyzing your sales data!** 📊✨

For more detailed information, check out:
- [README.md](README.md) - Full documentation
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Installation guide
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Problem solving
