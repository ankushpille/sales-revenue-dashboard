import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "../redux/slices/salesSlice";
import { Box, Card, CircularProgress } from "@mui/material";
import ProductBarChart from "../components/ProductBarChart";
import RevenueLineChart from "../components/RevenueLineChart";
import RegionPieChart from "../components/RegionPieChart";
import Filters from "../components/Filters";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.sales);

  useEffect(() => {
    dispatch(fetchSales());
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box p={3}>
      <Filters />
      
      <Card sx={{ p: 2, mb: 3 }}>
        <RevenueLineChart data={data} />
      </Card>

      <Card sx={{ p: 2, mb: 3 }}>
        <ProductBarChart data={data} />
      </Card>

      <Card sx={{ p: 2 }}>
        <RegionPieChart data={data} />
      </Card>
    </Box>
  );
}
