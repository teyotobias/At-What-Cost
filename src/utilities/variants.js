const authPageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 3,
      when: "beforeChildren",
    },
  },
};

const signUpLogoVariants = {
  visible: {
    x: [0, 50, -50, 50, -50, 0],
    transition: {
      delay: 3,
    },
  },
};

const buttonHoverVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    boxShadow: "0px 0px 5px rgb(255,255,255)",
  },
};

const textHoverVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    textShadow: "0px 0px 5px rgb(255,255,255)",
  },
};

const rotateVariants = {
  hidden: {
    opacity: 0,
    rotate: 0,
  },
  animate: {
    opacity: 1,
    rotate: 360,
    transition: {
      opacity: { duration: 1 },
      rotate: { delay: 1.5, duration: 0.5 },
    },
  },
  hover: {
    scale: 1.2,
    textShadow: "0px 0px 5px rgb(255,255,255)",
  },
};

const cardVariants = {
  hover: {
    scale: 1.1,
  },
};

const navbarLogoVariants = {
  hidden: {
    x: "-100vw",
  },
  visible: {
    x: 0,
    transition: {
      ease: "easeIn",
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.1,
  },
};

const sidebarVariants = {
  open: {
    x: 0, // Sidebar slides in from offscreen
    width: "25vw",
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "easeOut", // Smooth easing out for mobile
    },
  },
  closed: {
    width: "0vw",
    x: "-75vw", // Sidebar slides out to the left
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "easeIn", // Smooth easing in for closing
    },
  },
};
// Variants for the main content
const contentVariants = {
  expanded: {
    marginLeft: "0vw", // Main content takes full width when sidebar is closed
    transition: {
      type: "tween",
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  shrink: {
    marginLeft: "25vw", // Main content shrinks to allow sidebar
    transition: {
      type: "tween",
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
const exitVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      delay: 0.2,
    },
  },
  exit: {
    x: "-100vw",
    transition: {
      ease: "easeInOut",
    },
  },
};

export {
  authPageVariants,
  signUpLogoVariants,
  buttonHoverVariants,
  rotateVariants,
  textHoverVariants,
  cardVariants,
  navbarLogoVariants,
  sidebarVariants,
  contentVariants,
  exitVariants,
};
