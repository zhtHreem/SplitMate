import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#0f0f23', color: 'rgba(255,255,255,0.7)', py: 6, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>SplitMate</Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
              SplitMate helps you simplify shared expenses and manage group finances with ease.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 500, mb: 1 }}>Quick Links</Typography>
            <Link href="/about" underline="none" sx={footerLink}>About</Link><br />
            <Link href="/contact" underline="none" sx={footerLink}>Contact</Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 500, mb: 1 }}>Contact</Typography>
            <Typography variant="body2">support@splitmate.app</Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>Lahore, Pakistan</Typography>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 6, fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>
          © {new Date().getFullYear()} SplitMate. All rights reserved.
        </Box>
      </Container>
    </Box>
  );
};

const footerLink = {
  color: 'rgba(255,255,255,0.7)',
  fontSize: '0.9rem',
  display: 'inline-block',
  mb: 0.5,
  transition: 'color 0.2s ease',
  '&:hover': { color: '#ffffff' }
};

export default Footer;
