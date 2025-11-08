import { Box, Typography } from '@mui/material';
import MainLayout from '../components/MainLayout';
import TickerTape from '../components/TickerTape';

const PortfolioPage = () => {
  return (
    <MainLayout>
      <TickerTape />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Portfolio
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your portfolio and holdings coming soon...
        </Typography>
      </Box>
    </MainLayout>
  );
};

export default PortfolioPage;
