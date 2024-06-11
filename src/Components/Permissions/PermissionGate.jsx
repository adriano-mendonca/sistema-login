const useGetUserPermissions = () => {
  return ["teste"];
};

const PermissionGate = ({ children, permissions }) => {
  const userPermissions = useGetUserPermissions();
  if (
    permissions.some((permission) => {
      return userPermissions.includes(permission);
    })
  ) {
    return <div>PermissionGate</div>;
  }

  return null;
};

export default PermissionGate;
