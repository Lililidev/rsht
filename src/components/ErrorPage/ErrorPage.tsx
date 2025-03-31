import {  Button, Box, Typography } from '@mui/material';
import { useFileStore } from '@/store/fileStore';

export default function ErrorPage() {
  const { error, resetError } = useFileStore();

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh"
      textAlign="center"
    >
      <img 
        src="https://pugofka.com/upload/iblock/bb0/404_error.png" 
        alt="Error" 
        style={{ maxWidth: '500px', width: '100%', marginBottom: '20px' }}
      />
      <Typography variant="h5" gutterBottom>
        {error?.message || 'An error occurred'}
      </Typography>
      {error?.status && (
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Error: {error.status}
        </Typography>
      )}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={resetError}
        sx={{ mt: 2 }}
      >
        Try Again
      </Button>
    </Box>
  );
}