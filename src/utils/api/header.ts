export const getAuthorizationHeader = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };
};
