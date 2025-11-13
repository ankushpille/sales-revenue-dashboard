import { Card, Typography, Avatar } from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion.create(Card);

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  gradient, 
  delay = 0 
}) {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      sx={{
        p: 2.5,
        borderRadius: "16px",
        background: gradient || "linear-gradient(135deg, #2c3e50, #3498db)",
        color: "white",
        boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
        },
      }}
    >
      {icon && (
        <Avatar
          sx={{
            width: 36,
            height: 36,
            mx: "auto",
            mb: 1,
            background: "rgba(255, 255, 255, 0.2)",
            fontSize: "1.2rem",
          }}
        >
          {icon}
        </Avatar>
      )}
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 600,
          mb: 1,
          fontSize: "0.85rem",
          color: "#FFFFFF",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 0.5,
          color: "#FFFFFF",
          fontSize: "1.75rem",
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          opacity: 0.9,
          fontWeight: 500,
          fontSize: "0.75rem",
          color: "#FFFFFF",
        }}
      >
        {subtitle}
      </Typography>
    </MotionCard>
  );
}
