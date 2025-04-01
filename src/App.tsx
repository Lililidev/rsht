import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import FileList from '@/components/FileList/FileList';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import ErrorPage from '@/components/ErrorPage/ErrorPage';
import Layout from '@/components/Layout/Layout';

const theme = createTheme();

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={
                  <ErrorBoundary fallback={<ErrorPage />}>
                    <FileList />
                  </ErrorBoundary>
                }
              />
              <Route path="/folder/:folderId" element={<FileList />} />
              <Route path="/error" element={<ErrorPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
