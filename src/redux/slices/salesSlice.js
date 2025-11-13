import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";
const API_URL = `${API_BASE}/api/sales`;

// ✅ Fetch sales list (for bar chart & pie chart)
export const fetchSales = createAsyncThunk(
  "sales/fetchSales",
  async (filters = {}) => {
    const res = await axios.get(`${API_URL}/filter`, {
      params: filters,
    });
    return res.data;
  }
);

// ✅ Fetch revenue trend for line chart
export const fetchTrend = createAsyncThunk(
  "sales/fetchTrend",
  async (type = "daily") => {
    const res = await axios.get(`${API_URL}/trend`, {
      params: { type },
    });
    return res.data;
  }
);

// ✅ Fetch totals (summary)
export const fetchTotals = createAsyncThunk(
  "sales/fetchTotals",
  async (filters = {}) => {
    const res = await axios.get(`${API_URL}/totals`, {
      params: filters,
    });
    return res.data;
  }
);

const salesSlice = createSlice({
  name: "sales",
  initialState: {
    data: [],      // from /filter
    trend: [],     // from /trend
    totals: {},    // from /totals
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder

      // ✅ fetchSales
      .addCase(fetchSales.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ✅ fetchTrend
      .addCase(fetchTrend.fulfilled, (state, action) => {
        state.trend = action.payload;
      })

      // ✅ fetchTotals
      .addCase(fetchTotals.fulfilled, (state, action) => {
        state.totals = action.payload;
      });
  },
});

export default salesSlice.reducer;
