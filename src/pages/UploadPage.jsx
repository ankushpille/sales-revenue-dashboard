import { useState } from "react";
import { Box, Button, Card, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/sales/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage(res.data.message + " — Inserted: " + res.data.inserted);
    } catch (err) {
      setMessage("Upload failed: " + err.message);
    }

    setLoading(false);
  };

  return (
    <Box p={4}>
      <Card sx={{ p: 4, maxWidth: 400, margin: "auto" }}>
        <Typography variant="h5" mb={2}>
          Upload Sales Excel/CSV
        </Typography>

        <input type="file" onChange={handleFileChange} />

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : "Upload File"}
        </Button>

        {message && (
          <Typography mt={2} color="primary">
            {message}
          </Typography>
        )}
      </Card>
    </Box>
  );
}
