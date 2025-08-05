import { BrowserRouter as Router,Navigate, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './styles/themes';

// Pages
import HomePage from './pages/Homepage';
import GroupPage from './pages/GroupPage';
import AboutUsPage from './pages/AboutUs';
import ContactPage from './pages/Contact';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
         <Route path="/group/:id" element={<GroupPage />} />
         <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;