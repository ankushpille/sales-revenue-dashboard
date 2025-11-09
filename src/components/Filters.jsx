import { useEffect, useState } from "react";
import { Box, TextField, MenuItem, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchSales } from "../redux/slices/salesSlice";
import axios from "axios";

export default function Filters() {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);

  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ✅ Load category + region meta data
  useEffect(() => {
    const loadMetaData = async () => {
      const res = await axios.get("http://localhost:5000/api/sales/meta");
      setCategories(res.data.categories);
      setRegions(res.data.regions);
    };
    loadMetaData();
  }, []);

  // ✅ send filters to backend API
  const applyFilters = () => {
    const filters = {};

    if (category) filters.category = category;
    if (region) filters.region = region;
    if (startDate) filters.start = startDate;
    if (endDate) filters.end = endDate;

    dispatch(fetchSales(filters));
  };

  return (
    <Box display="flex" gap={2} mb={3} flexWrap="wrap">

      {/* ✅ Category Dropdown */}
      <TextField
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="">All</MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>

      {/* ✅ Region Dropdown */}
      <TextField
        select
        label="Region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="">All</MenuItem>
        {regions.map((reg) => (
          <MenuItem key={reg} value={reg}>
            {reg}
          </MenuItem>
        ))}
      </TextField>

      {/* ✅ Start Date */}
      <TextField
        type="date"
        label="Start Date"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      {/* ✅ End Date */}
      <TextField
        type="date"
        label="End Date"
        InputLabelProps={{ shrink: true }}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <Button variant="contained" onClick={applyFilters}>
        Apply
      </Button>
    </Box>
  );
}
