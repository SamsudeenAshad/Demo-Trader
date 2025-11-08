import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainLayout from '../components/MainLayout';
import TickerTape from '../components/TickerTape';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

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

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <MainLayout>
      {/* Ticker Tape */}
      <TickerTape />

      {/* Main Dashboard Content */}
      <Box sx={{ mt: 3 }}>
        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, bgcolor: 'background.paper', borderLeft: '4px solid', borderColor: 'success.main' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Virtual Balance
                </Typography>
                <AccountBalanceWalletIcon sx={{ color: 'success.main' }} />
              </Box>
              <Typography variant="h4" sx={{ color: 'success.main', fontWeight: 600 }}>
                ${user.virtualBalance?.toLocaleString() || '100,000'}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, bgcolor: 'background.paper', borderLeft: '4px solid', borderColor: user.totalProfitLoss >= 0 ? 'success.main' : 'error.main' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Total P/L
                </Typography>
                <TrendingUpIcon sx={{ color: user.totalProfitLoss >= 0 ? 'success.main' : 'error.main' }} />
              </Box>
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
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, bgcolor: 'background.paper', borderLeft: '4px solid', borderColor: 'primary.main' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Active Trades
                </Typography>
                <ShowChartIcon sx={{ color: 'primary.main' }} />
              </Box>
              <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 600 }}>
                0
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, bgcolor: 'background.paper', borderLeft: '4px solid', borderColor: 'info.main' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Win Rate
                </Typography>
                <ShowChartIcon sx={{ color: 'info.main' }} />
              </Box>
              <Typography variant="h4" sx={{ color: 'info.main', fontWeight: 600 }}>
                0%
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Welcome Message */}
        <Paper sx={{ p: 4, mb: 3, bgcolor: 'background.paper' }}>
          <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
            Welcome, {user.firstName} {user.lastName}!
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
            @{user.username} • {user.email}
          </Typography>
          <Box sx={{ p: 3, bgcolor: 'background.default', borderRadius: 1, borderLeft: '4px solid', borderColor: 'primary.main' }}>
            <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500 }}>
              🎉 Your account is ready with $100,000 in virtual money!
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
              Start exploring the markets and practice your trading strategies risk-free.
            </Typography>
          </Box>
        </Paper>

        {/* Quick Actions */}
        <Paper sx={{ p: 4, bgcolor: 'background.paper' }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'text.primary', mb: 3 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                fullWidth 
                variant="contained" 
                color="success" 
                size="large"
                startIcon={<ShowChartIcon />}
                onClick={() => navigate('/markets')}
              >
                Browse Markets
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                fullWidth 
                variant="outlined" 
                color="primary" 
                size="large"
                startIcon={<AccountBalanceWalletIcon />}
                onClick={() => navigate('/portfolio')}
              >
                View Portfolio
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                fullWidth 
                variant="outlined" 
                color="primary" 
                size="large"
                onClick={() => navigate('/history')}
              >
                Trade History
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                fullWidth 
                variant="outlined" 
                color="primary" 
                size="large"
                onClick={() => navigate('/leaderboard')}
              >
                Leaderboard
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </MainLayout>
  );
}

export default DashboardPage;
