import type { Settlement } from '../types/settlement';
import type { GroupMember } from '../types/member';

export function calculateMemberBalances(members: GroupMember[], settlements: Settlement[]) {
  return members.map(member => {
    let balance = 0;

    for (const settlement of settlements) {
      if (settlement.to === member.id) {
        balance += settlement.amount;
      } else if (settlement.from === member.id) {
        balance -= settlement.amount;
      }
    }

    return { ...member, balance };
  });
}

export function getBalanceColor(balance: number) {
  if (balance > 0.01) return 'success.main';
  if (balance < -0.01) return 'error.main';
  return 'text.secondary';
}

export function getBalanceText(balance: number) {
  if (balance > 0.01) return `receives $${balance.toFixed(2)}`;
  if (balance < -0.01) return `owes $${Math.abs(balance).toFixed(2)}`;
  return 'settled';
}
