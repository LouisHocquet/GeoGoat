const IS_DEV = __DEV__;

export const logger = {
  debug: (...args: any[]) => {
    if (IS_DEV) console.log(...args);
  },
  info: (...args: any[]) => {
    if (IS_DEV) console.info(...args);
  },
  warn: (...args: any[]) => {
    console.warn(...args); // Toujours affiché
  },
  error: (...args: any[]) => {
    console.error(...args); // Toujours affiché
  },
};
