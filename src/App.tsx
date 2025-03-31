
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import FileList from '@/components/FileList/FileList';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import ErrorPage from '@/components/ErrorPage/ErrorPage';

const theme = createTheme();

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FileList />} />
            <Route path="/folder/:folderId" element={<FileList />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}