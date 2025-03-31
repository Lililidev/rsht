import React from 'react';
import { IconButton } from '@mui/material';
import { Star as StarFilledIcon, StarBorder as StarOutlineIcon } from '@mui/icons-material';

interface LikeButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ isFavorite, onClick }) => (
  <IconButton
    onClick={onClick}
    edge="end"
    aria-label={isFavorite ? 'Unlike' : 'Like'}
    sx={{
      color: isFavorite ? '#ffb74d' : '#5f6368',
      '& .MuiSvgIcon-root': {
        color: 'inherit',
      },
    }}
  >
    {isFavorite ? <StarFilledIcon /> : <StarOutlineIcon />}
  </IconButton>
);
