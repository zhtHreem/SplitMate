import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button} from '@mui/material';
import type { AddMemberDialogProps  } from '../../types/member'; 

const AddMemberDialog: React.FC<AddMemberDialogProps> = ({ addMemberOpen, newMemberName, newIndividualCost, setNewMemberName, setNewindividualCost, addMember, closeAddMemberDialog}) => {

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addMember();
     
    }
  };

  return (
    <Dialog open={addMemberOpen} onClose={closeAddMemberDialog} maxWidth="sm" fullWidth>
      <DialogTitle>Add Group Member</DialogTitle>
      <DialogContent>
        <TextField  autoFocus margin="dense" label="Member Name"  fullWidth variant="outlined"  value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} onKeyPress={handleKeyPress}  sx={{ mt: 2 }}  />
        <TextField autoFocus margin="dense"  label="The cost assigned to this individual." fullWidth  variant="outlined" value={newIndividualCost}   onChange={(e) => setNewindividualCost(parseFloat(e.target.value))} onKeyPress={handleKeyPress}  sx={{ mt: 2 }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAddMemberDialog}>Cancel</Button>
        <Button onClick={addMember} variant="contained" disabled={!newMemberName.trim()}>
          Add Member
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMemberDialog;