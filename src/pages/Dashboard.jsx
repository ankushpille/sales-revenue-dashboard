import {
  Avatar,
  Box,
  Card,
  Chip,
  CircularProgress,
  Fade,
  Grid,
  Typography,
  Zoom,
} from "@mui/material";
import {
  fetchSales,
  fetchTotals,
  fetchTrend,
} from "../redux/slices/salesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import FileUpload from "../components/FileUpload";
import Filters from "../components/Filters";
import ProductBarChart from "../components/ProductBarChart";
import RegionPieChart from "../components/RegionPieChart";
import RevenueLineChart from "../components/RevenueLineChart";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { data, trend, totals, loading } = useSelector((state) => state.sales);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchTrend("monthly"));
    dispatch(fetchTotals());
  }, [refresh, dispatch]);

  if (loading)
    return (
      <Box
        className="glass-effect"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--primary-gradient)",
        }}
      >
        <Box className="pulse-animation">
          <CircularProgress
            size={80}
            thickness={3}
            sx={{
              color: "white",
              filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.3))",
            }}
          />
        </Box>
        <Typography
          variant="h5"
          sx={{
            mt: 3,
            color: "white",
            fontWeight: 600,
            textShadow: "0px 2px 4px rgba(0,0,0,0.3)",
          }}
          className="fade-in-up"
        >
          Loading Analytics Dashboard...
        </Typography>
      </Box>
    );

  return (
    <Box
      className="fade-in-up"
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        minHeight: "100vh",
        background: "var(--primary-gradient)",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      {/* Enhanced Header */}
      <Fade in timeout={700}>
        <Box
          mb={5}
          textAlign="left"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Avatar
              sx={{
                width: 56,
                height: 56,
                background: "var(--success-gradient)",
                fontSize: "1.5rem",
                boxShadow: "var(--shadow-medium)",
              }}
            >
              📊
            </Avatar>
            <Box>
              <Typography
                variant="h3"
                fontWeight={800}
                sx={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0px 4px 8px rgba(0,0,0,0.3)",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                }}
                className="slide-in-right"
              >
                Sales Analytics Dashboard
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              mt: 1,
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "1.1rem",
              fontWeight: 400,
              textShadow: "0px 2px 4px rgba(0,0,0,0.2)",
            }}
            className="slide-in-right"
          >
            Monitor product performance, revenue trends & regional insights with
            real-time analytics
          </Typography>

          <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip
              label="Real-time Data"
              size="small"
              sx={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontWeight: 500,
                backdropFilter: "blur(10px)",
              }}
            />
            <Chip
              label="Interactive Charts"
              size="small"
              sx={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontWeight: 500,
                backdropFilter: "blur(10px)",
              }}
            />
            <Chip
              label="Smart Filtering"
              size="small"
              sx={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontWeight: 500,
                backdropFilter: "blur(10px)",
              }}
            />
          </Box>
        </Box>
      </Fade>

      <Grid container spacing={4} sx={{ position: "relative", zIndex: 1 }}>
        {/* Enhanced File Upload Section */}
        <Grid item xs={12}>
          <Zoom in timeout={600}>
            <Card
              className="glass-effect"
              sx={{
                p: 4,
                borderRadius: "24px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "var(--shadow-hard)",
                },
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Avatar sx={{ background: "var(--primary-gradient)" }}>
                  📁
                </Avatar>
                <Typography variant="h5" fontWeight={700} color="white">
                  Upload Sales Data
                </Typography>
              </Box>
              <FileUpload onUpload={() => setRefresh(!refresh)} />
            </Card>
          </Zoom>
        </Grid>

        {/* Enhanced Summary Cards */}
        <Grid item xs={12} md={6} lg={6}>
          <Fade in timeout={700}>
            <Card
              sx={{
                p: 4,
                borderRadius: "24px",
                background: "var(--dark-gradient)",
                color: "white",
                boxShadow: "var(--shadow-hard)",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-6px) scale(1.02)",
                  boxShadow: "0 25px 70px rgba(0,0,0,0.3)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(90deg, #4b79a1, #283e51)",
                },
              }}
            >
              <Typography variant="h6" fontWeight={600} mb={2}>
                📈 Total Sales
              </Typography>
              <Typography
                variant="h2"
                fontWeight={800}
                mb={1}
                sx={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {totals.totalSales?.toLocaleString() || 0}
              </Typography>
              <Typography sx={{ opacity: 0.8, fontWeight: 500 }}>
                Units sold across all products
              </Typography>
            </Card>
          </Fade>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Fade in timeout={900}>
            <Card
              sx={{
                p: 4,
                borderRadius: "24px",
                background: "var(--success-gradient)",
                color: "white",
                boxShadow: "var(--shadow-hard)",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-6px) scale(1.02)",
                  boxShadow: "0 25px 70px rgba(0,0,0,0.3)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(90deg, #4facfe, #00f2fe)",
                },
              }}
            >
              <Typography variant="h6" fontWeight={600} mb={2}>
                💰 Total Revenue
              </Typography>
              <Typography
                variant="h2"
                fontWeight={800}
                mb={1}
                sx={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ₹{totals.totalRevenue?.toLocaleString() || 0}
              </Typography>
              <Typography sx={{ opacity: 0.8, fontWeight: 500 }}>
                Nationwide revenue summary
              </Typography>
            </Card>
          </Fade>
        </Grid>

        {/* Enhanced Filters */}
        <Grid item xs={12}>
          <Zoom in timeout={700}>
            <Card
              className="glass-effect"
              sx={{
                p: 4,
                borderRadius: "24px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "var(--shadow-medium)",
                },
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Avatar sx={{ background: "var(--warning-gradient)" }}>
                  🔍
                </Avatar>
                <Typography variant="h5" fontWeight={700} color="white">
                  Advanced Filters
                </Typography>
              </Box>
              <Filters
                onFilterChange={(filters) => dispatch(fetchSales(filters))}
              />
            </Card>
          </Zoom>
        </Grid>

        {/* Enhanced Chart Cards */}
        <Grid item xs={12} lg={6}>
          <Fade in timeout={800}>
            <Card
              sx={{
                p: 4,
                height: 480,
                borderRadius: "24px",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                boxShadow: "var(--shadow-medium)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "var(--shadow-hard)",
                },
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Avatar
                  sx={{
                    background: "var(--primary-gradient)",
                    width: 40,
                    height: 40,
                  }}
                >
                  📈
                </Avatar>
                <Typography variant="h6" fontWeight={700} color="#2c3e50">
                  Monthly Revenue Trend
                </Typography>
              </Box>
              <RevenueLineChart data={trend} />
            </Card>
          </Fade>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Fade in timeout={1000}>
            <Card
              sx={{
                p: 4,
                height: 480,
                borderRadius: "24px",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                boxShadow: "var(--shadow-medium)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "var(--shadow-hard)",
                },
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Avatar
                  sx={{
                    background: "var(--secondary-gradient)",
                    width: 40,
                    height: 40,
                  }}
                >
                  🛒
                </Avatar>
                <Typography variant="h6" fontWeight={700} color="#2c3e50">
                  Product-wise Sales
                </Typography>
              </Box>
              <ProductBarChart data={data} showAllLabels />
            </Card>
          </Fade>
        </Grid>

        <Grid item xs={12}>
          <Fade in timeout={1100}>
            <Card
              sx={{
                p: 4,
                height: 520,
                borderRadius: "24px",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                boxShadow: "var(--shadow-medium)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "var(--shadow-hard)",
                },
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Avatar
                  sx={{
                    background: "var(--warning-gradient)",
                    width: 40,
                    height: 40,
                  }}
                >
                  🌍
                </Avatar>
                <Typography variant="h6" fontWeight={700} color="#2c3e50">
                  Region-wise Revenue Distribution
                </Typography>
              </Box>
              <RegionPieChart data={data} />
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
}
