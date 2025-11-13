# 📊 File Format Guide

## Supported File Types

✅ **Excel Files** (.xlsx, .xls)
✅ **CSV Files** (.csv)

Maximum file size: **10MB**

## Your File: `sales_reference_dataset 1.xlsx`

This is the perfect format! Your Excel file should have these columns:

### Required Columns

| Column | Type | Example | Description |
|--------|------|---------|-------------|
| **date** | Text/Date | 2024-01-01 | Sale date (YYYY-MM-DD format) |
| **product** | Text | Laptop | Product name |
| **category** | Text | Electronics | Product category |
| **region** | Text | East | Sales region |
| **quantity** | Number | 5 | Units sold |
| **price** | Number | 50000 | Unit price |
| **revenue** | Number | 250000 | Total revenue (quantity × price) |

## Example Data

```
date        | product  | category    | region | quantity | price  | revenue
------------|----------|-------------|--------|----------|--------|----------
2024-01-01  | Laptop   | Electronics | East   | 5        | 50000  | 250000
2024-01-02  | Phone    | Electronics | West   | 10       | 30000  | 300000
2024-01-03  | Tablet   | Electronics | North  | 8        | 25000  | 200000
```

## How to Upload

### Method 1: Drag & Drop
1. Open the dashboard
2. Drag your Excel file into the upload area
3. Drop it
4. Wait for success message

### Method 2: Click to Browse
1. Click the upload area
2. Select your Excel file
3. Click "Open"
4. Click "Upload File" button

## File Validation

The system will check:
- ✅ File type (Excel or CSV)
- ✅ File size (under 10MB)
- ✅ Required columns present
- ✅ Data format correct

## Common Issues

### ❌ "Invalid file type"
**Solution:** Make sure file ends with .xlsx, .xls, or .csv

### ❌ "File too large"
**Solution:** File must be under 10MB. Split into smaller files if needed.

### ❌ "No valid data found"
**Solution:** Check that:
- All required columns are present
- Column names match exactly (lowercase)
- At least one data row exists

### ❌ "Upload failed"
**Solution:**
- Check backend is running
- Verify MongoDB is connected
- Check file has no special characters in name
- Try renaming file to remove spaces

## Tips for Best Results

### ✅ DO:
- Use the exact column names listed above
- Keep dates in YYYY-MM-DD format
- Use numbers for quantity, price, revenue
- Remove any empty rows
- Save Excel file before uploading

### ❌ DON'T:
- Change column names
- Use different date formats
- Include special characters in data
- Have merged cells
- Include formulas (convert to values)

## Your File is Ready!

Your file `sales_reference_dataset 1.xlsx` should work perfectly if it has:
1. All 7 required columns
2. Proper date format
3. Numeric values for quantity, price, revenue
4. No empty rows in the middle of data

## Quick Upload Steps

1. **Start Backend**
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend**
   ```bash
   npm start
   ```

3. **Upload File**
   - Drag `sales_reference_dataset 1.xlsx` to upload area
   - OR click and browse to select it
   - Click "Upload File"
   - Wait for "✅ Success!" message

4. **View Dashboard**
   - Charts will automatically populate
   - See your data visualized!

## Need Help?

- Check [HOW_TO_USE.md](HOW_TO_USE.md) for usage guide
- Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for problems
- Verify backend terminal shows no errors
- Check browser console (F12) for errors

---

**Your Excel file format is perfect! Just upload and enjoy the analytics!** 📊✨
