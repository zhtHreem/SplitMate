import React from 'react';
import { Box, Button, Paper, Typography, Alert } from '@mui/material';
import {  Receipt as ReceiptIcon, PersonAdd as PersonAddIcon, Add as AddIcon} from '@mui/icons-material';
import type { ShowReceiptButtonProps } from '../../types/receipt';


const ShowReceiptButton: React.FC<ShowReceiptButtonProps> = ({ canShowReceipt, onShowReceipt, onAddMember, onAddExpense, memberCount, hasExpense}) => {
  
  
  const getPromptMessage = () => {
    if (memberCount < 2) {
      return {
        message: "Add at least 2 members to start splitting expenses",
        action: "Add Members",
        onClick: onAddMember,
        icon: <PersonAddIcon />
      };
    }
    if (!hasExpense) {
      return {
        message: "Add an expense to generate your receipt",
        action: "Add Expense",
        onClick: onAddExpense,
        icon: <AddIcon />
      };
    }
    return null;
  };

  const prompt = getPromptMessage();

  return (
    <Box sx={{   position: 'fixed', bottom: 24,    left: '50%',   transform: 'translateX(-50%)',zIndex: 1000,  width: '90%',  maxWidth: 400 }}>
      {canShowReceipt ? (
        <Paper   elevation={8}  sx={{     borderRadius: 4, overflow: 'hidden',  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',}} >
          <Button    fullWidth  size="large"  onClick={onShowReceipt}  sx={{   py: 2,  px: 3,   color: 'white', fontSize: '1.1rem',  fontWeight: 700,   textTransform: 'none', '&:hover': {   background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)', }  }} startIcon={<ReceiptIcon sx={{ fontSize: '1.5rem' }} />} >
            🧾 Show Receipt & Settle Up
          </Button>
        </Paper>
      ) : (
        <Paper elevation={4}  sx={{   p: 2,  borderRadius: 3, bgcolor: 'background.paper', border: '2px dashed',  borderColor: 'grey.300' }} >
          <Alert  severity="info"  sx={{  bgcolor: 'transparent',    border: 'none',   '& .MuiAlert-message': {   width: '100%',  textAlign: 'center'  } }}
            action={
              prompt && (
                <Button variant="contained" size="small"  onClick={prompt.onClick} startIcon={prompt.icon} sx={{  borderRadius: 2, textTransform: 'none',fontWeight: 600  }} >
                     {prompt.action}   </Button>) } >
            <Typography variant="body2" fontWeight="500">
              {prompt?.message}
            </Typography>
          </Alert>
        </Paper>
      )}
    </Box>
  );
};

export default ShowReceiptButton;