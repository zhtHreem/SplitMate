import React from 'react';
import { Card, CardContent, Typography, Button, Box, Alert, Paper, Chip, IconButton, Avatar} from '@mui/material';
import {  Receipt as ReceiptIcon,  Add as AddIcon,  Edit as EditIcon,  PriceChangeOutlined,Delete as DeleteIcon,} from '@mui/icons-material';
import type {  ExpenseSectionProps} from '../../types/expense';
import { getExpenseIcon } from '../../utils/icons'; 




const ExpenseSection: React.FC<ExpenseSectionProps> = ({expense,members,getIndividualCostSum,onAddExpense,onEditExpense,onRemoveExpense, getMemberName, hasExpense}) => {

   const totalAmount = getIndividualCostSum();
   

  return (
    <Card elevation={3} sx={{ height: 'fit-content' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ReceiptIcon />
            Expense Details
          </Typography>

          {!hasExpense && (
            <Button  variant="contained"   startIcon={<AddIcon />} onClick={onAddExpense} disabled={members.length < 2}
              sx={{   borderRadius: 2,  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',   }} >
              Add Expense
            </Button>
          )}
        </Box>

        {!hasExpense ? (
          <Alert   severity="info"   sx={{   borderRadius: 2,  '& .MuiAlert-message': {   textAlign: 'center',  width: '100%'    }   }} >
            {members.length < 2 
              ? '👥 Add at least 2 members to create an expense' 
              : '🧾 Ready to add your expense details!'
            }
          </Alert>
        ) : (
          <Paper sx={{     p: 3,    borderRadius: 3,  background: 'linear-gradient(135deg, #f6f9fc 0%, #e9f4ff 100%)',  border: '1px solid',  borderColor: 'primary.200'  }}>
            {/* Expense Header */}
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{    bgcolor: 'primary.main',  width: 48, height: 48,   fontSize: '1.5rem' }}>
                  {getExpenseIcon(expense!.description)}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="700" color="primary.main">
                    {expense!.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {expense!.date}
                  </Typography>
                </Box>
              </Box>
              
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="h4" color="success.main" fontWeight="700">
                  < PriceChangeOutlined/> {totalAmount}

                </Typography>
                <Box display="flex" flexDirection="column" gap={1}>
                  
                  <IconButton 
                    onClick={()=>onEditExpense(expense!)}
                    size="small"
                    sx={{  bgcolor: 'primary.50', '&:hover': { bgcolor: 'primary.100' } }} >
                    <EditIcon fontSize="small" />
                  </IconButton>


                  <IconButton 
                    onClick={onRemoveExpense}
                    size="small"   color="error"sx={{    bgcolor: 'error.50',   '&:hover': { bgcolor: 'error.100' }}} >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            {/* Payment Info */}
            <Box mb={3}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                💳 Payment Details
              </Typography>
              <Paper sx={{ p: 2, bgcolor: 'white', borderRadius: 2 }}>
                {expense!.paidBy?.length > 1 ? (
                  <Box>
                    <Typography variant="body2" fontWeight="600" mb={1}>
                      Split payment by:
                    </Typography>
                    {expense!.paidBy.map((payer, index) => (
                      <Box key={index} display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">
                          <strong>{getMemberName(payer.memberId)}</strong>
                        </Typography>
                        <Chip 
                          label={`$${payer.amount.toFixed(2)}`}
                          size="small"  color="primary"  variant="filled" />
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body1">
                    Paid by <strong>{getMemberName(expense!.paidBy[0]?.memberId || expense!.paidBy)}</strong>
                  </Typography>
                )}
              </Paper>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                👥 Split Between ({expense!.splitBetween.length} people)
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                {expense!.splitBetween.map(memberId => (
                  <Chip  key={memberId}    label={getMemberName(memberId)} color="primary" variant="outlined" size="small"
                    avatar={
                      <Avatar sx={{ bgcolor: 'primary.main', fontSize: '0.75rem' }}>
                        {getMemberName(memberId).charAt(0)}
                      </Avatar>
                    } />
                ))}
              </Box>
              
              <Alert severity="info" sx={{ borderRadius: 2 }}>
                <Typography variant="body2">
                  <strong>Generate receipt by clicking the button below</strong> 
                </Typography>
              </Alert>
            </Box>
          </Paper>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseSection;