import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function RevenueLineChart({ data }) {
  const chartData = data.map((item) => ({
    date: item.date,
    revenue: item.revenue,
  }));

  return (
    <LineChart width={600} height={300} data={chartData}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="revenue" stroke="#1976D2" />
    </LineChart>
  );
}
