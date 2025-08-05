import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import React, { useEffect } from 'react';

interface SlideDirections {
  desktop: 'right' | 'left' | 'top' | 'bottom';
  mobile: 'right' | 'left' | 'top' | 'bottom';
}

interface FloatingImageProps {
  src: string;
  alt: string;
  sx?: SxProps<Theme>;
  delay?: string | { desktop: string; mobile: string };
  rotate?: boolean;
  slideDirections?: SlideDirections | null;
}

const FloatingImage: React.FC<FloatingImageProps> = ({ 
  src, 
  alt, 
  sx = {}, 
  delay = '0s', 
  rotate = false, 
  slideDirections = null
}) => {
  const getDelay = (screen: 'desktop' | 'mobile') => {
    if (typeof delay === 'string') return delay;
    return delay[screen];
  };
  useEffect(() => {
    const styleId = 'floating-animations';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes slideFromRight {
          0% { transform: translateX(100vw); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideFromLeft {
          0% { transform: translateX(-100vw); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideFromTop {
          0% { transform: translateY(-100vh); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideFromBottom {
          0% { transform: translateY(100vh); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes floatAnimation {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatAnimationRotate {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const getAnimationProps = () => {
    const desktopDelay = getDelay('desktop');
    const mobileDelay = getDelay('mobile');

    if (!slideDirections) {
      return {
        animationName: rotate ? 'floatAnimationRotate' : 'floatAnimation',
        animationDuration: '6s',
        animationDelay: desktopDelay,
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
        
        '@media (max-width: 899px)': {
          animationDelay: mobileDelay,
        },
      };
    }

    const desktopAnimation = slideDirections.desktop === 'right' ? 'slideFromRight, floatAnimation' :
                            slideDirections.desktop === 'left' ? 'slideFromLeft, floatAnimation' :
                            slideDirections.desktop === 'top' ? 'slideFromTop, floatAnimation' :
                            slideDirections.desktop === 'bottom' ? 'slideFromBottom, floatAnimation' :
                            'floatAnimation';

    const mobileAnimation = slideDirections.mobile === 'right' ? 'slideFromRight, floatAnimation' :
                           slideDirections.mobile === 'left' ? 'slideFromLeft, floatAnimation' :
                           slideDirections.mobile === 'top' ? 'slideFromTop, floatAnimation' :
                           slideDirections.mobile === 'bottom' ? 'slideFromBottom, floatAnimation' :
                           'floatAnimation';

    return {
      animationName: desktopAnimation,
      animationDuration: '2s, 6s',
      animationDelay: `${desktopDelay}, calc(2s + ${desktopDelay})`,
      animationIterationCount: '1, infinite',
      animationTimingFunction: 'ease-out, ease-in-out',
      
      '@media (max-width: 899px)': {
        animationName: mobileAnimation,
        animationDuration: '3.5s, 6s', 
        animationDelay: `${mobileDelay}, calc(3.5s + ${mobileDelay})`,
        animationIterationCount: '1, infinite',
        animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94), ease-in-out',
      },
    };
  };

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{ position: 'absolute', width: '100%', height: 'auto',zIndex: 2,transition: 'all 0.3s ease', filter: 'drop-shadow(0 8px 25px rgba(0, 0, 0, 0.25)) brightness(1.05)',
        
        ...getAnimationProps(),

        '&:hover': {
          transform: rotate ? 'scale(1.05) rotate(2deg)' : 'scale(1.05)',
          filter: 'drop-shadow(0 12px 35px rgba(0, 0, 0, 0.35)) brightness(1.15)',
        },

        ...sx,
      }}
    />
  );
};

export default FloatingImage;