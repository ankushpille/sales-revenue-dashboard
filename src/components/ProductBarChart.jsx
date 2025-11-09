import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function ProductBarChart({ data = [] }) {
  if (!data.length) return <p>No product data available.</p>;

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

  return (
    <div
      style={{
        width: "100%",
        height: 350,
        overflowX: "auto",
        overflowY: "hidden",
        paddingBottom: 10,
      }}
    >
      {/* ✅ Scrollable wide chart so labels never hide */}
      <div style={{ width: Math.max(chartData.length * 120, 600), height: "100%" }}>
        <BarChart data={chartData} width={chartData.length * 120} height={330}>
          <XAxis
            dataKey="product"
            interval={0} // ✅ Show ALL labels
            angle={-20} // ✅ Tilt slightly so they never overlap
            textAnchor="end"
            height={70}
            tick={{ fontSize: 13 }}
          />
          <YAxis tick={{ fontSize: 13 }} />
          <Tooltip />

          <Bar
            dataKey="quantity"
            fill="#4CAF50"
            barSize={55} // ✅ Increase BAR WIDTH
            radius={[8, 8, 0, 0]} // ✅ Rounded bars
          />
        </BarChart>
      </div>
    </div>
  );
}
