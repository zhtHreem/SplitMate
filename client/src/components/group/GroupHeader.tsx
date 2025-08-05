import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Group as GroupIcon } from '@mui/icons-material';

interface GroupHeaderProps {
  groupName: string;
  onGoHome: () => void;
}

const GroupHeader: React.FC<GroupHeaderProps> = ({ groupName, onGoHome }) => {
  return (
    <AppBar position="static" elevation={1} sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <GroupIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {groupName}
        </Typography>
        <Button color="inherit" onClick={onGoHome}>
          Back to Home
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default GroupHeader;