import { AppBar, Toolbar, Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import NavbarButtons from '../common/NavbarButtons';
import MobileDrawer from './MobileDrawer';
import AuthButtons from '../common/StartButtons';
import Logo from '../layout/logo'; 
const ModernNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const navigate = useNavigate();

const handleNavigate = (id) => {
  navigate(`/${id}`);
};
  return (
    <>
      <AppBar  position="fixed" elevation={0}sx={{  background: 'rgba(15, 15, 35, 0.95)',  backdropFilter: 'blur(20px)',  borderBottom: '1px solid rgba(255, 255, 255, 0.1)', transition: 'all 0.3s ease', }} >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo />
          </Box>

          {!isMobile && <NavbarButtons onNavigate={handleNavigate} />
}
          {!isMobile && <AuthButtons />}
          {isMobile && (
            <IconButton onClick={handleDrawerToggle} sx={{ color: 'white', p: 1, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
              <span style={{ fontSize: '24px' }}>☰</span>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <MobileDrawer open={mobileOpen} onClose={handleDrawerToggle} />
      <Toolbar />
    </>
  );
};

export default ModernNavbar;
