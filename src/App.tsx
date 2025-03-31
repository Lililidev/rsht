import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FileList from '@/components/FileList/FileList';

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FileList />} />
          <Route path="/folder/:folderId" element={<FileList />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
