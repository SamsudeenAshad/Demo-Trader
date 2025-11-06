import { Box, Container, Typography, Button } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';

function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" gutterBottom sx={{ color: 'primary.main', mb: 2 }}>
          TradeSim
        </Typography>
        <Typography variant="h4" gutterBottom sx={{ color: 'text.primary', mb: 1 }}>
          Welcome to Your Demo Trading Platform
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 600 }}>
          Practice trading with $100,000 virtual money. Learn, experiment, and master the markets
          without any risk.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/register"
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={Link}
            to="/login"
          >
            Login
          </Button>
        </Box>

        <Box sx={{ mt: 8, textAlign: 'left', maxWidth: 800 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'text.primary', mb: 3 }}>
            Features
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
            {[
              { title: 'Real-time Data', desc: 'Live market prices and updates' },
              { title: 'Advanced Charts', desc: 'Technical indicators and drawing tools' },
              { title: 'Multiple Assets', desc: 'Stocks, Forex, Crypto, and more' },
              { title: 'Risk-Free', desc: 'Practice with virtual money' },
            ].map((feature) => (
              <Box
                key={feature.title}
                sx={{
                  p: 3,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {feature.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

function App() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Typography>Register Page (Coming Soon)</Typography>} />
        <Route path="/login" element={<Typography>Login Page (Coming Soon)</Typography>} />
      </Routes>
    </Box>
  );
}

export default App;
