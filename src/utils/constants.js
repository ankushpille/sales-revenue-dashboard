// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
export const API_ENDPOINTS = {
  SALES_UPLOAD: '/api/sales/upload',
  SALES_TOTALS: '/api/sales/totals',
  SALES_FILTER: '/api/sales/filter',
  SALES_TREND: '/api/sales/trend',
  SALES_META: '/api/sales/meta',
};

// Chart Colors
export const CHART_COLORS = [
  '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe',
  '#00f2fe', '#43e97b', '#38f9d7', '#fa709a', '#fee140',
  '#a8edea', '#fed6e3', '#d299c2', '#fef9d7', '#8ec5fc'
];

// File Upload Configuration
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ACCEPTED_TYPES: ['.csv', '.xlsx', '.xls'],
  ACCEPTED_MIME_TYPES: [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  API: 'YYYY-MM-DD',
  MONTH: 'YYYY-MM'
};
