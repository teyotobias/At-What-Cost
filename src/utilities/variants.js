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

export {
  authPageVariants,
  signUpLogoVariants,
  buttonHoverVariants,
  rotateVariants,
  textHoverVariants,
};
