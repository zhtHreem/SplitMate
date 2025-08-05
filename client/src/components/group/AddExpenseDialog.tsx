import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Stack, Chip, Alert, Box, IconButton, Paper, FormControl, InputLabel, Select, MenuItem, Divider, Card, CardContent, Avatar, Grid} from '@mui/material';

import {  Add as AddIcon,  Remove as RemoveIcon,  Person as PersonIcon,AttachMoney as MoneyIcon, PriceChangeOutlined,Receipt as ReceiptIcon,CheckCircle as CheckIcon, Warning as WarningIcon} from '@mui/icons-material';
import type { AddExpenseDialogProps} from '../../types/expense';
import {calculateTotalPaid,calculateRemainingAmount,isExpenseBalanced,getAvailableMembers,handlePayerAmountChange,handleAddPayer} from '../../utils/expense';


const AddExpenseDialog: React.FC<AddExpenseDialogProps> = ({ addExpenseOpen, newExpense, members, getIndividualCostSum, updateExpenseForm, toggleSplitMember, addPayer, removePayer, addExpense,closeAddExpenseDialog,getPerPersonAmount,isExpenseFormValid,isEditing}) => {
 
 
  
   const parsedExpense = {
    ...newExpense,
     amount: parseFloat(newExpense.amount) || 0};
   const totalAmount = getIndividualCostSum(); // from prop
   const totalPaid = calculateTotalPaid(parsedExpense);
   const remainingAmount = calculateRemainingAmount(totalAmount, totalPaid);
   const isBalanced = isExpenseBalanced(remainingAmount);
   const availableMembers = getAvailableMembers(members, parsedExpense);

  const calculationResult = React.useMemo(() => {
    if (newExpense.splitBetween.length > 0 && totalAmount > 0 && isBalanced) {
      try {
        return getPerPersonAmount(members);
      } catch (error) {
        console.error('Calculation error:', error);
        return [];
      }
    }
    return [];
  }, [newExpense.splitBetween, totalAmount, remainingAmount, members, getPerPersonAmount]);
 



  return (
    <Dialog open={addExpenseOpen} onClose={closeAddExpenseDialog} maxWidth="lg" fullWidth PaperProps={{  sx: {borderRadius: 3,  boxShadow: '0 20px 40px rgba(0,0,0,0.1)', } }}>
      <DialogTitle sx={{ pb: 1,background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '12px 12px 0 0',  display: 'flex', alignItems: 'center',gap: 2}}>
        <ReceiptIcon />
        <Typography variant="h5" component="div" fontWeight="600">
          {isEditing ? 'Edit Expense' : 'Add Expense'}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 3, bgcolor: '#fafafa' }}>

        <Card sx={{ mb: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ReceiptIcon fontSize="small" />
              Expense Details
            </Typography>
            <TextField margin="dense"   label="What's this expense for?"  fullWidth  variant="outlined"   value={newExpense.description}  onChange={(e) => updateExpenseForm({ description: e.target.value })} placeholder="e.g., Dinner at restaurant, Hotel booking..."   sx={{   '& .MuiOutlinedInput-root': {  borderRadius: 2,}  }} />
          </CardContent>
        </Card>

        <Grid container spacing={3}>

          <Grid item xs={12} md={6}>

            <Card sx={{ mb: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <MoneyIcon color="primary" />
                  <Typography variant="h6" color="primary">
                    Total Amount
                  </Typography>
                </Box>
                <Box sx={{   p: 2,  bgcolor: 'primary.50',   borderRadius: 2,  border: '1px solid',borderColor: 'primary.200' }} >
                  <Typography variant="h4" color="primary.main" fontWeight="700" textAlign="center">
                    <PriceChangeOutlined/>{totalAmount.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    From individual costs
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PersonIcon color="primary" />
                    <Typography variant="h6" color="primary">
                      Who Paid?
                    </Typography>
                  </Box>
                  <Chip 
                    label={`Total: ${totalPaid.toFixed(2)}`} color={isBalanced ? "success" : "warning"} variant="filled" sx={{ fontWeight: 600 }} />
                </Box>

                <Alert 
                  severity={isBalanced ? 'success' : 'warning'} 
                  sx={{ mb: 2, borderRadius: 2 }}
                  icon={isBalanced ? <CheckIcon /> : <WarningIcon />} >
                  {isBalanced 
                    ? 'Perfect! Total payments match the expense amount' 
                    : `Need ${Math.abs(remainingAmount).toFixed(2)} more to balance`
                  }
                </Alert>

                <Stack spacing={2} sx={{ mb: 2 }}>
                  {newExpense.paidBy.map((payer) => {
                    const member = members.find(m => m.id === payer.memberId);
                    return (
                      <Paper 
                        key={payer.memberId} sx={{  p: 2,   borderRadius: 2, border: '1px solid',borderColor: 'grey.200',   bgcolor: 'white',transition: 'all 0.2s ease', '&:hover': {   boxShadow: '0 4px 12px rgba(0,0,0,0.1)',  borderColor: 'primary.300'   }  }}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            {member?.name?.charAt(0) || '?'}
                          </Avatar>
                          <Typography variant="body1" fontWeight="500" sx={{ minWidth: 80 }}>
                            {member?.name || 'Unknown'}
                          </Typography>
                          <TextField label="Amount Paid"  type="number"  size="small" value={payer.amount || ''} onChange={(e) => handlePayerAmountChange(payer.memberId, e.target.value, addPayer)} inputProps={{ step: 0.01, min: 0 }} sx={{  flexGrow: 1, '& .MuiOutlinedInput-root': { borderRadius: 2,   } }}  />
                          <IconButton  onClick={() => removePayer(payer.memberId)} color="error"   size="small" sx={{   bgcolor: 'error.50', '&:hover': { bgcolor: 'error.100' } }} >
                            <RemoveIcon />
                          </IconButton>
                        </Box>
                      </Paper>
                    );
                  })}
                </Stack>

             
                {availableMembers.length > 0 && (
                  <Paper sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, border: '1px dashed', borderColor: 'grey.300' }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <IconButton  size="small"  sx={{   bgcolor: 'primary.main',  color: 'white',  '&:hover': { bgcolor: 'primary.dark' } }}  >
                        <AddIcon />
                      </IconButton>
                      <FormControl size="small" sx={{ minWidth: 200, flexGrow: 1 }}>
                        <InputLabel>Add someone who paid</InputLabel>
                        <Select label="Add someone who paid"  defaultValue=""  onChange={(e) => handleAddPayer(e.target.value as string, parsedExpense, addPayer)} sx={{ borderRadius: 2 }} >
                          {availableMembers.map((member) => (
                            <MenuItem key={member.id} value={member.id}>
                              <Box display="flex" alignItems="center" gap={1}>
                                <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                                  {member.name.charAt(0)}
                                </Avatar>
                                {member.name}
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Paper>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>

            <Card sx={{ mb: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon />
                  Split Between
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Select who should share this expense
                </Typography>
                
                <Grid container spacing={1}>
                  {members.map((member) => {
                    const isSelected = newExpense.splitBetween.includes(member.id);
                    return (
                      <Grid item xs={6} key={member.id}>
                        <Paper  onClick={() => toggleSplitMember(member.id)}
                          sx={{  p: 2,  cursor: 'pointer',    borderRadius: 2,   border: '2px solid',   borderColor: isSelected ? 'primary.main' : 'grey.200', bgcolor: isSelected ? 'primary.50' : 'white', transition: 'all 0.2s ease',  '&:hover': {   borderColor: 'primary.main',   bgcolor: isSelected ? 'primary.100' : 'primary.50',  transform: 'translateY(-1px)',   boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }  }} >
                     
                          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                            <Avatar  sx={{   bgcolor: isSelected ? 'primary.main' : 'grey.400',  width: 32,    height: 32,  fontSize: '0.875rem'  }}  >
                              {member.name.charAt(0)}
                            </Avatar>
                            <Typography  variant="body2"   fontWeight={isSelected ? 600 : 400}   color={isSelected ? 'primary.main' : 'text.primary'} textAlign="center"  >
                              {member.name}
                            </Typography>
                            <Chip    label={<Box display="flex" alignItems="center" gap={0.5}>
                                                <PriceChangeOutlined fontSize="small" />  {(member.individualCost || 0).toFixed(2)}
                                            </Box>}  size="small"    color={isSelected ? 'primary' : 'default'}  variant="filled"  />
                          </Box>
                        
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>

            {calculationResult.length > 0 && (
              <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckIcon />
                    Settlement Summary
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Stack spacing={2}>
                    {calculationResult.map((person: any) => (
                      <Paper 
                        key={person.name} 
                        sx={{    p: 2,    borderRadius: 2,  bgcolor: person.owes > 0 ? 'warning.50' : 'success.50', border: '1px solid',  borderColor: person.owes > 0 ? 'warning.200' : 'success.200' }} >
                        <Box display="flex" alignItems="center" gap={2} mb={1}>
                          <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                            {person.name.charAt(0)}
                          </Avatar>
                          <Typography variant="body1" fontWeight="600">
                            {person.name}
                          </Typography>
                        </Box>
                        
                        {person.owes > 0 ? (
                          <Box>
                            <Typography variant="body2" color="warning.dark" fontWeight="500">
                              Owes: {person.owes.toFixed(2)} 
                            </Typography>
                            {person.payTo && (
                              <Box mt={1}>
                                {Object.entries(person.payTo).map(([payerId, amount]: [string, any]) => (
                                 <Chip key={payerId}
                                            label={
                                                <Box display="flex" alignItems="center" gap={0.5}>
                                                        Pay  <Typography   component="span"   sx={{ fontSize: '0.95rem', fontWeight: 600, color: 'red' }} >
                                                               {members.find(m => m.id === payerId)?.name}
                                                           </Typography> : <PriceChangeOutlined fontSize="small" />{amount.toFixed(2)}
                                                </Box> } size="small" color="warning" variant="outlined"  sx={{ mr: 1, mb: 0.5 }}/> ))}
                              </Box>
                            )}
                          </Box>
                        ) : (
                          <Typography variant="body2" color="success.dark" fontWeight="500">
                            ✓ All settled up!
                          </Typography>
                        )}
                      </Paper>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ p: 3,  bgcolor: 'grey.50',   borderTop: '1px solid',  borderColor: 'grey.200', gap: 2 }}>
        <Button   onClick={closeAddExpenseDialog} variant="outlined"  size="large"sx={{   borderRadius: 2, minWidth: 120, textTransform: 'none', fontWeight: 600}} >
          Cancel
        </Button>
        <Button onClick={addExpense}  variant="contained" size="large" disabled={!isExpenseFormValid()} sx={{borderRadius: 2,  minWidth: 120, textTransform: 'none', fontWeight: 600,  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', '&:hover': { background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)', } }}>
           
            {isEditing ? 'Update Expense' : 'Add Expense'}

        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpenseDialog;