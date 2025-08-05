import React, { useState ,useEffect} from 'react'; 
import { Typography, Box, Grid } from '@mui/material';
import FloatingImage from '../common/FloatingImage';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import type { Group } from '../../types/group'; 

const AppHeader = () => {
   const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const { goToGroup } = useAppNavigation();
  const [groupName, setGroupName] = useState('');

  const handleGetStarted = () => {
    if (!groupName.trim()) return;

    const groupId = Date.now().toString(); 
    const groupData: Group = {
                  id: groupId,
                  name: groupName,
                  members: [],
                  createdAt: new Date().toISOString()
};

    localStorage.setItem(groupId, JSON.stringify(groupData));

    goToGroup(groupId);
  };
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };
  

return (
  <Box sx={{ p: { xs: 6, md: 4 }, width: "99vw", minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)', position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%)', pointerEvents: 'none', zIndex: 0 } }}>
    <Grid container direction={{ xs: 'column-reverse', md: 'row'}} alignItems="center" justifyContent="space-around" sx={{ mt:-10,position: 'relative', zIndex: 1, minHeight: '100vh', width: '100%' }}>
      <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', p: { xs: 2, md: 4 ,lg:4} }}>
        <Box sx={{ textAlign: 'left', maxWidth:{ sm:"60%",md:350,lg:480} }}>
          <Box sx={{ mb: 3 }}>
            {/* <Typography variant="subtitle1" sx={{ color: '#b0b0b0', fontSize: '1.1rem', mb: 2 }}>Width: {size.width}px, Height: {size.height}px.</Typography> */}
            <Typography variant="h1" sx={{ fontWeight: 700, fontSize: { xs: '2rem', sm: '2rem', md: '1.5rem',lg: '2.75rem'  }, background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 50%, #b3b3b3 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.2 }} gutterBottom>
              SplitMate — Simplify shared expenses.</Typography>

          </Box>
          <Typography variant="subtitle1" sx={{ color: '#b0b0b0', fontSize: '1rem', lineHeight: 1.6, mb: 3 }}>Easily divide costs, track payments, and stay even with fellows.</Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, maxWidth: 500 }}>
            <Box component="input" placeholder="Enter your group name..." value={groupName} onChange={handleChange} sx={{ flex: 1, p: '16px 20px', fontSize: '1rem', color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 255, 255, 0.2)', borderRadius: '12px', outline: 'none', backdropFilter: 'blur(10px)', '&::placeholder': { color: '#888' }, '&:focus': { borderColor: 'rgba(120, 119, 198, 0.8)', backgroundColor: 'rgba(255, 255, 255, 0.15)', boxShadow: '0 0 20px rgba(120, 119, 198, 0.3)' } }} />
            <Box component="button" onClick={handleGetStarted} sx={{ p: '16px 32px', fontSize: '1rem', fontWeight: 600, color: '#ffffff', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)', minWidth: { xs: '100%', sm: 'auto' }, '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)', background: 'linear-gradient(135deg, #7c8ff0 0%, #8a5cb8 100%)' } }}>Get Started</Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{maxWidth:{sm:"80%", md:"100%",lg:"90%"} , position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: { xs: 4, md: 0 }, height: '100%', '&::before': { content: '""', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '150%', height: '150%', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 } }}>
          <FloatingImage src="/images/header/money.webp" alt="Money" delay="0s" slideDirections={{ desktop: 'right', mobile: 'top' }} sx={{ maxWidth: { xs: 280, sm: 400, lg: 620 }, position: 'relative', zIndex: 1 }} />
          <FloatingImage src="/images/header/bill.webp" alt="Bill" delay={{ desktop: "0s", mobile: "0s" }} rotate slideDirections={{ desktop: 'top', mobile: 'right' }} sx={{ right: { xs: '10%', md: '25%' }, bottom: { xs: '70%', md: '60%' }, maxWidth: { xs: 80, md: "30%" } }} />
          <FloatingImage src="/images/header/dollars.webp" alt="Dollars" delay={{ desktop: "0s", mobile: "0s" }} rotate slideDirections={{ desktop: 'bottom', mobile: 'left' }} sx={{ left: { xs: '5%', md: '0%' }, bottom: { xs: '5%', md: '0%' }, maxWidth: { xs: 80, md: "30%"} }} />
        </Box>
      </Grid>
    </Grid>
  </Box>
);
};
export default AppHeader;
