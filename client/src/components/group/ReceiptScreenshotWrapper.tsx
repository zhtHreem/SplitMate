import React, { useRef } from 'react';
import domtoimage from 'dom-to-image-more';
import {  Dialog, DialogContent, DialogActions, Button, Box, Typography, Paper} from '@mui/material';


import ReceiptSummary from './SettlementSummary';
import type { SettlementSummaryProps } from '../../types/settlement';


interface ReceiptDialogWrapperProps extends SettlementSummaryProps {
  groupName: string;
  open: boolean;
  onClose: () => void;
  onShareSuccess?: () => void; 

}

const ReceiptDialogWrapper: React.FC<ReceiptDialogWrapperProps> = ({groupName,members,settlements,getMemberName,open,onClose,onShareSuccess,}) => {
  
  
  
    const captureRef = useRef<HTMLDivElement>(null);

const handleShareReceipt = async () => {
  if (!captureRef.current) return;

  try {
    const blob = await domtoimage.toBlob(captureRef.current);
    const link = document.createElement('a');
    link.download = `${groupName}-receipt.png`;
    link.href = URL.createObjectURL(blob);
    link.click();

    if (onShareSuccess) onShareSuccess();
  } catch (error) {
    console.error('Image download failed', error);
  }
};


  return (
    <Box ref={captureRef} sx={{ bgcolor: '#fff',  borderRadius: 3, overflow: 'hidden',padding: 3,  backgroundClip: 'padding-box' }}>

    <Dialog open={open}  onClose={onClose} maxWidth="md" fullWidth PaperProps={{sx: {borderRadius: 3,boxShadow: '0 20px 40px rgba(0,0,0,0.1)', } }}>
      <DialogContent sx={{ p: 0 }}>
        <Box ref={captureRef} sx={{ bgcolor: '#fff', borderRadius: 3, overflow: 'hidden' }}>
          <Box    sx={{  pb: 2,   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white',  borderRadius: '12px 12px 0 0',  textAlign: 'center', py: 2, }}  >
            <Typography variant="h6">
              🧾 {groupName} - Receipt
            </Typography>
          </Box>

          <Box sx={{ p: 3 }}>
            <Paper elevation={3}  sx={{ p: 2, borderRadius: 2,boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', overflow: 'hidden',backgroundColor: '#fff'}}>
              <ReceiptSummary
                members={members}
                settlements={settlements}
                getMemberName={getMemberName}
              />
            </Paper>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
          Close
        </Button>
        <Button onClick={handleShareReceipt}   variant="contained"  sx={{ borderRadius: 2,  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',}}  >
          📤 Share Receipt
        </Button>
      </DialogActions>
    </Dialog>
    </Box>
  );
};

export default ReceiptDialogWrapper;
