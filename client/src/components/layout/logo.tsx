import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = () => (
  <Link to="/home" style={{ textDecoration: 'none' }}>
    <Typography
      variant="h5"
      sx={{fontWeight: 700, fontFamily: 'Montserrat', background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',backgroundClip: 'text',WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer',     transition: 'all 0.3s ease',  '&:hover': { transform: 'scale(1.05)',    },}} >
      SplitMate
    </Typography>
  </Link>
);

export default Logo;



