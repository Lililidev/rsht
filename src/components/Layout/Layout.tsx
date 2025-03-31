import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Container className={styles.container}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
