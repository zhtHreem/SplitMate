import { useState ,useEffect} from 'react';
import type {Group } from '../types/group';
import type { GroupMember } from '../types/member';
import { getGroupFromStorage, updateGroupMembers } from '../services/storage/local';
export const useMemberManagement = (groupId: string) => {
    const [group, setGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newIndividualCost, setNewindividualCost] = useState(0);




  useEffect(() => {
  const group = getGroupFromStorage(groupId);
  if (group) {
    setGroup(group);
    setMembers(group.members || []);
  }
}, [groupId]);



  const addMember = () => {
      if (!group) return; 

    if (newMemberName.trim() && newIndividualCost >= 0) {

      const newMember: GroupMember = {
        id: Date.now().toString(),
        name: newMemberName.trim(),
        individualCost: newIndividualCost,
        amountPaid: 0,
        amountOwed: 0
      };

   
      const updatedMembers = [...members, newMember];
      setMembers(updatedMembers);
      updateGroupMembers(groupId, updatedMembers);

      setNewMemberName('');
      setNewindividualCost(0);
      setAddMemberOpen(false);
    }
  };

 
 const removeMember = (id: string) => {
  const updatedMembers = members.filter(member => member.id !== id);
  setMembers(updatedMembers);
    updateGroupMembers(groupId, updatedMembers);

};

  const getMemberName = (id: string) => {
    return members.find(member => member.id === id)?.name || 'Unknown';
  };
  const getMemberIndividualCostSum = () => {
    if (members.length === 0) return 0;

    return members.reduce((sum, member) => sum + member.individualCost, 0);
  };

  const openAddMemberDialog = () => setAddMemberOpen(true);
  const closeAddMemberDialog = () => {
    setAddMemberOpen(false);
    setNewMemberName('');
  };

  return {
    members,
    addMemberOpen,
    newMemberName,
    newIndividualCost,
    setNewindividualCost,
    getMemberIndividualCostSum,
    setNewMemberName,
    addMember,
    removeMember,
    getMemberName,
    openAddMemberDialog,
    closeAddMemberDialog
  };
};