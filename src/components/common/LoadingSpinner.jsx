import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <Box
      className="glass-effect"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--primary-gradient)",
      }}
    >
      <Box className="pulse-animation">
        <CircularProgress
          size={80}
          thickness={3}
          sx={{
            color: "white",
            filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.3))",
          }}
        />
      </Box>
      <Typography
        variant="h5"
        sx={{
          mt: 3,
          color: "white",
          fontWeight: 600,
          textShadow: "0px 2px 4px rgba(0,0,0,0.3)",
        }}
        className="fade-in-up"
      >
        {message}
      </Typography>
    </Box>
  );
}
