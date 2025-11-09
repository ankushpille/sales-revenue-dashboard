import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ProductBarChart({ data = [] }) {
  
  // ✅ Group by product
  const chartData = data.reduce((acc, item) => {
    const existing = acc.find((x) => x.product === item.product);

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      acc.push({ product: item.product, quantity: item.quantity });
    }

    return acc;
  }, []);

  if (!data.length) return <p>No product data available.</p>;

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill="#43A047" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
