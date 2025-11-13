import { Avatar, Box, Card, Chip, Grid, Typography } from "@mui/material";
import { fetchSales, fetchTotals, fetchTrend } from "../redux/slices/salesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

import FileUpload from "../components/FileUpload";
import Filters from "../components/Filters";
import ProductBarChart from "../components/ProductBarChart";
import RegionPieChart from "../components/RegionPieChart";
import RevenueLineChart from "../components/RevenueLineChart";
import LoadingSpinner from "../components/common/LoadingSpinner";
import StatCard from "../components/common/StatCard";
import ChartCard from "../components/common/ChartCard";
import WelcomeScreen from "../components/WelcomeScreen";
import { formatNumber, formatCurrency } from "../utils/helpers";

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

export default function Dashboard() {
  const dispatch = useDispatch();
  const { data, trend, totals, loading } = useSelector((state) => state.sales);

  const [refresh, setRefresh] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const uploadRef = useRef(null);
  const chartsRef = useRef(null);
  const summaryRef = useRef(null);

  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchTrend("monthly"));
    dispatch(fetchTotals());
  }, [refresh, dispatch]);

  useEffect(() => {
    // Show welcome screen if no data
    if (!loading && data.length === 0 && trend.length === 0) {
      setShowWelcome(true);
    } else {
      setShowWelcome(false);
    }
  }, [data, trend, loading]);

  const scrollToUpload = () => {
    setShowWelcome(false);
    setTimeout(() => {
      uploadRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const scrollToCharts = () => {
    // Scroll to summary cards (Total Sales/Revenue) instead of charts
    summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return <LoadingSpinner message="Loading Analytics Dashboard..." />;
  }

  if (showWelcome) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "var(--primary-gradient)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          py: 4,
        }}
      >
        <WelcomeScreen onUploadClick={scrollToUpload} />
      </Box>
    );
  }

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
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        mb={5}
        textAlign="left"
        sx={{ position: "relative", zIndex: 1 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 2, flexWrap: "wrap" }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              borderRadius: "20px",
              fontSize: "2rem",
              boxShadow: "0 8px 30px rgba(79, 172, 254, 0.4)",
            }}
          >
            📊
          </Box>
          <Box>
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                color: "white",
                textShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
                lineHeight: 1.2,
              }}
            >
              Sales Analytics Dashboard
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            mt: 1,
            color: "rgba(255, 255, 255, 0.95)",
            fontSize: { xs: "0.95rem", sm: "1rem" },
            fontWeight: 500,
            textShadow: "0px 2px 8px rgba(0,0,0,0.4)",
            maxWidth: "800px",
          }}
        >
          Monitor product performance, revenue trends & regional insights with real-time analytics
        </Typography>

        <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
          {["Real-time Data", "Interactive Charts", "Smart Filtering"].map((label, i) => (
            <Chip
              key={i}
              label={label}
              size="small"
              sx={{
                background: "rgba(255, 255, 255, 0.25)",
                color: "white",
                fontWeight: 600,
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            />
          ))}
        </Box>
      </MotionBox>

      <Grid container spacing={4} sx={{ position: "relative", zIndex: 1 }}>
        {/* File Upload Section */}
        <Grid size={12} ref={uploadRef}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            sx={{
              p: 3,
              borderRadius: "20px",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Avatar
                sx={{
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  width: 40,
                  height: 40,
                }}
              >
                📁
              </Avatar>
              <Typography
                variant="h6"
                style={{
                  fontWeight: 700,
                  color: "#000000",
                  fontSize: "1.1rem",
                }}
              >
                Upload Sales Data
              </Typography>
            </Box>
            <FileUpload 
              onUpload={() => setRefresh(!refresh)} 
              scrollToCharts={scrollToCharts}
            />
          </MotionCard>
        </Grid>

        {/* Summary Cards */}
        <Grid size={{ xs: 12, md: 6 }} ref={summaryRef}>
          <StatCard
            title="📈 Total Sales"
            value={formatNumber(totals.totalQuantity || 0)}
            subtitle="Units sold across all products"
            gradient="var(--dark-gradient)"
            delay={0.2}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <StatCard
            title="💰 Total Revenue"
            value={formatCurrency(totals.totalRevenue || 0)}
            subtitle="Nationwide revenue summary"
            gradient="var(--success-gradient)"
            delay={0.3}
          />
        </Grid>

        {/* Filters */}
        <Grid size={12}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            sx={{
              p: 3,
              borderRadius: "20px",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Avatar
                sx={{
                  background: "linear-gradient(135deg, #43e97b, #38f9d7)",
                  width: 40,
                  height: 40,
                }}
              >
                🔍
              </Avatar>
              <Typography
                variant="h6"
                style={{
                  fontWeight: 700,
                  color: "#000000",
                  fontSize: "1.1rem",
                }}
              >
                Advanced Filters
              </Typography>
            </Box>
            <Filters />
          </MotionCard>
        </Grid>

        {/* Chart Cards */}
        <Grid size={{ xs: 12, lg: 6 }} ref={chartsRef}>
          <ChartCard title="Monthly Revenue Trend" icon="📈" delay={0.5}>
            <RevenueLineChart data={trend} />
          </ChartCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartCard title="Product-wise Sales" icon="🛒" delay={0.6}>
            <ProductBarChart data={data} />
          </ChartCard>
        </Grid>

        <Grid size={12}>
          <ChartCard title="Region-wise Revenue Distribution" icon="🌍" height={520} delay={0.7}>
            <RegionPieChart data={data} />
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
}
