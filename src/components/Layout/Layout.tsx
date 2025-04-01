import React from 'react';
import { Container } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: '20px',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
      }}
    >
      {children}
    </Container>
  );
};

export default Layout;
