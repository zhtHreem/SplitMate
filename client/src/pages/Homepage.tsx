import { Box} from '@mui/material';
import AppHeader from '../components/layout/AppHeader';
import Appbar from '../components/layout/Appbar'; 
import Footer from '../components/layout/Footer';
const HomePage = () => {
  return (
    <Box>
     <Appbar />
    <AppHeader />
    <Footer />
    </Box>
  );
};

export default HomePage;
