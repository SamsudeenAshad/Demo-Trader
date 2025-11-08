import { Box, Typography } from '@mui/material';
import MainLayout from '../components/MainLayout';
import TickerTape from '../components/TickerTape';

const LeaderboardPage = () => {
  return (
    <MainLayout>
      <TickerTape />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Leaderboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Top traders and rankings coming soon...
        </Typography>
      </Box>
    </MainLayout>
  );
};

export default LeaderboardPage;
