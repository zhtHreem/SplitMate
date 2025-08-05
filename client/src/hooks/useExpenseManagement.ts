import { useState, useCallback,useEffect } from 'react';
import type { GroupMember} from '../types/member';
import type {Group} from '../types/group';
import type { Expense } from '../types/expense';
import type { Settlement } from '../types/settlement';

import { getGroupFromStorage, updateGroupExpenses } from '../services/storage/local';

interface NewExpenseForm {
  description: string;
  amount: string;
  paidBy: { memberId: string; amount: number }[];
  splitBetween: string[];
}

export const useExpenseManagement = (groupId: string) => {
  const [group, setGroup] = useState<Group | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);

  const [newExpense, setNewExpense] = useState<NewExpenseForm>({
    description: '',
    amount: '',
    paidBy: [],
    splitBetween: []
  });




  useEffect(() => {
  const group = getGroupFromStorage(groupId);
  if (group) {
    setGroup(group);
    setExpenses(group.expenses || []);
  }
}, [groupId]);

 

  const addExpense = () => {
    if (newExpense.description && newExpense.paidBy.length > 0 && newExpense.splitBetween.length > 0) {
      const expense: Expense = {

        id: editingExpenseId || Date.now().toString(), 
        description: newExpense.description,
        amount: 0, 
        paidBy: newExpense.paidBy,
        splitBetween: newExpense.splitBetween,
        date: new Date().toLocaleDateString()
      };
      
        const updatedExpenses = editingExpenseId
      ? expenses.map((e) => (e.id === editingExpenseId ? expense : e))
      : [...expenses, expense];
      setExpenses(updatedExpenses);
      updateGroupExpenses(groupId, updatedExpenses);  
      resetExpenseForm();
      setAddExpenseOpen(false);
    }
  };


  const removeExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    updateGroupExpenses(groupId, updatedExpenses);
  };




  const calculateOwedAmounts = useCallback((
    totalAmount: number,
    paidBy: { memberId: string; amount: number }[],
    splitBetween: string[],
    members: GroupMember[]
  ) => {
    if (!totalAmount || !splitBetween.length || !members.length) return [];

    const results: {
      name: string;
      owes: number;
      payTo?: { [payerId: string]: number };
    }[] = [];

    splitBetween.forEach(memberId => {
      const member = members.find(m => m.id === memberId);
      if (!member) return;

      const personalCost = member.individualCost || 0;
      const amountPaid = paidBy.find(p => p.memberId === memberId)?.amount || 0;
      const netAmount = personalCost - amountPaid;

      if (netAmount > 0.01) {
        const payTo: { [payerId: string]: number } = {};
        
       
const payersWithExcess = paidBy
  .map(p => {
    const member = members.find(m => m.id === p.memberId);
    const personalCost = member?.individualCost || 0;
    const excess = p.amount - personalCost;
    return excess > 0.01 ? { memberId: p.memberId, excess } : null;
  })
  .filter(Boolean) as { memberId: string; excess: number }[];

const totalExcessPaid = payersWithExcess.reduce((sum, p) => sum + p.excess, 0);

payersWithExcess.forEach(payer => {
  const proportion = payer.excess / totalExcessPaid;
  payTo[payer.memberId] = netAmount * proportion;
});

        results.push({
          name: member.name,
          owes: netAmount,
          payTo: Object.keys(payTo).length > 0 ? payTo : undefined
        });
      } else {
        results.push({
          name: member.name,
          owes: Math.max(0, netAmount)
        });
      }
    });

    return results;
  }, []);

  
  const updateExpenseForm = (updates: Partial<NewExpenseForm>) => {
    setNewExpense(prev => ({ ...prev, ...updates }));
  };

  const editExpense = (expense: Expense) => {
  updateExpenseForm({
    description: expense.description,
    paidBy: expense.paidBy,
    splitBetween: expense.splitBetween,
    amount: expense.amount.toString()
  });
  setEditingExpenseId(expense.id);
  setAddExpenseOpen(true);
};


  const toggleSplitMember = (memberId: string) => {
    const isSelected = newExpense.splitBetween.includes(memberId);
    if (isSelected) {
      updateExpenseForm({
        splitBetween: newExpense.splitBetween.filter(id => id !== memberId)
      });
    } else {
      updateExpenseForm({
        splitBetween: [...newExpense.splitBetween, memberId]
      });
    }
  };

  const addPayer = (memberId: string, amount: number) => {
    const existingIndex = newExpense.paidBy.findIndex(p => p.memberId === memberId);
    if (existingIndex >= 0) {
      const updated = [...newExpense.paidBy];
      updated[existingIndex] = { memberId, amount };
      updateExpenseForm({ paidBy: updated });
    } else {
      updateExpenseForm({
        paidBy: [...newExpense.paidBy, { memberId, amount }]
      });
    }
  };

  const removePayer = (memberId: string) => {
    updateExpenseForm({
      paidBy: newExpense.paidBy.filter(p => p.memberId !== memberId)
    });
  };

  const resetExpenseForm = () => {
    setNewExpense({
      description: '',
      amount: '',
      paidBy: [],
      splitBetween: []
    });
    setEditingExpenseId(null); 

  };

  const openAddExpenseDialog = () => setAddExpenseOpen(true);
  
  const closeAddExpenseDialog = () => {
    setAddExpenseOpen(false);
    resetExpenseForm();
  };

  const cleanupExpensesForMember = (memberId: string) => {
    setExpenses(prev => prev.filter(expense =>
      !expense.paidBy.some(p => p.memberId === memberId) && 
      !expense.splitBetween.includes(memberId)
    ));
  };

  const getPerPersonAmount = useCallback((members: GroupMember[]) => {
    const totalAmount = newExpense.splitBetween.reduce((sum, memberId) => {
      const member = members.find(m => m.id === memberId);
      return sum + (member?.individualCost || 0);
    }, 0);

    if (!totalAmount || newExpense.splitBetween.length === 0) return [];

    return calculateOwedAmounts(totalAmount, newExpense.paidBy, newExpense.splitBetween, members);
  }, [newExpense.paidBy, newExpense.splitBetween, calculateOwedAmounts]);

  const isExpenseFormValid = () => {
    return !!(
      newExpense.description && 
      newExpense.paidBy.length > 0 && 
      newExpense.splitBetween.length > 0
    );
  };

  const calculateFinalSettlements = useCallback((members: GroupMember[]) => {
    const balances: { [memberId: string]: number } = {};
    
    members.forEach(member => {
      balances[member.id] = 0;
    });

    expenses.forEach(expense => {
      expense.paidBy.forEach(payer => {
        balances[payer.memberId] += payer.amount;
      });
      
      expense.splitBetween.forEach(memberId => {
        const member = members.find(m => m.id === memberId);
        const personalCost = member?.individualCost || 0;
        balances[memberId] -= personalCost;
      });
    });

    const settlements: Settlement[] = [];
    const creditors = Object.entries(balances).filter(([_, balance]) => balance > 0.01);
    const debtors = Object.entries(balances).filter(([_, balance]) => balance < -0.01);

    creditors.forEach(([creditorId, creditAmount]) => {
      let remainingCredit = creditAmount;
      
      debtors.forEach(([debtorId, debtAmount]) => {
        if (remainingCredit > 0.01 && debtAmount < -0.01) {
          const settlementAmount = Math.min(remainingCredit, Math.abs(debtAmount));
          
          settlements.push({
            from: debtorId,
            to: creditorId,
            amount: settlementAmount
          });
          
          remainingCredit -= settlementAmount;
          balances[debtorId] += settlementAmount;
        }
      });
    });

    return settlements;
  }, [expenses]);

  return {
    expenses,
    addExpenseOpen,
    newExpense,
    addExpense,
    removeExpense,
    updateExpenseForm,
    toggleSplitMember,
    addPayer,
    removePayer,
    openAddExpenseDialog,
    closeAddExpenseDialog,
    cleanupExpensesForMember,
    getPerPersonAmount,
    isExpenseFormValid,
    calculateFinalSettlements,
    editExpense,
  };
};