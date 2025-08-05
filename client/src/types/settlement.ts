import type { GroupMember } from './member';

export interface Settlement {

  from: string;
  to: string;
  amount: number;
}

export interface SettlementSummaryProps {
  members: GroupMember[];
  settlements: Settlement[];
  getMemberName: (id: string) => string;
}