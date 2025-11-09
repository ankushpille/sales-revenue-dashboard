import { BarChart, Bar, XAxis, Tooltip, YAxis } from "recharts";

export default function ProductBarChart({ data }) {
  const chartData = data.reduce((acc, item) => {
    const found = acc.find((x) => x.product === item.product);
    if (found) found.quantity += item.quantity;
    else acc.push({ product: item.product, quantity: item.quantity });
    return acc;
  }, []);

  return (
    <BarChart width={600} height={300} data={chartData}>
      <XAxis dataKey="product" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="quantity" fill="#43A047" />
    </BarChart>
  );
}
