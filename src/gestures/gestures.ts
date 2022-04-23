export const container = {
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
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
  open: { opacity: 1 },
  collapsed: { opacity: 0 },
};

export const containerFastCollapse = {
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
  collapsed: {
    opacity: 0,
  },
};

export const collapse = {
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.25,
    },
  },
  collapsed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.25,
      when: "afterChildren",
    },
  },
};
