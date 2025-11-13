import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { formatTrendData } from "../utils/chartHelpers";
import { formatCurrency } from "../utils/helpers";
import EmptyState from "./common/EmptyState";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "12px",
          padding: "12px 16px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="subtitle2" fontWeight={600} color="#2c3e50">
          {label}
        </Typography>
        <Typography variant="body2" color="#667eea" fontWeight={500}>
          Revenue: {formatCurrency(payload[0].value)}
        </Typography>
      </Box>
    );
  }
  return null;
};

export default function RevenueLineChart({ data = [] }) {
  if (!data.length) {
    return <EmptyState icon="📈" message="No revenue data available" />;
  }

  const chartData = formatTrendData(data);

  return (
    <Box
      sx={{
        width: "100%",
        height: 300,
      }}
      className="fade-in-up"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#667eea" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="date"
            tick={{
              fontSize: 12,
              fontFamily: "Inter, sans-serif",
              fill: "#2c3e50",
              fontWeight: 500,
            }}
            tickLine={{ stroke: "#e1e5e9", strokeWidth: 1 }}
            axisLine={{ stroke: "#e1e5e9", strokeWidth: 1 }}
          />
          <YAxis
            tick={{
              fontSize: 12,
              fontFamily: "Inter, sans-serif",
              fill: "#2c3e50",
              fontWeight: 500,
            }}
            tickLine={{ stroke: "#e1e5e9", strokeWidth: 1 }}
            axisLine={{ stroke: "#e1e5e9", strokeWidth: 1 }}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            fill="url(#revenueGradient)"
            dot={{
              fill: "#667eea",
              strokeWidth: 2,
              stroke: "#ffffff",
              r: 4,
              filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.2))",
            }}
            activeDot={{
              r: 6,
              fill: "#667eea",
              stroke: "#ffffff",
              strokeWidth: 2,
              filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.3))",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
