import React from 'react';
import { Card, CardContent, Typography, Button, Box, Alert, List, ListItem, ListItemText, ListItemSecondaryAction, ListItemAvatar, Avatar, IconButton, Divider} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Person as PersonIcon, PriceChangeOutlined } from '@mui/icons-material';

import type { MembersSectionProps } from '../../types/member';

const MembersSection: React.FC<MembersSectionProps> = ({members,onAddMember,onRemoveMember}) => {
  return (
    <Card elevation={3} sx={{ height: 'fit-content' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon />  Members ({members.length})
          </Typography>
          <Button variant="contained"  startIcon={<AddIcon />} onClick={onAddMember}  size="small" >
            Add Member
          </Button>
        </Box>
        
        {members.length === 0 ? (
          <Alert severity="info" sx={{ mb: 2 }}>
            Add group members to start splitting expenses
          </Alert>
        ) : (
          <List>
            {members.map((member, index) => (
              <React.Fragment key={member.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {member.name.charAt(0).toUpperCase()}
                    </Avatar>
                  
                  </ListItemAvatar>
                  <ListItemText primary={member.name} />
                  <ListItemSecondaryAction>
                    <IconButton size='small'><PriceChangeOutlined /> {member.individualCost ? ` ${member.individualCost.toFixed(2)}` : ''} </IconButton>
                    <IconButton edge="end" onClick={() => onRemoveMember(member.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < members.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default MembersSection;