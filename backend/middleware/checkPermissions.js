const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new Error("Unauthenticated");
};
export default checkPermissions;
