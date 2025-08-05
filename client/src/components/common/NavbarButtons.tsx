import { Box, Button } from '@mui/material';

const NavbarButtons = ({ onNavigate = () => {} }) => {
  const navItems = [
    { label: 'Home', action: () => onNavigate('home') },
    { label: 'About', action: () => onNavigate('aboutus') },
    { label: 'Demo', action: () => onNavigate('demo') },
    { label: 'Contact', action: () => onNavigate('contact') }
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      {navItems.map((item) => (
        <Button
          key={item.label}
          onClick={item.action}
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: 500,
            textTransform: 'none',
            fontSize: '0.95rem',
            position: 'relative',
            '&:hover': {
              color: 'white',
              backgroundColor: 'transparent',
              '&::after': {
                width: '100%',
              }
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -2,
              left: 0,
              width: 0,
              height: '2px',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              transition: 'width 0.3s ease',
            }
          }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
};

export default NavbarButtons;