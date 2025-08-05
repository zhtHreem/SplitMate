export interface GroupMember {
  id: string;
  name: string;
  individualCost: number;
  amountPaid: number;
  amountOwed: number;
}


export interface AddMemberDialogProps {
  addMemberOpen: boolean;
  newMemberName: string;
  newIndividualCost: number;
  setNewindividualCost: (cost: number) => void;
  setNewMemberName: (name: string) => void;
  addMember: () => void;
  closeAddMemberDialog: () => void;
}


export interface MembersSectionProps {
  members: GroupMember[];
  onAddMember: () => void;
  onRemoveMember: (id: string) => void;
}
