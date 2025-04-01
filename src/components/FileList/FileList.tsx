import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFileStore } from '@/store/fileStore';
import FileItem from '@/components/FileItem/FileItem';
import { 
  List, 
  Typography, 
  CircularProgress, 
  Breadcrumbs, 
  Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ErrorPage from '@/components/ErrorPage/ErrorPage';
import styles from './FileList.module.css';

export default function FileList() {
  const { folderId } = useParams();
  const {
    isLoading,
    error,
    fetchFiles,
    getCurrentFolderFiles,
    setCurrentFolder,
    getFolderPath
  } = useFileStore();

  useEffect(() => {
    fetchFiles().then(() => {
      setCurrentFolder(folderId ? parseInt(folderId) : null);
    });
  }, [fetchFiles, folderId, setCurrentFolder]);

  if (error) return <ErrorPage />;
  if (isLoading) return <CircularProgress className={styles.loading} />;

  const currentFiles = getCurrentFolderFiles();
  const folderPath = folderId ? getFolderPath(parseInt(folderId)) : [];

  return (
    <div className={styles.container}>
      <Breadcrumbs className={styles.breadcrumbs}>
        <Link component={RouterLink} to="/">
          <HomeIcon fontSize="small" />
        </Link>
        {folderPath.map(folder => (
          <Link
            key={folder.id}
            component={RouterLink}
            to={`/folder/${folder.id}`}
          >
            {folder.name}
          </Link>
        ))}
      </Breadcrumbs>

      {currentFiles.length === 0 ? (
        <Typography className={styles.empty}>Папка пуста</Typography>
      ) : (
        <List>
          {currentFiles.map(file => (
            <FileItem key={file.id} item={file} />
          ))}
        </List>
      )}
    </div>
  );
}