import { PieChart, Pie, Tooltip } from "recharts";

export default function RegionPieChart({ data }) {
  const regions = {};

  data.forEach((item) => {
    regions[item.region] = (regions[item.region] || 0) + item.revenue;
  });

  const chartData = Object.entries(regions).map(([region, revenue]) => ({
    name: region,
    value: revenue,
  }));

  return (
    <PieChart width={400} height={300}>
      <Pie dataKey="value" data={chartData} fill="#FF7043" label />
      <Tooltip />
    </PieChart>
  );
}
