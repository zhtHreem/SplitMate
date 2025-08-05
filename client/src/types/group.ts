import type { GroupMember } from './member';
import type { Expense } from './expense';

export interface Group {
  id: string;
  name: string;
  members: GroupMember[]; 
  expenses?: Expense[]; 
  createdAt: string;
}


