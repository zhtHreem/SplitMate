import type {  GroupMember } from '../types/member';
import type { Expense } from '../types/expense';

// Total amount paid


 type ExpenseDraft = Omit<Expense, 'id' | 'date'>;



export const calculateTotalPaid = (expense: ExpenseDraft) => {
  return expense.paidBy.reduce((sum, p) => sum + p.amount, 0);
};

// Remaining amount to be paid
export const calculateRemainingAmount = (total: number, paid: number) => {
  return total - paid;
};

// Is the expense split balanced
export const isExpenseBalanced = (remaining: number) => {
  return Math.abs(remaining) < 0.01;
};

// Members who haven't paid yet
export const getAvailableMembers = (members: GroupMember[], expense: ExpenseDraft) => {
  return members.filter(member => 
    !expense.paidBy.some(p => p.memberId === member.id)
  );
};

// Change payer amount
export const handlePayerAmountChange = (
  memberId: string,
  amount: string,
  addPayer: (memberId: string, amount: number) => void
) => {
  const parsed = parseFloat(amount) || 0;
  addPayer(memberId, parsed);
};

// Add new payer
export const handleAddPayer = (
  memberId: string,
  expense: ExpenseDraft,
  addPayer: (memberId: string, amount: number) => void
) => {
  if (memberId && !expense.paidBy.some(p => p.memberId === memberId)) {
    addPayer(memberId, 0);
  }
};
