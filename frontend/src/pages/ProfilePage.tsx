import { Box, Typography } from '@mui/material';
import MainLayout from '../components/MainLayout';
import TickerTape from '../components/TickerTape';

const ProfilePage = () => {
  return (
    <MainLayout>
      <TickerTape />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          User profile management coming soon...
        </Typography>
      </Box>
    </MainLayout>
  );
};

export default ProfilePage;
