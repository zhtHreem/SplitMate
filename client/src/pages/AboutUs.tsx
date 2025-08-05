import { Box, Typography, Container, Grid, Card } from '@mui/material';
import AppBar from '../components/layout/Appbar';
import Footer from '../components/layout/Footer';   
const AboutUsPage = () => {
  const values = [
    {
      icon: '🎯',
      title: 'Simplicity',
      description: 'Clear design, easy to use—no need for tutorials..',
      color: '#667eea'
    },
    {
      icon: '🛡️',
      title: 'Trust',
      description: 'Your data stays on your device. Always.',
      color: '#764ba2'
    },
    {
      icon: '⚖️',
      title: 'Fairness',
      description: 'Everyone sees the same breakdown—no hidden numbers.',
      color: '#f093fb'
    },
    {
      icon: '🚀',
      title: 'Speed',
      description: 'LInstant results. No loading, no waiting.',
      color: '#f5576c'
    }
  ];

  return (
    <>  <AppBar/>
    <Box sx={{ width: '100vw', minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)', pt: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8, position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', height: '400px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '50%', opacity: 0.1, zIndex: 0 }} />
          <Typography variant="h2" sx={{ color: 'white', fontWeight: 700, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', position: 'relative', zIndex: 1 }}>About SplitMate</Typography>
          <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: '600px', mx: 'auto', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
           Splitting bills with friends or family shouldn’t be a headache. SplitMate helps you divide expenses, track who paid what, and settle up—without any confusion or awkward conversations.
          </Typography>
        </Box>

        <Box sx={{ mb: 8, p: 4, background: 'rgba(255, 255, 255, 0.05)', borderRadius: '20px', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 600, mb: 3, textAlign: 'center' }}>Our Mission</Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)', textAlign: 'center', maxWidth: '800px', mx: 'auto', lineHeight: 1.8 }}>
              To make group spending simple and stress-free—whether it’s for a trip, dinner, or shared apartment. No spreadsheets. No drama. Just clarity.          </Typography>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 600, mb: 6, textAlign: 'center' }}>Our Values</Typography>
          <Grid container spacing={1} sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' }, overflowX: { md: 'auto' } , justifyContent: 'center',}}> 
            {values.map((value, index) => (
              <Grid item xs={6} sm={6} md={3} key={index} sx={{height: '100%', display: 'flex', justifyContent: 'center'}}>
                <Card sx={{minHeight:300,width:{xs:150,sm:250,md:300}, background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', p: 3, textAlign: 'center', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 20px 40px rgba(102, 126, 234, 0.2)`, border: `1px solid ${value.color}40` } }}>
                  <Box sx={{ width: '80px', height: '80px', borderRadius: '50%', background: `linear-gradient(135deg, ${value.color}20, ${value.color}40)`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3, fontSize: '2rem' }}>{value.icon}</Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>{value.title}</Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>{value.description}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 600, mb: 4 }}>Why Choose SplitMate?</Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ color: '#667eea', fontWeight: 600, mb: 2 }}>No Accounts Needed</Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
                  Start splitting expenses immediately without the hassle of creating accounts or sharing personal information.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ color: '#764ba2', fontWeight: 600, mb: 2 }}>Complete Privacy</Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
                  All calculations happen in your browser. Your financial data never leaves your device.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ color: '#f093fb', fontWeight: 600, mb: 2 }}>Lightning Fast</Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
                  No loading times, no server delays. Everything happens instantly as you type.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
    <Footer />
    </>
  );
};

export default AboutUsPage;
