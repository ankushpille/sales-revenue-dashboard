import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { motion } from "framer-motion";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PieChartIcon from "@mui/icons-material/PieChart";
import BarChartIcon from "@mui/icons-material/BarChart";

const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);

const features = [
  {
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    title: "Revenue Trends",
    description: "Track your sales performance over time"
  },
  {
    icon: <BarChartIcon sx={{ fontSize: 40 }} />,
    title: "Product Analytics",
    description: "Analyze product-wise sales data"
  },
  {
    icon: <PieChartIcon sx={{ fontSize: 40 }} />,
    title: "Regional Insights",
    description: "Understand regional distribution"
  }
];

export default function WelcomeScreen({ onUploadClick }) {
  return (
    <Container maxWidth="lg">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          textAlign: "center",
          py: 8,
        }}
      >
        {/* Hero Section */}
        <MotionBox
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          sx={{ mb: 6 }}
        >
          <Box
            sx={{
              width: { xs: 100, md: 120 },
              height: { xs: 100, md: 120 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
              borderRadius: "30px",
              fontSize: { xs: "4rem", md: "5rem" },
              mx: "auto",
              mb: 3,
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255,255,255,0.3)",
            }}
            className="float-animation"
          >
            📊
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 800,
              color: "white",
              mb: 2,
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            Welcome to Sales Analytics
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.95)",
              fontWeight: 500,
              maxWidth: 600,
              mx: "auto",
              mb: 4,
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              fontSize: { xs: "1rem", sm: "1.1rem" },
            }}
          >
            Get started by uploading your sales data to unlock powerful insights and visualizations
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="medium"
              startIcon={<CloudUploadIcon />}
              onClick={onUploadClick}
              sx={{
                background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
                color: "#667eea",
                fontSize: "1rem",
                fontWeight: 700,
                px: 3,
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
                boxShadow: "0 4px 20px rgba(255,255,255,0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 25px rgba(255,255,255,0.4)",
                },
              }}
            >
              Upload Your Data
            </Button>
            
            <Button
              variant="outlined"
              size="medium"
              href="/sample-data.xlsx"
              download="sample-data.xlsx"
              sx={{
                color: "white",
                borderColor: "rgba(255, 255, 255, 0.6)",
                fontSize: "1rem",
                fontWeight: 700,
                px: 3,
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
                backdropFilter: "blur(10px)",
                background: "rgba(255, 255, 255, 0.15)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.25)",
                  borderColor: "rgba(255, 255, 255, 0.9)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              📥 Download Sample
            </Button>
          </Box>
        </MotionBox>

        {/* Features Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
            mt: 8,
          }}
        >
          {features.map((feature, index) => (
            <MotionPaper
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              sx={{
                p: 4,
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "24px",
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  background: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                },
              }}
            >
              <Box
                sx={{
                  color: "white",
                  mb: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {feature.icon}
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: 700,
                  mb: 1,
                  textShadow: "0 2px 6px rgba(0,0,0,0.3)",
                }}
              >
                {feature.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.95)",
                  fontWeight: 500,
                  textShadow: "0 1px 4px rgba(0,0,0,0.2)",
                }}
              >
                {feature.description}
              </Typography>
            </MotionPaper>
          ))}
        </Box>

        {/* Instructions */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          sx={{
            mt: 8,
            p: 4,
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "20px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: 700,
              mb: 2,
              textShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
          >
            📁 Supported File Formats
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.95)",
              mb: 2,
              fontWeight: 600,
              textShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            Excel (XLSX, XLS) & CSV • Maximum 10MB
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              fontFamily: "monospace",
              fontSize: "0.85rem",
              fontWeight: 500,
              textShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          >
            Required columns: date, product, category, region, quantity, price, revenue
          </Typography>
        </MotionBox>
      </MotionBox>
    </Container>
  );
}
