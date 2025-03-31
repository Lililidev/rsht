import { useNavigate } from 'react-router-dom';
import { useFileStore } from '@/store/fileStore';
import { Item } from '@/utils/item';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Star as StarFilled, StarBorder as StarOutline } from '@mui/icons-material';
import React from 'react';

export default function FileItem({ item }: { item: Item }) {
  const navigate = useNavigate();
  const toggleFavorite = useFileStore((state) => state.toggleFavorite);

  const handleClick = () => {
    if (item.type === 'dir') navigate(`/folder/${item.id}`);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  return (
    <ListItem disablePadding className="file-item">
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          {item.type === 'dir' ? <FolderIcon color="primary" /> : <InsertDriveFileIcon />}
        </ListItemIcon>
        <ListItemText primary={item.name} />
        <IconButton onClick={handleFavorite} edge="end">
          {item.isFavorite ? <StarFilled color="primary" /> : <StarOutline />}
        </IconButton>
      </ListItemButton>
    </ListItem>
  );
}
