import type {  GroupMember } from './member';


export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  paidBy: { memberId: string; amount: number }[]; 
  splitBetween: string[]; 
}

export interface AddExpenseDialogProps {
  addExpenseOpen: boolean;
  newExpense: {
    description: string;
    amount: string;
    paidBy: { memberId: string; amount: number }[];
    splitBetween: string[];
  };
  members: GroupMember[];
  getIndividualCostSum: () => number;
  updateExpenseForm: (updates: any) => void;
  toggleSplitMember: (memberId: string) => void;
  addPayer: (memberId: string, amount: number) => void;
  removePayer: (memberId: string) => void;
  addExpense: () => void;
  closeAddExpenseDialog: () => void;
  getPerPersonAmount: (members: GroupMember[]) => any[];
  isExpenseFormValid: () => boolean;
  isEditing: boolean;

}



export interface ExpenseSectionProps {
  expense: Expense | null;
  members: GroupMember[];
  getIndividualCostSum: () => number;
  onAddExpense: () => void;
  onEditExpense: (expense: Expense) => void;
  
  onRemoveExpense: () => void;
  getMemberName: (id: string) => string;
  hasExpense: boolean;
}