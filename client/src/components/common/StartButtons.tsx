import { Box, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AuthButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetStarted = () => {
    if (location.pathname !== '/home') {
      navigate('/home', { state: { focus: true } }); 
    } else {
      focusInput(); 
    }
  };

  const focusInput = () => {
    setTimeout(() => {
      const element = document.querySelector('input[placeholder*="group"]');
      if (element) element.focus();
    }, 100); 
  };

  useEffect(() => {
    if (location.state?.focus) {
      focusInput();
    }
  }, [location]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Button
        variant="contained" onClick={handleGetStarted}
        sx={{ background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',fontWeight: 600,textTransform: 'none',px: 3,py: 1,    borderRadius: '25px','&:hover': {    background: 'linear-gradient(45deg, #5a67d8 30%, #6b46c1 90%)',  transform: 'translateY(-1px)', boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'}, transition: 'all 0.3s ease' }}>
        Get Started
      </Button>
    </Box>
  );
};

export default AuthButtons;