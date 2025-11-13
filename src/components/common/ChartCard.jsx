import { Card, Typography, Box, Avatar } from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion.create(Card);

export default function ChartCard({ 
  title, 
  icon, 
  children, 
  height = 480,
  delay = 0 
}) {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      sx={{
        p: 2.5,
        height,
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        {icon && (
          <Avatar
            sx={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              width: 32,
              height: 32,
              fontSize: "1rem",
            }}
          >
            {icon}
          </Avatar>
        )}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            color: "#2c3e50",
            fontSize: "0.95rem",
          }}
        >
          {title}
        </Typography>
      </Box>
      {children}
    </MotionCard>
  );
}
