import { Box, Typography } from "@mui/material";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { aggregateByRegion, getChartColor } from "../utils/chartHelpers";
import { formatCurrency } from "../utils/helpers";
import EmptyState from "./common/EmptyState";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
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
          {data.name}
        </Typography>
        <Typography variant="body2" color="#667eea" fontWeight={500}>
          Revenue: {formatCurrency(data.value)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {data.percent ? `${(data.percent * 100).toFixed(1)}%` : ""}
        </Typography>
      </Box>
    );
  }
  return null;
};

const CustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  if (percent < 0.05) return null; // Hide labels for slices smaller than 5%

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
      style={{
        textShadow: "0px 1px 3px rgba(0,0,0,0.5)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomLegend = ({ payload }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        mt: 2,
        gap: 1.5,
      }}
    >
      {payload.map((entry, index) => (
        <Box
          key={`legend-${index}`}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            background: "rgba(255, 255, 255, 0.8)",
            padding: "4px 8px",
            borderRadius: "8px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "#2c3e50",
          }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: entry.color,
              boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
            }}
          />
          {entry.value}
        </Box>
      ))}
    </Box>
  );
};

export default function RegionPieChart({ data = [] }) {
  if (!data.length) {
    return <EmptyState icon="🌍" message="No regional data available" />;
  }

  const chartData = aggregateByRegion(data);

  return (
    <Box
      sx={{
        width: "100%",
        height: 300,
      }}
      className="fade-in-up"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={CustomLabel}
            outerRadius={80}
            innerRadius={30}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getChartColor(index)}
                style={{
                  filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <CustomLegend
        payload={chartData.map((entry, index) => ({
          value: entry.name,
          color: getChartColor(index),
        }))}
      />
    </Box>
  );
}
