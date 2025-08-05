import { useNavigate } from 'react-router-dom';

export const useAppNavigation = () => {
  const navigate = useNavigate();

  return {
    goTo: (path: string) => navigate(path),

    goBack: () => navigate(-1),
    goForward: () => navigate(1),

    goToGroup: (groupId: string) => navigate(`/group/${groupId}`),

    goWithQuery: (path: string, query: Record<string, string>) => {
      const searchParams = new URLSearchParams(query).toString();
      navigate(`${path}?${searchParams}`);
    }
  };
};
