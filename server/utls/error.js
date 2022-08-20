// create your onw error

export const createError = (stat, message) => {
  const err = new Error();
  err.message = message;
  err.status = stat;
  return err;
};
