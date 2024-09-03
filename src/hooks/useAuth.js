import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    console.log(token);

    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
};

export default useAuth;
