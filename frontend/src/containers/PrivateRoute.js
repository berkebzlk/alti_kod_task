import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../actions";
import CSRFToken from "../components/CSRFToken";

const PrivateRoute = () => {
  const [auth, setAuth] = useState("");

  const getIsAuthenticated = async () => {
    const isAuth = await isAuthenticated();
    setAuth(isAuth);
  };

  useEffect(() => {
    getIsAuthenticated();
    console.log(auth);
  }, []);

  if (auth === "")
    return (
      <div>
        <CSRFToken />
        Loading...
      </div>
    );
  else if (auth === "success") return <Outlet />;
  else if (auth === "error") <Navigate to="/login" />;

  return (
    <div>{auth === "success" ? <Outlet /> : <Navigate to="/login" />}</div>
  );
};

export default PrivateRoute;
