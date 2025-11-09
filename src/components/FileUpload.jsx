import { useState } from "react";
import { Box, Button, Typography, LinearProgress } from "@mui/material";

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a CSV or Excel file.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/sales/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("✅ File uploaded successfully!");
        if (onUpload) onUpload(); // refresh dashboard
      } else {
        setMessage("❌ Upload failed: " + result.message);
      }
    } catch (error) {
      setMessage("❌ Error uploading file: " + error.message);
    }

    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h6" mb={1}>
        Upload Sales CSV/Excel File
      </Typography>

      <input
        type="file"
        accept=".csv, .xlsx, .xls"
        onChange={handleFileChange}
        style={{ marginBottom: "10px" }}
      />

      <Button variant="contained" onClick={uploadFile} disabled={loading}>
        Upload
      </Button>

      {loading && <LinearProgress sx={{ mt: 2 }} />}

      {message && (
        <Typography sx={{ mt: 2 }} color="primary">
          {message}
        </Typography>
      )}
    </Box>
  );
}
