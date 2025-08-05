export interface ShowReceiptButtonProps {
  canShowReceipt: boolean;
  onShowReceipt: () => void;
  onAddMember: () => void;
  onAddExpense: () => void;
  memberCount: number;
  hasExpense: boolean;
}