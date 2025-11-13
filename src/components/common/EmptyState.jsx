import { Box, Typography } from "@mui/material";

export default function EmptyState({ icon = "📊", message = "No data available" }) {
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        p: 4,
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: "4rem", mb: 2 }}
        className="float-animation"
      >
        {icon}
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        fontWeight={500}
      >
        {message}
      </Typography>
    </Box>
  );
}
