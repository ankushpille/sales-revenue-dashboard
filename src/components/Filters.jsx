import { Box, Button, Chip, MenuItem, TextField, } from "@mui/material";
import { useEffect, useState } from "react";

import axios from "axios";
import { fetchSales } from "../redux/slices/salesSlice";
import { useDispatch } from "react-redux";

const StyledTextField = ({ label, children, ...props }) => (
  <TextField
    {...props}
    label={label}
    variant="outlined"
    size="small"
    sx={{
      minWidth: 180,
      '& .MuiOutlinedInput-root': {
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        '& fieldset': {
          borderColor: 'rgba(255, 255, 255, 0.3)',
        },
        '&:hover fieldset': {
          borderColor: 'rgba(255, 255, 255, 0.5)',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#667eea',
          borderWidth: '2px',
        },
        '& .MuiInputLabel-root': {
          color: 'rgba(255, 255, 255, 0.8)',
          '&.Mui-focused': {
            color: '#667eea',
          },
        },
        '& .MuiInputBase-input': {
          color: '#2c3e50',
          fontWeight: 500,
        },
        transition: 'all 0.3s ease',
      },
    }}
  >
    {children}
  </TextField>
);

export default function Filters() {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);

  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Load category + region meta data
  useEffect(() => {
    const loadMetaData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/sales/meta");
        setCategories(res.data.categories || []);
        setRegions(res.data.regions || []);
      } catch (error) {
        console.error("Error loading metadata:", error);
      }
    };
    loadMetaData();
  }, []);

  // Send filters to backend API
  const applyFilters = () => {
    const filters = {};

    if (category) filters.category = category;
    if (region) filters.region = region;
    if (startDate) filters.start = startDate;
    if (endDate) filters.end = endDate;

    dispatch(fetchSales(filters));
  };

  const clearFilters = () => {
    setCategory("");
    setRegion("");
    setStartDate("");
    setEndDate("");
    dispatch(fetchSales({}));
  };

  const hasActiveFilters = category || region || startDate || endDate;

  return (
    <Box>
      {/* Filter Icons */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 3,
          flexWrap: "wrap",
          alignItems: "center"
        }}
      >
        <Chip
          icon={<span>📂</span>}
          label={`${categories.length} Categories`}
          size="small"
          sx={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontWeight: 500,
          }}
        />
        <Chip
          icon={<span>🌍</span>}
          label={`${regions.length} Regions`}
          size="small"
          sx={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontWeight: 500,
          }}
        />
        {hasActiveFilters && (
          <Chip
            label="Filters Active"
            size="small"
            color="secondary"
            variant="filled"
            sx={{
              background: 'rgba(255, 255, 255, 0.3)',
              color: 'white',
              fontWeight: 600,
            }}
          />
        )}
      </Box>

      <Box
        display="flex"
        gap={2}
        mb={3}
        flexWrap="wrap"
        sx={{
          '& > *': {
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
            }
          }
        }}
      >
        {/* Enhanced Category Dropdown */}
        <StyledTextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>📋</span>
              All Categories
            </Box>
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>📁</span>
                {cat}
              </Box>
            </MenuItem>
          ))}
        </StyledTextField>

        {/* Enhanced Region Dropdown */}
        <StyledTextField
          select
          label="Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <MenuItem value="">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>🌍</span>
              All Regions
            </Box>
          </MenuItem>
          {regions.map((reg) => (
            <MenuItem key={reg} value={reg}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>📍</span>
                {reg}
              </Box>
            </MenuItem>
          ))}
        </StyledTextField>

        {/* Enhanced Start Date */}
        <StyledTextField
          type="date"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        {/* Enhanced End Date */}
        <StyledTextField
          type="date"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Box>

      {/* Enhanced Action Buttons */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          onClick={applyFilters}
          sx={{
            background: "var(--primary-gradient)",
            borderRadius: "12px",
            padding: "10px 24px",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)",
            },
          }}
          startIcon={<span>🔍</span>}
        >
          Apply Filters
        </Button>
        
        {hasActiveFilters && (
          <Button
            variant="outlined"
            onClick={clearFilters}
            sx={{
              color: "white",
              borderColor: "rgba(255, 255, 255, 0.5)",
              borderRadius: "12px",
              padding: "10px 24px",
              fontWeight: 600,
              textTransform: "none",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.2)",
                transform: "translateY(-2px)",
                borderColor: "rgba(255, 255, 255, 0.7)",
              },
            }}
            startIcon={<span>🔄</span>}
          >
            Clear All
          </Button>
        )}
      </Box>
    </Box>
  );
}
