import { Box, Container, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ color: 'primary.main' }}>
            Dashboard
          </Typography>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <Paper sx={{ p: 4, mb: 3, bgcolor: 'background.paper' }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'text.primary' }}>
            Welcome, {user.firstName} {user.lastName}!
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
            @{user.username} • {user.email}
          </Typography>
        </Paper>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
          <Paper sx={{ p: 3, bgcolor: 'background.paper', borderLeft: '4px solid', borderColor: 'success.main' }}>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
              Virtual Balance
            </Typography>
            <Typography variant="h4" sx={{ color: 'success.main', fontWeight: 600 }}>
              ${user.virtualBalance?.toLocaleString() || '100,000'}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, bgcolor: 'background.paper', borderLeft: '4px solid', borderColor: user.totalProfitLoss >= 0 ? 'success.main' : 'error.main' }}>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
              Total P/L
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                color: user.totalProfitLoss >= 0 ? 'success.main' : 'error.main',
                fontWeight: 600 
              }}
            >
              {user.totalProfitLoss >= 0 ? '+' : ''}${user.totalProfitLoss?.toLocaleString() || '0'}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, bgcolor: 'background.paper', borderLeft: '4px solid', borderColor: 'primary.main' }}>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
              Active Trades
            </Typography>
            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 600 }}>
              0
            </Typography>
          </Paper>
        </Box>

        <Paper sx={{ p: 4, mt: 3, bgcolor: 'background.paper' }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'text.primary' }}>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button variant="contained" color="success" size="large">
              Start Trading
            </Button>
            <Button variant="outlined" color="primary" size="large">
              View Markets
            </Button>
            <Button variant="outlined" color="primary" size="large">
              Portfolio
            </Button>
          </Box>
        </Paper>

        <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            🎉 Congratulations! Your account has been created successfully. You now have $100,000 in virtual money to practice trading.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default DashboardPage;
