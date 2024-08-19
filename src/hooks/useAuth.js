const useAuth = () => {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  return { isAuthenticated };
};

export default useAuth;
