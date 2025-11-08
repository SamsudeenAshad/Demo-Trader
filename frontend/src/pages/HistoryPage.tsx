import { Box, Typography } from '@mui/material';
import MainLayout from '../components/MainLayout';
import TickerTape from '../components/TickerTape';

const HistoryPage = () => {
  return (
    <MainLayout>
      <TickerTape />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Trade History
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your trading history coming soon...
        </Typography>
      </Box>
    </MainLayout>
  );
};

export default HistoryPage;
