import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthGuard = ({ children }: any) => {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("recipe-token");
    console.log("token", token);
    if (!token) navigate("/");
    if (token && (pathname === "/" || pathname === "/register"))
      navigate("/dashboard");
    setLoading(false);
  }, []);

  if (!loading) return <>{children}</>;
  return null;
};
export default AuthGuard;
