import { useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Avatar,
  Chip,
  Paper
} from "@mui/material";

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage("");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (isValidFileType(droppedFile)) {
        setFile(droppedFile);
        setMessage("");
      } else {
        setMessage("❌ Please select a valid CSV or Excel file (.csv, .xlsx, .xls)");
      }
    }
  };

  const isValidFileType = (file) => {
    const validTypes = ['.csv', '.xlsx', '.xls'];
    const fileName = file.name.toLowerCase();
    return validTypes.some(type => fileName.endsWith(type));
  };

  const uploadFile = async () => {
    if (!file) {
      setMessage("❌ Please select a CSV or Excel file.");
      return;
    }

    if (!isValidFileType(file)) {
      setMessage("❌ Invalid file type. Please select a CSV or Excel file.");
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
        setMessage("✅ File uploaded successfully! Dashboard will refresh automatically.");
        setFile(null);
        if (onUpload) onUpload(); // refresh dashboard
      } else {
        setMessage(`❌ Upload failed: ${result.message || 'Unknown error occurred'}`);
      }
    } catch (error) {
      setMessage(`❌ Error uploading file: ${error.message}`);
    }

    setLoading(false);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box>
      {/* File Upload Area */}
      <Paper
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        sx={{
          border: dragActive
            ? "2px dashed #667eea"
            : "2px dashed rgba(255, 255, 255, 0.3)",
          borderRadius: "16px",
          p: 4,
          mb: 3,
          cursor: "pointer",
          textAlign: "center",
          background: dragActive
            ? "rgba(102, 126, 234, 0.1)"
            : "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "rgba(255, 255, 255, 0.2)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          },
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        
        <Avatar
          sx={{
            width: 64,
            height: 64,
            mx: "auto",
            mb: 2,
            background: dragActive
              ? "var(--primary-gradient)"
              : "var(--success-gradient)",
            fontSize: "2rem",
            boxShadow: "var(--shadow-medium)",
          }}
        >
          {dragActive ? "📂" : "📄"}
        </Avatar>
        
        <Typography
          variant="h6"
          fontWeight={600}
          color="white"
          mb={1}
        >
          {dragActive ? "Drop your file here!" : "Click to select or drag & drop"}
        </Typography>
        
        <Typography
          variant="body2"
          color="rgba(255, 255, 255, 0.8)"
          sx={{ mb: 2 }}
        >
          Supports CSV, XLSX, and XLS files
        </Typography>
        
        <Chip
          label="Maximum size: 10MB"
          size="small"
          sx={{
            background: "rgba(255, 255, 255, 0.2)",
            color: "white",
            fontWeight: 500,
          }}
        />
      </Paper>

      {/* File Info */}
      {file && (
        <Box
          sx={{
            p: 2,
            mb: 3,
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)"
          }}
          className="fade-in-up"
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Avatar sx={{ background: "var(--warning-gradient)", width: 32, height: 32 }}>
              📊
            </Avatar>
            <Box>
              <Typography variant="subtitle2" fontWeight={600} color="white">
                {file.name}
              </Typography>
              <Typography variant="caption" color="rgba(255, 255, 255, 0.7)">
                {formatFileSize(file.size)} • {file.type || 'Unknown type'}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Upload Button */}
      <Button
        variant="contained"
        onClick={uploadFile}
        disabled={loading || !file}
        fullWidth
        sx={{
          background: !file
            ? "rgba(255, 255, 255, 0.2)"
            : "var(--primary-gradient)",
          borderRadius: "16px",
          padding: "14px 28px",
          fontSize: "1rem",
          fontWeight: 600,
          textTransform: "none",
          boxShadow: file ? "0 4px 15px rgba(102, 126, 234, 0.4)" : "none",
          transition: "all 0.3s ease",
          "&:hover": {
            background: !file
              ? "rgba(255, 255, 255, 0.2)"
              : "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
            transform: file ? "translateY(-2px)" : "none",
            boxShadow: file ? "0 8px 25px rgba(102, 126, 234, 0.6)" : "none",
          },
          "&:disabled": {
            background: "rgba(255, 255, 255, 0.2)",
            color: "rgba(255, 255, 255, 0.5)",
          },
        }}
        startIcon={<span>⬆️</span>}
      >
        {loading ? "Uploading..." : "Upload File"}
      </Button>

      {/* Progress Bar */}
      {loading && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              "& .MuiLinearProgress-bar": {
                background: "var(--primary-gradient)",
                borderRadius: 4,
              },
            }}
          />
        </Box>
      )}

      {/* Status Message */}
      {message && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: "12px",
            background: message.includes("✅")
              ? "rgba(67, 233, 123, 0.2)"
              : "rgba(245, 87, 108, 0.2)",
            border: `1px solid ${
              message.includes("✅")
                ? "rgba(67, 233, 123, 0.3)"
                : "rgba(245, 87, 108, 0.3)"
            }`,
            backdropFilter: "blur(10px)",
          }}
          className="fade-in-up"
        >
          <Typography
            variant="body2"
            color={message.includes("✅") ? "#43e97b" : "#f5576c"}
            fontWeight={500}
          >
            {message}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
