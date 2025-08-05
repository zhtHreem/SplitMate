import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const useGroupNavigation = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState<'group' | 'summary'>('group');

  const goToSummary = () => {
    setCurrentPage('summary');
  };

  const goBackToGroup = () => {
    setCurrentPage('group');
  };

  const goToHome = () => {
    navigate('/');
  };

  const startNewGroup = () => {
    navigate('/');
  };

  return {
    groupId: id,
    currentPage,
    goToSummary,
    goBackToGroup,
    goToHome,
    startNewGroup
  };
};