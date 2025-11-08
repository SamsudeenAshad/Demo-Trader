import { Box, Typography } from '@mui/material';
import MainLayout from '../components/MainLayout';
import TickerTape from '../components/TickerTape';

const MarketsPage = () => {
  return (
    <MainLayout>
      <TickerTape />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Markets
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Market data and trading pairs coming soon...
        </Typography>
      </Box>
    </MainLayout>
  );
};

export default MarketsPage;
