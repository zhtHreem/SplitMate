import { useState, useEffect } from 'react';
import type { Group } from '../types/group';


export const useGroupData = (groupId?: string) => {
  const [groupName, setGroupName] = useState('');
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    if (groupId) {
      const stored = localStorage.getItem(groupId);
      if (stored) {
        const parsed: Group = JSON.parse(stored);
        setGroupName(parsed.name || '');
      }
      setLoading(false);
    }
  }, [groupId]);

  return {
    groupName,
    setGroupName,
    loading
  };
};