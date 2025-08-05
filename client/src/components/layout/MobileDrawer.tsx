import { Box, Drawer, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import navLinks from '../../data/navlinks';
import AuthButtons from '../common/StartButtons';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const MobileDrawer = ({ open, onClose }: MobileDrawerProps) => {
  const navigate = useNavigate();

  const handleNav = (href: string) => {
    navigate(href);
    onClose();
  };

  return (
    <Drawer variant="temporary" anchor="right" open={open} onClose={onClose} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280, border: 'none' } }}>
      <Box sx={{ width: 280, height: '100%', background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Montserrat' }}>SplitMate</Typography>
          <IconButton onClick={onClose} sx={{ color: 'white' }}><span>✕</span></IconButton>
        </Box>

        <List sx={{ pt: 2 }}>
          {navLinks.map((item) => (
            <ListItem key={item.label} onClick={() => handleNav(item.href)} sx={{ cursor: 'pointer', borderRadius: '0 25px 25px 0', mr: 2, mb: 1, transition: 'all 0.3s ease', '&:hover': { backgroundColor: 'rgba(120, 119, 198, 0.2)', transform: 'translateX(10px)' } }}>
              <ListItemText primary={item.label} sx={{ '& .MuiListItemText-primary': { fontFamily: 'Inter', fontWeight: 500 } }} />
            </ListItem>
          ))}
          <Box sx={{ px: 2, pt: 2 }}><AuthButtons fullWidth /></Box>
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
