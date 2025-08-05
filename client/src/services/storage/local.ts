import type { GroupMember } from '../../types/member';
import type {Group} from '../../types/group';
import type {  Expense } from '../../types/expense';


/**
 * Load a group by ID from localStorage
 */
export const getGroupFromStorage = (groupId: string): Group | null => {
  try {
    const stored = localStorage.getItem(groupId);
    return stored ? (JSON.parse(stored) as Group) : null;
  } catch (err) {
    console.error('Failed to load group from storage:', err);
    return null;
  }
};

/**
 * Save full group data to localStorage
 */
export const saveGroupToStorage = (groupId: string, group: Group) => {
  try {
    const updated = { ...group, updatedAt: new Date().toISOString() };
    localStorage.setItem(groupId, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save group to storage:', err);
  }
};

/**
 * Remove a group completely from localStorage
 */
export const removeGroupFromStorage = (groupId: string) => {
  localStorage.removeItem(groupId);
};

/**
 * Update only members inside a group
 */
export const updateGroupMembers = (groupId: string, members: GroupMember[]) => {
  const group = getGroupFromStorage(groupId);
  if (!group) return;

  const updatedGroup: Group = {
    ...group,
    members
  };

  saveGroupToStorage(groupId, updatedGroup);
};

/**
 * Update only expenses inside a group
 */
export const updateGroupExpenses = (groupId: string, expenses: Expense[]) => {
  const group = getGroupFromStorage(groupId);
  if (!group) return;

  const updatedGroup: Group = {
    ...group,
    expenses
  };

  saveGroupToStorage(groupId, updatedGroup);
};
