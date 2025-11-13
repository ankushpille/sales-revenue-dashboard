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
import { FILE_UPLOAD, API_BASE_URL, API_ENDPOINTS } from "../utils/constants";
import { formatFileSize, isValidFileType } from "../utils/helpers";

export default function FileUpload({ onUpload, scrollToCharts }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    if (!isValidFileType(selectedFile, FILE_UPLOAD.ACCEPTED_TYPES)) {
      setMessage(`❌ Invalid file type. Accepted: ${FILE_UPLOAD.ACCEPTED_TYPES.join(', ')}`);
      return;
    }
    
    if (selectedFile.size > FILE_UPLOAD.MAX_SIZE) {
      setMessage(`❌ File too large. Maximum size: ${formatFileSize(FILE_UPLOAD.MAX_SIZE)}`);
      return;
    }

    setFile(selectedFile);
    setMessage("");
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
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setMessage("❌ Please select a file first.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SALES_UPLOAD}`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        setMessage(`✅ Success! ${result.inserted || 0} records uploaded. Refreshing dashboard...`);
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        
        // Refresh data and scroll to charts
        if (onUpload) {
          setTimeout(() => {
            onUpload();
            if (scrollToCharts) {
              setTimeout(scrollToCharts, 800);
            }
          }, 500);
        }
      } else {
        setMessage(`❌ Upload failed: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage(`❌ Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
            ? "3px dashed #667eea"
            : "3px dashed rgba(102, 126, 234, 0.5)",
          borderRadius: "16px",
          p: 3,
          mb: 2,
          cursor: "pointer",
          textAlign: "center",
          background: dragActive
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "rgba(255, 255, 255, 0.98)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
            borderColor: "#667eea",
          },
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={FILE_UPLOAD.ACCEPTED_TYPES.join(',')}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        
        <Avatar
          sx={{
            width: 56,
            height: 56,
            mx: "auto",
            mb: 2,
            background: dragActive
              ? "linear-gradient(135deg, #667eea, #764ba2)"
              : "linear-gradient(135deg, #4facfe, #00f2fe)",
            fontSize: "1.8rem",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          }}
        >
          {dragActive ? "📂" : "📄"}
        </Avatar>
        
        <Typography
          variant="h6"
          style={{
            color: "#000000",
            fontWeight: 700,
            marginBottom: "8px",
            fontSize: "1.1rem",
          }}
        >
          {dragActive ? "Drop your file here!" : "Click to select or drag & drop"}
        </Typography>
        
        <Typography
          variant="body2"
          style={{
            color: "#000000",
            marginBottom: "16px",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          Supports Excel (XLSX, XLS) and CSV files
        </Typography>
        
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center", flexWrap: "wrap" }}>
          <Chip
            label={`Max: ${formatFileSize(FILE_UPLOAD.MAX_SIZE)}`}
            size="small"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "#000000",
              fontWeight: 600,
              border: "1px solid rgba(0, 0, 0, 0.2)",
            }}
          />
          <Chip
            label="📥 Download Sample"
            size="small"
            component="a"
            href="/sample-data.xlsx"
            download="sample-data.xlsx"
            clickable
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "rgba(67, 233, 123, 0.8)",
              color: "#000000",
              fontWeight: 700,
              cursor: "pointer",
              border: "1px solid rgba(0, 0, 0, 0.2)",
            }}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(67, 233, 123, 1)",
              },
            }}
          />
        </Box>
      </Paper>

      {/* File Info */}
      {file && (
        <Box
          sx={{
            p: 2,
            mb: 3,
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "12px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(0, 0, 0, 0.1)"
          }}
          className="fade-in-up"
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Avatar sx={{ background: "var(--warning-gradient)", width: 32, height: 32 }}>
              📊
            </Avatar>
            <Box>
              <Typography
                variant="subtitle2"
                style={{
                  color: "#000000",
                  fontWeight: 700,
                }}
              >
                {file.name}
              </Typography>
              <Typography
                variant="caption"
                style={{
                  color: "#000000",
                  fontWeight: 500,
                }}
              >
                {formatFileSize(file.size)} • {file.type || 'Excel/CSV file'}
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
            : "linear-gradient(135deg, #667eea, #764ba2)",
          borderRadius: "10px",
          padding: "10px 20px",
          fontSize: "0.9rem",
          fontWeight: 700,
          textTransform: "none",
          color: "#FFFFFF",
          boxShadow: file ? "0 4px 15px rgba(102, 126, 234, 0.4)" : "none",
          transition: "all 0.3s ease",
          "&:hover": {
            background: !file
              ? "rgba(255, 255, 255, 0.2)"
              : "linear-gradient(135deg, #5a6fd8, #6a4190)",
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
            style={{
              color: message.includes("✅") ? "#43e97b" : "#f5576c",
              fontWeight: 700,
              fontSize: "0.95rem",
            }}
          >
            {message}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
