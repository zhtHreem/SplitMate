import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Card, CardContent, Snackbar, Alert } from '@mui/material';
import AppBar from '../components/layout/Appbar'; 
import Footer from '../components/layout/Footer';
const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
    <AppBar />
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: '#0f0f23', pt: 12, pb: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>Contact Us</Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>Have a question or feedback? We're happy to hear from you.</Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Card sx={{ p: 4, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', borderRadius: 3 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth variant="outlined" label="Name" name="name" value={formData.name} onChange={handleChange} required sx={textFieldStyle} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth variant="outlined" label="Email" name="email" value={formData.email} onChange={handleChange} required sx={textFieldStyle} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth variant="outlined" label="Subject" name="subject" value={formData.subject} onChange={handleChange} required sx={textFieldStyle} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth variant="outlined" label="Message" name="message" value={formData.message} onChange={handleChange} required multiline rows={4} sx={textFieldStyle} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 600, background: 'linear-gradient(to right, #667eea, #764ba2)', '&:hover': { background: 'linear-gradient(to right, #5a67d8, #6b46c1)' } }}>Send Message</Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box sx={{ color: 'rgba(255,255,255,0.8)', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Reach us directly</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Email: <Box component="span" sx={{ color: '#1dd1a1' }}>support@splitmate.app</Box></Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Response time: ~24 hours</Typography>
              <Typography variant="body2" sx={{ mt: 4, fontStyle: 'italic', fontSize: '0.875rem', opacity: 0.6 }}>No need for fancy words — just send your thoughts. We read everything.</Typography>
            </Box>
          </Grid>
        </Grid>

        <Snackbar open={success} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000}>
          <Alert severity="success" variant="filled">Message sent successfully!</Alert>
        </Snackbar>
      </Container>
    </Box>
    <Footer />
    </>
  );
};

const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#667eea' }
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.6)' },
  '& .MuiInputLabel-shrink': { color: '#667eea' }
};

export default ContactPage;
