import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales, fetchTrend, fetchTotals } from "../redux/slices/salesSlice";
import { Box, Card, CircularProgress, Typography } from "@mui/material";
import ProductBarChart from "../components/ProductBarChart";
import RevenueLineChart from "../components/RevenueLineChart";
import RegionPieChart from "../components/RegionPieChart";
import Filters from "../components/Filters";
import FileUpload from "../components/FileUpload";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { data, trend, totals, loading } = useSelector((state) => state.sales);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchTrend("monthly"));
    dispatch(fetchTotals());
  }, [refresh]);

  if (loading)
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box p={3}>
      
      {/* ✅ Upload Section */}
      <Card sx={{ p: 2, mb: 3 }}>
        <FileUpload onUpload={() => setRefresh(!refresh)} />
      </Card>

      {/* ✅ Summary Totals */}
      <Card sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Summary</Typography>
        <Typography>Total Sales: {totals.totalSales}</Typography>
        <Typography>Total Revenue: ₹{totals.totalRevenue}</Typography>
      </Card>

      {/* ✅ Filters */}
      <Filters onFilterChange={(filters) => dispatch(fetchSales(filters))} />

      {/* ✅ Line Chart (Revenue Trend) */}
      <Card sx={{ p: 2, mb: 3 }}>
        <RevenueLineChart data={trend} />
      </Card>

      {/* ✅ Product-wise Sales (Bar Chart) */}
      <Card sx={{ p: 2, mb: 3 }}>
        <ProductBarChart data={data} />
      </Card>

      {/* ✅ Region-wise Revenue (Pie Chart) */}
      <Card sx={{ p: 2 }}>
        <RegionPieChart data={data} />
      </Card>
    </Box>
  );
}
