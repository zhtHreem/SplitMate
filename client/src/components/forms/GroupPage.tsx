import React, { useState } from 'react';
import { Container, Box, Grid,  Snackbar, Alert } from '@mui/material';

import { useMemberManagement } from '../../hooks/useMemberManagement';
import { useExpenseManagement } from '../../hooks/useExpenseManagement';
import { useGroupNavigation } from '../../hooks/useGroupNavigation';
import { useGroupData } from '../../hooks/useGroupData';

import GroupHeader from '../group/GroupHeader';
import MembersSection from '../group/MembersSection';
import ExpenseSection from '../group/ExpensesSection';
import ShowReceiptButton from '../group/CalculateButton';
import AddMemberDialog from '../group/AddMemberDialog';
import AddExpenseDialog from '../group/AddExpenseDialog';
import ReceiptScreenshotWrapper from '../group/ReceiptScreenshotWrapper'; 
const GroupPage: React.FC = () => {
  const { groupId,  goToHome } = useGroupNavigation();
  const { groupName, loading } = useGroupData(groupId);
  
  const memberHook = useMemberManagement(groupId!);
  const expenseHook = useExpenseManagement(groupId!);
  
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [shareSnackbarOpen, setShareSnackbarOpen] = useState(false);

  const handleRemoveMember = (id: string) => {
    memberHook.removeMember(id);
    expenseHook.cleanupExpensesForMember(id);
  };

  const handleShowReceipt = () => {
    if (memberHook.members.length >= 2 && expenseHook.expenses.length > 0) {
      setReceiptDialogOpen(true);
    }
  };

  const handleCloseReceipt = () => {
    setReceiptDialogOpen(false);
  };

  const handleShareReceipt = async () => {
    const receiptData = {
      groupName,
      members: memberHook.members,
      expense: expenseHook.expenses[0], 
      settlements: expenseHook.calculateFinalSettlements(memberHook.members),
      timestamp: new Date().toISOString()
    };

    const shareId = btoa(JSON.stringify(receiptData)).substring(0, 12);
    const shareUrl = `${window.location.origin}/receipt/${shareId}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareSnackbarOpen(true);
    } catch (err) {
      console.log('Share URL:', shareUrl);
      setShareSnackbarOpen(true);
    }
  };

  const settlements = expenseHook.calculateFinalSettlements(memberHook.members);
  const hasExpense = expenseHook.expenses.length > 0;

  if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ width: '100vw',height: '100vh', background: 'linear-gradient(135deg, #f0f0f0 0%, #ffffff 100%)'}}>
      <GroupHeader groupName={groupName} onGoHome={goToHome} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MembersSection
              members={memberHook.members}
              onAddMember={memberHook.openAddMemberDialog}
              onRemoveMember={handleRemoveMember}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <ExpenseSection
              expense={expenseHook.expenses[0] || null} 
              members={memberHook.members}
              getIndividualCostSum={()=>memberHook.getMemberIndividualCostSum()}
              onAddExpense={expenseHook.openAddExpenseDialog}
              onEditExpense={(expense) => expenseHook.editExpense(expense)} 
              onRemoveExpense={() => expenseHook.removeExpense(expenseHook.expenses[0]?.id)}
              getMemberName={memberHook.getMemberName}
              hasExpense={hasExpense}
            />
          </Grid>
        </Grid>

        <ShowReceiptButton
          canShowReceipt={memberHook.members.length >= 2 && hasExpense}
          onShowReceipt={handleShowReceipt}
          onAddMember={memberHook.openAddMemberDialog}
          onAddExpense={expenseHook.openAddExpenseDialog}
          memberCount={memberHook.members.length}
          hasExpense={hasExpense}
        />
      </Container>

      <AddMemberDialog {...memberHook} />
      <AddExpenseDialog
        addExpenseOpen={expenseHook.addExpenseOpen}
        newExpense={expenseHook.newExpense}
        members={memberHook.members}
        getIndividualCostSum={memberHook.getMemberIndividualCostSum}
        updateExpenseForm={expenseHook.updateExpenseForm}
        toggleSplitMember={expenseHook.toggleSplitMember}
        addPayer={expenseHook.addPayer}
        removePayer={expenseHook.removePayer}
        addExpense={expenseHook.addExpense}
        closeAddExpenseDialog={expenseHook.closeAddExpenseDialog}
        getPerPersonAmount={expenseHook.getPerPersonAmount}
        isExpenseFormValid={expenseHook.isExpenseFormValid}
        isEditing={hasExpense} 
      />

     <ReceiptScreenshotWrapper
  groupName={groupName}
  open={receiptDialogOpen}
  onClose={handleCloseReceipt}
  onShareSuccess={() => setShareSnackbarOpen(true)}
  members={memberHook.members}
  settlements={settlements}
  getMemberName={memberHook.getMemberName}
/>
 

      {/* <Snackbar
        open={shareSnackbarOpen}
        autoHideDuration={4000}
        onClose={() => setShareSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShareSnackbarOpen(false)}  severity="success"  sx={{ width: '100%' }} >
          Receipt link copied to clipboard! Share it with your friends 🎉
        </Alert>
      </Snackbar> */}
    </Box>
  );
};

export default GroupPage;