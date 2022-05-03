export const container = {
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
      duration: 0.1,
    },
  },
  collapsed: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

export const item = {
  open: {
    opacity: 1,
    transition: {
      delay: 0.15,
    },
  },
  collapsed: { opacity: 0 },
};

export const collapse = {
  open: {
    height: "auto",
    transition: {
      type: "spring",
      duration: 0.05,
      bounce: 0.4,
      damping: 12,
    },
  },
  collapsed: {
    height: 0,
    transition: {
      when: "afterChildren",
    },
  },
};
