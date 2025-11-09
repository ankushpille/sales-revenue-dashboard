import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales, fetchTrend, fetchTotals } from "../redux/slices/salesSlice";

import {
  Box,
  Card,
  Grid,
  Typography,
  CircularProgress,
  Fade,
  Zoom,
  Divider,
} from "@mui/material";

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
      <Box
        textAlign="center"
        mt={10}
        sx={{
          height: "100vh",
          background: "linear-gradient(135deg, #4b79a1, #283e51)",
        }}
      >
        <CircularProgress size={70} thickness={4} sx={{ color: "white" }} />
      </Box>
    );

  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #dfe9f3 0%, #ffffff 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ✅ Header */}
      <Fade in timeout={700}>
        <Box mb={4} textAlign="left">
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              letterSpacing: "0.5px",
              color: "#1A237E",
              textShadow: "0px 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            Sales Analytics Dashboard
          </Typography>
          <Typography sx={{ mt: 1, color: "#455A64", fontSize: "1.05rem" }}>
            Monitor product performance, revenue trends & regional insights.
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={4}>
        {/* ✅ File Upload Section */}
        <Grid item xs={12}>
          <Zoom in timeout={600}>
            <Card
              sx={{
                p: 3,
                borderRadius: "20px",
                backdropFilter: "blur(12px)",
                background: "rgba(255, 255, 255, 0.65)",
                boxShadow: "0 8px 35px rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="h6" fontWeight={600} mb={1.5}>
                Upload Sales Data
              </Typography>
              <FileUpload onUpload={() => setRefresh(!refresh)} />
            </Card>
          </Zoom>
        </Grid>

        {/* ✅ Summary Cards */}
        <Grid item xs={12} md={6} lg={6}>
          <Fade in timeout={700}>
            <Card
              sx={{
                p: 3,
                borderRadius: "20px",
                background: "linear-gradient(135deg, #4b79a1, #283e51)",
                color: "white",
                boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
                textAlign: "center",
              }}
            >
              <Typography variant="h6">Total Sales</Typography>
              <Typography variant="h3" fontWeight={700} mt={1}>
                {totals.totalSales}
              </Typography>
              <Typography sx={{ mt: 1, opacity: 0.7 }}>
                Units sold across all products
              </Typography>
            </Card>
          </Fade>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Fade in timeout={900}>
            <Card
              sx={{
                p: 3,
                borderRadius: "20px",
                background: "linear-gradient(135deg, #11998e, #38ef7d)",
                color: "white",
                boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
                textAlign: "center",
              }}
            >
              <Typography variant="h6">Total Revenue</Typography>
              <Typography variant="h3" fontWeight={700} mt={1}>
                ₹{totals.totalRevenue}
              </Typography>
              <Typography sx={{ mt: 1, opacity: 0.7 }}>
                Nationwide revenue summary
              </Typography>
            </Card>
          </Fade>
        </Grid>

        {/* ✅ Filters */}
        <Grid item xs={12}>
          <Zoom in timeout={700}>
            <Card
              sx={{
                p: 3,
                borderRadius: "20px",
                backdropFilter: "blur(10px)",
                background: "rgba(255, 255, 255, 0.7)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
              }}
            >
              <Typography variant="h6" fontWeight={600} mb={2}>
                Filter Sales Data
              </Typography>
              <Filters onFilterChange={(filters) => dispatch(fetchSales(filters))} />
            </Card>
          </Zoom>
        </Grid>

        {/* ✅ Revenue Line Chart */}
        <Grid item xs={12} lg={6}>
          <Fade in timeout={800}>
            <Card
              sx={{
                p: 3,
                height: 440,
                borderRadius: "22px",
                boxShadow: "0px 12px 44px rgba(0,0,0,0.10)",
                background: "white",
              }}
            >
              <Typography variant="h6" fontWeight={600} mb={2}>
                📈 Monthly Revenue Trend
              </Typography>
              <RevenueLineChart data={trend} />
            </Card>
          </Fade>
        </Grid>

        {/* ✅ Product Bar Chart */}
        <Grid item xs={12} lg={6}>
          <Fade in timeout={1000}>
            <Card
              sx={{
                p: 3,
                height: 440,
                borderRadius: "22px",
                boxShadow: "0px 12px 44px rgba(0,0,0,0.10)",
                background: "white",
              }}
            >
              <Typography variant="h6" fontWeight={600} mb={2}>
                🛒 Product-wise Sales
              </Typography>
              <ProductBarChart data={data} showAllLabels />
            </Card>
          </Fade>
        </Grid>

        {/* ✅ Region Pie Chart */}
        <Grid item xs={12}>
          <Fade in timeout={1100}>
            <Card
              sx={{
                p: 3,
                height: 460,
                borderRadius: "22px",
                boxShadow: "0px 12px 44px rgba(0,0,0,0.10)",
                background: "white",
              }}
            >
              <Typography variant="h6" fontWeight={600} mb={2}>
                🌍 Region-wise Revenue
              </Typography>
              <RegionPieChart data={data} />
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
}
