exports.validateUser = (username, password) => {
  if (!username || !password) return false;
  if (password.length < 6) return false;
  return true;
};
