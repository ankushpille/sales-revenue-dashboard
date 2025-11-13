import { CHART_COLORS } from './constants';

/**
 * Aggregate sales data by product
 */
export const aggregateByProduct = (data) => {
  const productMap = data.reduce((acc, item) => {
    const productName = String(item.product || "Unknown");
    if (!acc[productName]) {
      acc[productName] = { product: productName, quantity: 0, revenue: 0 };
    }
    acc[productName].quantity += item.quantity || 0;
    acc[productName].revenue += item.revenue || 0;
    return acc;
  }, {});

  return Object.values(productMap).sort((a, b) => b.quantity - a.quantity);
};

/**
 * Aggregate sales data by region
 */
export const aggregateByRegion = (data) => {
  const regionMap = data.reduce((acc, item) => {
    const regionName = item.region || "Unknown";
    if (!acc[regionName]) {
      acc[regionName] = { name: regionName, value: 0 };
    }
    acc[regionName].value += item.revenue || 0;
    return acc;
  }, {});

  return Object.values(regionMap).sort((a, b) => b.value - a.value);
};

/**
 * Get chart color by index
 */
export const getChartColor = (index) => {
  return CHART_COLORS[index % CHART_COLORS.length];
};

/**
 * Format chart data for line/area charts
 */
export const formatTrendData = (data) => {
  return data.map((item) => ({
    date: item.date || item._id,
    revenue: item.revenue || item.totalRevenue || 0,
  }));
};
