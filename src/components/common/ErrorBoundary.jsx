import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--primary-gradient)',
            p: 3,
          }}
        >
          <Container maxWidth="sm">
            <Box
              sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '24px',
                p: 4,
                textAlign: 'center',
                boxShadow: 'var(--shadow-hard)',
              }}
            >
              <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>
                😕
              </Typography>
              <Typography variant="h4" fontWeight={700} color="#2c3e50" mb={2}>
                Oops! Something went wrong
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                We're sorry for the inconvenience. The application encountered an unexpected error.
              </Typography>
              {this.state.error && (
                <Box
                  sx={{
                    background: '#f5f5f5',
                    borderRadius: '12px',
                    p: 2,
                    mb: 3,
                    textAlign: 'left',
                    maxHeight: '200px',
                    overflow: 'auto',
                  }}
                >
                  <Typography
                    variant="caption"
                    component="pre"
                    sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
                  >
                    {this.state.error.toString()}
                  </Typography>
                </Box>
              )}
              <Button
                variant="contained"
                onClick={this.handleReset}
                sx={{
                  background: 'var(--primary-gradient)',
                  borderRadius: '12px',
                  padding: '12px 32px',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 'var(--shadow-medium)',
                  },
                }}
              >
                Reload Application
              </Button>
            </Box>
          </Container>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
