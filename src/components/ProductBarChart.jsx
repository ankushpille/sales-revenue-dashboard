import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Box, Typography } from "@mui/material";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          padding: '12px 16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="subtitle2" fontWeight={600} color="#2c3e50">
          {label}
        </Typography>
        <Typography variant="body2" color="#667eea" fontWeight={500}>
          Sales: {payload[0].value} units
        </Typography>
      </Box>
    );
  }
  return null;
};

const colors = [
  '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe',
  '#00f2fe', '#43e97b', '#38f9d7', '#fa709a', '#fee140',
  '#a8edea', '#fed6e3', '#d299c2', '#fef9d7', '#8ec5fc'
];

export default function ProductBarChart({ data = [] }) {
  if (!data.length) {
    return (
      <Box
        sx={{
          height: 350,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Typography variant="h6" color="text.secondary" className="float-animation">
          📊 No product data available
        </Typography>
      </Box>
    );
  }

  // ✅ Group by product
  const chartData = data.reduce((acc, item) => {
    const productName = String(item.product || "");
    const existing = acc.find((p) => p.product === productName);

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      acc.push({
        product: productName,
        quantity: item.quantity,
      });
    }
    return acc;
  }, []);

  // Sort by quantity for better visualization
  chartData.sort((a, b) => b.quantity - a.quantity);

  return (
    <Box
      sx={{
        width: "100%",
        height: 350,
        overflowX: "auto",
        overflowY: "hidden",
        paddingBottom: 10,
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(90deg, #667eea, #764ba2)',
          borderRadius: '3px',
        },
      }}
      className="fade-in-up"
    >
      {/* ✅ Scrollable wide chart so labels never hide */}
      <div style={{ width: Math.max(chartData.length * 120, 600), height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            width={chartData.length * 120}
            height={330}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          >
            <XAxis
              dataKey="product"
              interval={0}
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{
                fontSize: 12,
                fontFamily: 'Inter, sans-serif',
                fill: '#2c3e50',
                fontWeight: 500
              }}
              tickLine={{ stroke: '#e1e5e9', strokeWidth: 1 }}
              axisLine={{ stroke: '#e1e5e9', strokeWidth: 1 }}
            />
            <YAxis
              tick={{
                fontSize: 12,
                fontFamily: 'Inter, sans-serif',
                fill: '#2c3e50',
                fontWeight: 500
              }}
              tickLine={{ stroke: '#e1e5e9', strokeWidth: 1 }}
              axisLine={{ stroke: '#e1e5e9', strokeWidth: 1 }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />

            <Bar
              dataKey="quantity"
              radius={[8, 8, 0, 0]}
              barSize={60}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  style={{
                    filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.1))',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Box>
  );
}
