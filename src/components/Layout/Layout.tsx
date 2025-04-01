import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        padding: '20px',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
      }}
    >
      <Outlet />
    </Container>
  );
}