export const isEnterOrSpacePressed = cb => e => {
  if (e?.key !== 'Enter' && e?.which !== 32) return;
  e?.preventDefault();
  return cb(e);
};
