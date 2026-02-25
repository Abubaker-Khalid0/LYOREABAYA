/**
 * Framer Motion Variants Library for LYORE ABAYA
 * Professional animation variants for luxury e-commerce experience
 */

import { Variants } from 'framer-motion';

/**
 * Entrance Animations
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

/**
 * Stagger Animations
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

/**
 * Hover Animations - Product Cards
 */
export const productCardHover: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 2px 8px rgba(85,0,0,0.08), 0 4px 16px rgba(85,0,0,0.04)'
  },
  hover: {
    y: -12,
    scale: 1.02,
    boxShadow: '0 12px 32px rgba(85,0,0,0.16), 0 20px 48px rgba(85,0,0,0.12), 0 0 40px rgba(201,169,110,0.25)',
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

export const productImageHover: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: 1,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

export const productOverlayHover: Variants = {
  rest: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

/**
 * Hover Animations - Feature Cards
 */
export const featureCardHover: Variants = {
  rest: {
    y: 0,
    borderColor: 'rgba(201,169,110,0.15)',
    boxShadow: '0 4px 16px rgba(85,0,0,0.06)'
  },
  hover: {
    y: -8,
    borderColor: 'rgba(201,169,110,0.3)',
    boxShadow: '0 8px 24px rgba(85,0,0,0.1), 0 12px 40px rgba(85,0,0,0.06), 0 0 30px rgba(201,169,110,0.15)',
    transition: {
      duration: 0.35,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

export const featureIconHover: Variants = {
  rest: {
    scale: 1,
    rotate: 0,
    boxShadow: '0 8px 24px rgba(201,169,110,0.3), inset 0 2px 8px rgba(255,255,255,0.3)'
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    boxShadow: '0 12px 32px rgba(201,169,110,0.4), 0 0 40px rgba(201,169,110,0.3), inset 0 2px 8px rgba(255,255,255,0.4)',
    transition: {
      duration: 0.35,
      ease: 'easeOut'
    }
  }
};

/**
 * Hover Animations - Buttons
 */
export const buttonPrimaryHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 20px rgba(85,0,0,0.15), 0 8px 40px rgba(85,0,0,0.1)'
  },
  hover: {
    scale: 1.05,
    y: -2,
    boxShadow: '0 8px 32px rgba(85,0,0,0.2), 0 12px 48px rgba(85,0,0,0.15), 0 0 40px rgba(201,169,110,0.4)',
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1]
    }
  },
  tap: {
    scale: 1.02,
    y: 0
  }
};

export const buttonSecondaryHover: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0 2px 12px rgba(201,169,110,0.15)'
  },
  hover: {
    scale: 1.03,
    boxShadow: '0 4px 24px rgba(201,169,110,0.3), 0 0 30px rgba(201,169,110,0.2)',
    transition: {
      duration: 0.35,
      ease: [0.33, 1, 0.68, 1]
    }
  },
  tap: {
    scale: 1.01
  }
};

export const buttonWhatsAppHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 16px rgba(37,211,102,0.25), 0 8px 32px rgba(37,211,102,0.15)'
  },
  hover: {
    scale: 1.08,
    y: -3,
    boxShadow: '0 8px 24px rgba(37,211,102,0.35), 0 12px 40px rgba(37,211,102,0.25), 0 0 30px rgba(37,211,102,0.3)',
    transition: {
      duration: 0.3,
      ease: [0.33, 1, 0.68, 1]
    }
  },
  tap: {
    scale: 1.04,
    y: -1
  }
};

/**
 * Image Hover Animations
 */
export const imageZoomHover: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.08,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

export const imageOverlayReveal: Variants = {
  rest: { opacity: 0, y: 20 },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

/**
 * Decorative Element Animations
 */
export const decorativeCornerReveal: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 0.15,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

export const decorativeLineGrow: Variants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: '60px',
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

/**
 * Badge Animations
 */
export const badgeFloat: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-2, 2, -2],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const badgePulseGlow: Variants = {
  initial: {
    boxShadow: '0 0 20px rgba(201,169,110,0.3)'
  },
  animate: {
    boxShadow: [
      '0 0 20px rgba(201,169,110,0.3)',
      '0 0 40px rgba(201,169,110,0.6), 0 0 60px rgba(201,169,110,0.3)',
      '0 0 20px rgba(201,169,110,0.3)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

/**
 * Scroll-based Animations
 */
export const parallaxSlow = {
  scrollYProgress: [0, 1],
  y: ['0%', '30%']
};

export const parallaxMedium = {
  scrollYProgress: [0, 1],
  y: ['0%', '50%']
};

export const parallaxFast = {
  scrollYProgress: [0, 1],
  y: ['0%', '70%']
};

/**
 * Utility Functions
 */
export const getVariantWithReducedMotion = (
  variant: Variants,
  prefersReducedMotion: boolean
): Variants => {
  if (!prefersReducedMotion) return variant;
  
  // Return instant transitions when reduced motion is preferred
  return Object.keys(variant).reduce((acc, key) => {
    acc[key] = {
      ...variant[key],
      transition: { duration: 0 }
    };
    return acc;
  }, {} as Variants);
};

export const getVariantForMobile = (
  desktopVariant: Variants,
  isMobile: boolean
): Variants => {
  if (!isMobile) return desktopVariant;
  
  // Reduce animation intensity on mobile
  return Object.keys(desktopVariant).reduce((acc, key) => {
    const state = desktopVariant[key];
    if (typeof state === 'object' && 'y' in state) {
      acc[key] = {
        ...state,
        y: typeof state.y === 'number' ? state.y / 2 : state.y,
        scale: typeof state.scale === 'number' ? 1 + (state.scale - 1) / 2 : state.scale
      };
    } else {
      acc[key] = state;
    }
    return acc;
  }, {} as Variants);
};
