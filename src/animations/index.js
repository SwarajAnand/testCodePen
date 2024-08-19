// for fading in out animation
export const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideInOut = {
  initial: { opacity: 0, y:50 },
  animate: { opacity: 1, y:0 },
  exit: { opacity: 0, y:50 },
};
